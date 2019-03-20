/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const {
  safeUsrnameSqlLetters,
  safePwdSqlLetters,
  accountStatusTypes,
  numOfHashes,
  accountUserTypes,
  subscriptionPlans,
  backendStripePkToken
} = require('../config/globals.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const { check } = require('express-validator/check');
const db = require('../db/models/usersDB.js');
const { categoryFollowsDB } = require('../db/models/index.js');
const stripe = require('stripe')(backendStripePkToken);

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const {
  authenticate,
  generateToken
} = require('../config/middleware/authenticate.js');

const validateNewUsername = username => {
  if (username === '') return false;

  usernameArr = username.split('');
  for (let i = 0; i < usernameArr.length; i++) {
    if (!safeUsrnameSqlLetters.includes(usernameArr[i])) {
      return false;
    }
  }
  return true;
};

const validateNewPassword = password => {
  if (password === '') return false;

  password = password.split('');
  for (let i = 0; i < password.length; i++) {
    if (!safePwdSqlLetters.includes(password[i])) {
      return false;
    }
  }
  return true;
};

const validateStatusSelected = status => {
  if (status === '') return false;

  if (accountStatusTypes.includes(status)) {
    return true;
  }
  return false;
};

const requestClientIP = require('../config/middleware/requestClientIP.js');

const {
  transporter,
  getMailOptions,
} = require('../config/nodeMailerConfig.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

router.post('/register', requestClientIP, (req, res) => {
  const accountCreatedAt = Date.now();
  // username and password must keep rules of syntax
  if (!req.body.username || !validateNewUsername(req.body.username)) {
    return res.status(400).json({ error: `Username is missing.` });
  } else if (!req.body.password || !validateNewPassword(req.body.password)) {
    return res.status(400).json({ error: `Password is missing.` });
  } else if (!req.body.status || !validateStatusSelected(req.body.status)) {
    return res.status(400).json({ error: `Status is missing.` });
  }

  // ensure new user added is only passing the props needed into the database
  const newUserCreds = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, numOfHashes), // bcryptjs hash stored in db (not the actual password)
    status: req.body.status,
    uuid: uuidv4(), // for use with pusher
  };

  // find library later to support these rules -> https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
  if (req.body.email && check(req.body.email).isEmail()) {
    newUserCreds.email = req.body.email.trim();
  }

  // user account created_at
  newUserCreds.created_at = accountCreatedAt;
  newUserCreds.last_login = accountCreatedAt;

  // add user
  return db
    .insert(newUserCreds) // [ { id: 1, username: 'username', email: 'email' } ]
    .then(async userAddedResults => {
      let email_confirm = null;

      // if they registered with an email, send a confirmation email
      if (userAddedResults[0].email) {
        // generate a random uuid for email confirmation URL
        email_confirm = uuidv4();
      }
      await db.addEmailConfirm(userAddedResults[0].id, email_confirm);
      await categoryFollowsDB.addDefaultCategoryFollows(userAddedResults[0].id);
      return Promise.resolve([userAddedResults, email_confirm]);
    })
    .then(([userAddedResults, email_confirm]) => {
      // add user settings
      let userSettings = {
        user_id: userAddedResults[0].id
      };

      // set account type
      if (req.body.subPlan === subscriptionPlans[0] || !req.body.subPlan) {
        userSettings.user_type = accountUserTypes[0];
        userSettings.subscribed_at = accountCreatedAt;
      } else if (req.body.subPlan === subscriptionPlans[1]) {
        userSettings.user_type = accountUserTypes[1];
        userSettings.subscribed_at = accountCreatedAt;
      } else if (req.body.subPlan === subscriptionPlans[2]) {
        userSettings.user_type = accountUserTypes[2];
        userSettings.subscribed_at = accountCreatedAt;
      } else if (req.body.subPlan === subscriptionPlans[3]) {
        userSettings.user_type = accountUserTypes[3];
        userSettings.subscribed_at = accountCreatedAt;
      }

      // signature given and is gold/silver sub
      // prettier-ignore
      if (
        userSettings.user_type === accountUserTypes[2] || // silver
        userSettings.user_type === accountUserTypes[3] // gold
      ) {
        userSettings.signature = req.body.signature || '';
      }

      return db.addUserSettings(userSettings)
        .then(() => {
          // Get first token for front end (for login after register)
          return generateToken(
            userAddedResults[0].id,
            userAddedResults[0].username,
            '24hr'
          ).then(token => {
            return db.findById(userAddedResults[0].id).then(foundUser => {
              if (foundUser.length) {
                let message = 'Thanks for registering! Please consider adding an e-mail address in the future so you are able to recover your account in case you forget your password.';
                if (email_confirm) {
                  const mailOptions = getMailOptions(
                    'register',
                    userAddedResults[0].email,
                    email_confirm,
                    req.body.clientIP,
                  );
                  return transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      message = `Server failed to send e-mail confirmation: ${error}`;
                    } else {
                      message = `Thanks for signing up! An e-mail was sent to ${userAddedResults[0].email}. Please confirm your e-mail address in order to be able to reset your password in the future (You might want to check your spam folder).`;
                    }
                    return res.status(201).json([
                      {
                        id: userAddedResults[0].id,
                        token,
                        message,
                        username: userAddedResults[0].username,
                        avatar: foundUser[0].avatar,
                        isAuth0: foundUser[0].password ? false : true,
                        email_confirm: foundUser[0].email_confirm,
                        discussionFollows: foundUser[0].discussionFollows,
                        notifications: foundUser[0].notifications,
                        uuid: foundUser[0].uuid,
                        last_login: foundUser[0].last_login,
                        signature: foundUser[0].signature,
                        user_type: foundUser[0].user_type,
                      }
                    ]);
                  });
                }
                return res.status(201).json([
                  {
                    id: userAddedResults[0].id,
                    token,
                    message,
                    username: userAddedResults[0].username,
                    avatar: foundUser[0].avatar,
                    isAuth0: foundUser[0].password ? false : true,
                    email_confirm: foundUser[0].email_confirm,
                    discussionFollows: foundUser[0].discussionFollows,
                    categoryFollows: foundUser[0].categoryFollows,
                    notifications: foundUser[0].notifications,
                    uuid: foundUser[0].uuid,
                    last_login: foundUser[0].last_login,
                    signature: foundUser[0].signature,
                    user_type: foundUser[0].user_type,
                  }
                ]);
              }
              return res
                .status(401)
                .json({ error: 'No users found with findById().' });
            })
              .catch(err =>
                res.status(500).json({ error: `Failed to findById(): ${err}` })
              );
          })
            .catch(err =>
              res.status(500).json({ error: `Failed to generate token: ${err}` })
            );
        })
        .catch(err =>
          res.status(500).json({ error: `Failed to addUserSettings(): ${err}` })
        );
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to insert(): ${err}` })
    );
});

router.post('/login', async (req, res) => {
  if (!req.body.username || req.body.username === '') {
    return res.status(400).json({ error: `Username is missing.` });
  }
  if (!req.body.password || req.body.password === '') {
    return res.status(400).json({ error: `Password is missing.` });
  }

  const userCreds = {
    username: req.body.username,
    password: req.body.password
  };

  return db
    .findByUsername(userCreds.username)
    .then(async user => {
      // If user object was obtained AND...
      // the client password matches the db hash password
      if (user && bcrypt.compareSync(userCreds.password, user.password)) {
        const token = await generateToken(user.id, user.username);
        return db
          .findById(user.id)
          .then(async foundUser => {
            if (foundUser.length) {
              const lastLogin = foundUser[0].last_login;
              let newNotifications = false;
              if (foundUser[0].notifications.length) {
                const latestNotification = foundUser[0].notifications[0].created_at;
                if (lastLogin < latestNotification) {
                  newNotifications = true;
                }
              }
              await db.updateLastLogin(user.id);
              return res.status(201).json([
                {
                  id: user.id,
                  token,
                  username: user.username,
                  avatar: user.avatar,
                  isAuth0: foundUser[0].password ? false : true,
                  email_confirm: foundUser[0].email_confirm,
                  discussionFollows: foundUser[0].discussionFollows,
                  categoryFollows: foundUser[0].categoryFollows,
                  notifications: foundUser[0].notifications,
                  newNotifications,
                  uuid: foundUser[0].uuid,
                  last_login: foundUser[0].last_login,
                  signature: foundUser[0].signature,
                  user_type: foundUser[0].user_type,
                }
              ]);
            }
            return res
              .status(401)
              .json({ error: 'No users found with findById().' });
          })
          .catch(err =>
            res.status(500).json({ error: `Failed to findById(): ${err}` })
          );
      }
      return res.status(401).json({ error: `Invalid username/password.` });
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to findByUsername(): ${err}` })
    );
});

// log a user back in if their token is authenticated
router.post('/log-back-in/:user_id', authenticate, async (req, res) => {
  const { user_id } = req.params;
  return db
    .findById(user_id)
    .then(async user => {
      // if the user already exists in the DB
      // you will get back an array with an object with user info inside it
      if (user.length === 1) {
        const token = await generateToken(user[0].id, user[0].username);
        const lastLogin = user[0].last_login;
        let newNotifications = false;
        if (user[0].notifications.length) {
          const latestNotification = user[0].notifications[0].created_at;
          if (lastLogin < latestNotification) {
            newNotifications = true;
          }
        }
        await db.updateLastLogin(user_id);
        return res.status(201).json([
          {
            id: user[0].id,
            token,
            avatar: user[0].avatar,
            username: user[0].username,
            discussions: user[0].discussions,
            email: user[0].email,
            isAuth0: user[0].password ? false : true,
            email_confirm: user[0].email_confirm,
            discussionFollows: user[0].discussionFollows,
            categoryFollows: user[0].categoryFollows,
            notifications: user[0].notifications,
            newNotifications,
            uuid: user[0].uuid,
            last_login: user[0].last_login,
            signature: user[0].signature,
            user_type: user[0].user_type,
          }
        ]);
      }
      return res.status(401).json({
        error: `User does not exist in database or you got back more than one user.`
      });
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to findById(): ${err}` })
    );
});

router.post('/auth0-login', async (req, res) => {
  const { email, name, picture } = req.body;
  let userSettings = {};
  let token;
  return db
    .findByEmail(email)
    .then(async user => {
      // if the user already exists in the DB, return the user
      if (user) {
        // refresh token (if needed)
        token = await generateToken(user.id, user.username);

        // update user settings
        userSettings.user_id = user.id;
        if (picture) {
          userSettings.avatar = picture;
          await db.updateUserSettings(userSettings);
        }

        return db
          .findById(user.id)
          .then(async foundUser => {
            if (foundUser.length) {
              const lastLogin = foundUser[0].last_login;
              let newNotifications = false;
              if (foundUser[0].notifications.length) {
                const latestNotification = foundUser[0].notifications[0].created_at;
                if (lastLogin < latestNotification) {
                  newNotifications = true;
                }
              }
              await db.updateLastLogin(user.id);
              return res.status(201).json([
                {
                  id: user.id,
                  token,
                  username: user.username,
                  avatar: foundUser[0].avatar,
                  isAuth0: foundUser[0].password ? false : true,
                  email_confirm: foundUser[0].email_confirm,
                  discussionFollows: foundUser[0].discussionFollows,
                  categoryFollows: foundUser[0].discussionFollows,
                  notifications: foundUser[0].notifications,
                  newNotifications,
                  uuid: foundUser[0].uuid,
                  last_login: foundUser[0].last_login,
                  signature: foundUser[0].signature,
                  user_type: foundUser[0].user_type,
                }
              ]);
            }
            return res
              .status(401)
              .json({ error: 'No users found with findById().' });
          })
          .catch(err =>
            res.status(500).json({ error: `Failed to findById(): ${err}` })
          );
      }
      // else, if user does not exist, register them first
      const newUserCreds = {
        username: name,
        email,
        status: 'active',
        uuid: uuidv4(), // for use with pusher
      };

      const accountCreatedAt = Date.now();

      // user account created_at
      newUserCreds.created_at = accountCreatedAt;
      newUserCreds.last_login = accountCreatedAt;
      return db
        .insert(newUserCreds) // [ { id: 1, username: 'username' } ]
        .then(async userAddedResults => {
          // add user settings
          userSettings.user_id = userAddedResults[0].id;
          if (picture) {
            userSettings.avatar = picture;
            userSettings.subscribed_at = accountCreatedAt;
            await db.addUserSettings(userSettings);
          }

          await categoryFollowsDB.addDefaultCategoryFollows(userAddedResults[0].id);

          return db
            .findByUsername(userAddedResults[0].username)
            .then(async foundUser => {
              // refresh token (if needed)
              token = await generateToken(foundUser.id, foundUser.username);

              return db
                .findById(foundUser.id)
                .then(async foundUserById => {
                  if (foundUserById.length) {
                    return res.status(201).json([
                      {
                        id: foundUser.id,
                        token,
                        username: foundUser.username,
                        avatar: foundUserById[0].avatar,
                        isAuth0: foundUserById[0].password ? false : true,
                        email_confirm: foundUserById[0].email_confirm,
                        discussionFollows: foundUserById[0].discussionFollows,
                        categoryFollows: foundUserById[0].categoryFollows,
                        notifications: foundUserById[0].notifications,
                        uuid: foundUserById[0].uuid,
                        last_login: foundUserById[0].last_login,
                        signature: foundUserById[0].signature,
                        user_type: foundUserById[0].user_type,
                      }
                    ]);
                  }
                  return res
                    .status(401)
                    .json({ error: 'No users found with findById().' });
                })
                .catch(err =>
                  res
                    .status(500)
                    .json({ error: `Failed to findById(): ${err}` })
                );
            })
            .catch(err =>
              res
                .status(500)
                .json({ error: `Failed to findByUsername(): ${err}` })
            );
        })
        .catch(err =>
          res.status(500).json({ error: `Failed to insert(): ${err}` })
        );
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to findByUsername(): ${err}` })
    );
});

router.post('/stripe', (req, res) => {
  const stripeToken = req.body.data.stripeToken;
  const payment = Number(req.body.data.payment);
  const subPlan = req.body.data.description;
  const email = req.body.data.email;

  (async () => {
    try {
      const charge = await stripe.charges.create({
        amount: payment,
        currency: 'usd',
        description: subPlan,
        source: stripeToken,
        statement_descriptor: subPlan,
        receipt_email: email
      });
      res.status(201).json([{ charge }]);
    } catch (err) {
      res.status(401).json({ err })
    }
  })();
})

module.exports = router;
