/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const usersDB = require('../db/models/usersDB.js');
const bcrypt = require('bcryptjs');
const fileUpload = require('express-fileupload');
const Jimp = require('jimp');
const uuidv4 = require('uuid/v4');
const router = express.Router();
// const jwt = require('jsonwebtoken');

// globals
const {
  numOfHashes,
  defaultAvatar,
  allowedAvatarTypes
} = require('../config/globals.js');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const { authenticate, generateToken, validateToken } = require('../config/middleware/authenticate.js');
const requestClientIP = require('../config/middleware/requestClientIP.js');
const {
  transporter,
  getMailOptions,
} = require('../config/nodeMailerConfig.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// Gets a list of users with mock data (user id, username, email, status, password, id)
router.get('/', (req, res) => {
  return usersDB
    .getUsers()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({ error: `Failed to getUsers(): ${err}` })
    );
});

// Gets a list of discussions created by the user
router.get('/discussions/:user_id', (req, res, next) => {
  try {
    const { user_id } = req.params;
    return usersDB
      .getAllDiscussions(user_id)
      .then(user_discussions => res.status(200).json(user_discussions));
  } catch (err) {
    next(err);
  }
});

// Gets a user by their ID (mock data)
router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;
  return usersDB
    .findById(user_id)
    .then(user => {
      user[0].isAuth0 = user[0].password ? false : true;
      user[0].password = null;
      return res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: `Failed to findById(): ${err}` }));
});

// Returns true if username is in the database, else false
router.get('/username/:username', (req, res) => {
  return usersDB
    .isUsernameTaken(req.params.username)
    .then(user => {
      if (user) {
        return res.send(true);
      }
      return res.send(false);
    })
    .catch(err => res.status(500).json(err));
});

// Returns true if email is in the database, else false
router.get('/email/:email', (req, res) => {
  return usersDB
    .isEmailTaken(req.params.email)
    .then(email => {
      if (email) {
        return res.send(true);
      }
      return res.send(false);
    })
    .catch(err => res.status(500).json(err));
});

// confirm a user's email
router.post('/confirm-email', (req, res) => {
  const { email_confirm_token } = req.body;
  return usersDB
    .confirmEmail(email_confirm_token)
    .then(result => {
      if (result === 0) {
        return res.status(401).json({ error: 'E-mail confirmation token is invalid.' });
      }
      return res.status(201).json({ message: 'Your e-mail has been confirmed. Thank you.' });
    })
    .catch(err => res.status(500).json({ error: `Failed to confirmEmail(): ${err}` }));
});

// send a reset-pw email to user
router.post('/send-reset-pw-email', requestClientIP, (req, res) => {
  const { email, clientIP } = req.body;
  return usersDB
    .getUserFromConfirmedEmail(email)
    .then(async user => {
      if (!user) {
        return res.status(401).json({ error: 'Either email is not registered or it has not been confirmed.' });
      }
      const reset_pw_token = await generateToken(
        user.id,
        user.username,
        '30m', // expiration of 30 minutes
        email,
      );
      const mailOptions = getMailOptions('reset-pw', email, reset_pw_token, clientIP);
      return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).json({ error: `Failed to send e-mail: ${error}` });
        } else {
          return res.status(201).json({ message: `Success! An e-mail was sent to ${email} with a link to reset your password. Please check your inbox (You may also want to check your spam folder).` });
        }
      });
    })
    .catch(err => res.status(500).json({ error: `Failed to getUserFromConfirmedEmail(): ${err}` }));
});

// reset password
router.put('/reset-password', validateToken, (req, res) => {
  const { id } = req.decoded;
  let { password } = req.body;
  if (!password) return res.status(401).json({ error: 'Password must not be empty.' });
  password = bcrypt.hashSync(password, numOfHashes);
  return usersDB
    .updatePassword(id, password)
    .then(() => {
      return usersDB
        .findById(id)
        .then(async user => {
          const token = await generateToken(user[0].id, user[0].username);
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
              message: 'Your password has been reset and you\'ve been logged in.',
              notifications: user[0].notifications,
              newNotifications,
              uuid: user[0].uuid,
              last_login: user[0].last_login,
              signature: user[0].signature,
              user_type: user[0].user_type,
            }
          ]);
        })
        .catch(err => res.status(500).json({ error: `Failed to findById(): ${err}` }));
    })
    .catch(err => res.status(500).json({ error: `Failed to updatePassword(): ${err}` }));
});

// change signature
router.put('/edit-signature/:user_id', authenticate, async (req, res) => {
  const { user_id } = req.params;
  const { signature } = req.body;
  const { user_type } = await usersDB.getUserType(user_id);
  if (!['silver_member', 'gold_member', 'admin'].includes(user_type)) {
    return res.status(401).json({ error: 'You do not have the permissions to access to this.' });
  }
  return usersDB
    .updateSignature(user_id, signature)
    .then(signature => res.status(201).json(signature))
    .catch(err => res.status(500).json({ error: `Failed to updateSignature(): ${err}` }));
});

// get info from reset-pw-token
router.get('/token-info', validateToken, (req, res) => {
  const { id, username, email } = req.decoded;
  return res.status(200).json([{ id, username, email }]);
});

// search through categories, discussions and posts
router.get('/search-all', (req, res) => {
  const searchText = req.get('searchText');
  let orderType = req.get('orderType');
  if (orderType === 'undefined') orderType = null;
  if (!searchText) return res.status(200).json([]);
  return usersDB.searchAll(searchText, orderType)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({ error: `Failed to searchAll(): ${err}` }));
});

// updates a user
router.put('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { username, oldPassword, newPassword, email, status } = req.body;
  let newUser = {};
  let currentPW;
  newUser.status = status;
  if (username) newUser.username = username;
  if (email) newUser.email = email;
  if (oldPassword && (!newPassword || newPassword === '')) {
    return res.status(400).json({ error: 'New password must not be empty.' });
  }
  if (oldPassword) {
    try {
      currentPW = await usersDB.getPassword(user_id);
      if (bcrypt.compareSync(oldPassword, currentPW.password)) {
        const newHashedPassword = bcrypt.hashSync(newPassword, numOfHashes);
        newUser.password = newHashedPassword;
      } else {
        return res.status(400).json({ error: 'Old password is wrong.' });
      }
    }
    catch (err) {
      res.status(500).json({ error: `Failed to compare, hash, and get password: ${err}` })
    }
  }
  return usersDB
    .update(user_id, newUser)
    .then(async updatedUser => {
      const { id, username } = updatedUser[0];
      const token = await generateToken(id, username);
      res.status(201).json(token);
    })
    .catch(err => res.status(400).json({ error: `Failed to update(): ${err}` }));
});

// Update the password of a user given their ID
router.put('/password/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || oldPassword === '') {
    return res.status(400).json({ error: 'Old password must not be empty.' });
  }
  if (!newPassword || newPassword === '') {
    return res.status(400).json({ error: 'New password must not be empty.' });
  }
  return usersDB
    .getPassword(user_id)
    .then(currentPW => {
      if (currentPW && bcrypt.compareSync(oldPassword, currentPW.password)) {
        const newHashedPassword = bcrypt.hashSync(newPassword, numOfHashes);
        return usersDB
          .updatePassword(user_id, newHashedPassword)
          .then(() =>
            res.status(201).json({ message: 'Password update succesful.' })
          )
          .catch(err =>
            res
              .status(400)
              .json({ error: `Failed to updatePassword(): ${err}` })
          );
      }
      return res.status(400).json({ error: 'Old password is wrong.' });
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to getPassword(): ${err}` })
    );
});

// update email
router.put('/update-email/:user_id', authenticate, requestClientIP, (req, res) => {
  const { user_id } = req.params;
  const { email, clientIP } = req.body;

  if (!email) return res.status(401).json({ error: 'E-mail must not be empty.' });

  return usersDB
    .getUserByEmail(email)
    .then(user => {
      if (user.length) {
        return res.status(401).json({ error: `E-mail "${email}" already in use.` });
      }

      // generate a random uuid for email confirmation URL
      const email_confirm = uuidv4();

      return usersDB
        .updateEmail(user_id, email, email_confirm)
        .then(() => {
          const mailOptions = getMailOptions('update-email', email, email_confirm, clientIP);

          return transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              return res.status(500).json({ error: `Server failed to send e-mail confirmation: ${err}` });
            } else {
              const message = `Success! An e-mail was sent to ${email}. Please confirm your e-mail address in order to be able to reset your password in the future (You might want to check your spam folder).`;
              return res.status(201).json(message);
            }
          });
        })
        .catch(err => res.status(500).json({ error: `Server failed to update email: ${err}` }));
    })
    .catch(err => res.status(500).json({ error: `Server failed to get user by email: ${err}` }));
});

// Change the user_type of a user given their ID
router.put('/type/:user_id', authenticate, (req, res) => {
  const user_id = Number(req.params.user_id);
  const { user_type } = req.body;

  return usersDB.changeUserType(user_id, user_type).then(userType => {
    res.status(201).json(userType[0]);
  }).catch(err => {
    res.status(500).json({ error: `Server failed to changeUserType(): ${err}` });
  })

})

// Update the avatar of a user given their ID
router.put('/avatar/:user_id', authenticate, fileUpload(), async (req, res) => {
  const { user_id } = req.params;
  // const { user_type } = await usersDB.getUserType(user_id);
  // if (!['gold_member', 'admin'].includes(user_type)) {
  //   return res.status(401).json({ error: 'You do not have the permissions to access to this.' });
  // }
  let { avatarData } = req.body;
  if (avatarData === null) {
    avatarData = defaultAvatar;
    // reset avatar to default
    return usersDB
      .updateAvatar(user_id, avatarData)
      .then(result => res.status(201).json(result[0].avatar))
      .catch(err =>
        res.status(500).json({ error: `Failed to updateAvatar(): ${err}` })
      );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }
  const imageFile = req.files.imageFile;
  const imageBuffer = imageFile.data;
  const mimeType = imageFile.mimetype;
  if (!allowedAvatarTypes.includes(mimeType)) {
    return res
      .status(401)
      .json({
        error: `${mimeType.replace(
          'image/',
          ''
        )} is not an allowed avatar type. It must be a jpeg, jpg, png, bmp, or tiff.`
      });
  }
  return Jimp.read(imageBuffer)
    .then(image => {
      return image
        .scaleToFit(100, 100)
        .getBase64(Jimp.AUTO, (err, convertedImage) => {
          if (err) throw err;
          return usersDB
            .updateAvatar(user_id, convertedImage)
            .then(result => res.status(201).json(result[0].avatar))
            .catch(err =>
              res
                .status(500)
                .json({ error: `Failed to updateAvatar(): ${err}` })
            );
        });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: `Jimp failed to read image buffer: ${err}` })
    );
});

// Update the avatar (as a url) of a user given their ID
router.put('/avatar-url/:user_id', authenticate, async (req, res) => {
  const { user_id } = req.params;
  // const { user_type } = await usersDB.getUserType(user_id);
  // if (!['gold_member', 'admin'].includes(user_type)) {
  //   return res.status(401).json({ error: 'You do not have the permissions to access to this.' });
  // }
  let { avatarUrl } = req.body;
  if (avatarUrl === null) {
    // reset avatar to default
    avatarUrl = defaultAvatar;
  }
  return usersDB
    .updateAvatar(user_id, avatarUrl)
    .then(result => res.status(201).json(result[0].avatar))
    .catch(err =>
      res.status(500).json({ error: `Failed to updateAvatar(): ${err}` })
    );
});

// Update last login
router.put('/last-login/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  return usersDB
    .updateLastLogin(user_id)
    .then(last_login => res.status(201).json(last_login))
    .catch(err => res.status(500).json({ error: `Failed to updateLastLogin(): ${err}` }));
});

// Delete a user by their ID
router.delete('/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  return usersDB
    .remove(user_id)
    .then(removed => {
      if (removed !== 1) {
        return res.status(400).json({ error: 'Either user_id does not exist or matched more than one user.' });
      }
      return res.status(200).json(removed);
    })
    .catch(err => res.status(500).json({ error: `Failed to remove(): ${err}` }));
});

module.exports = router;