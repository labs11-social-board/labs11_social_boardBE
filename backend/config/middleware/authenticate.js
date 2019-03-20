require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  secureKey,
  accountStatusTypes,
  tokenOptionExpiration,
  tokenTimeLeftRefresh
} = require('../globals.js');
const { usersDB } = require('../../db/models/index.js');

const generateToken = async (id, username, expiration, email) => {
  let tomorrow = await new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const totalHours = tomorrow.getTime() / 1000 / 3600;
  let payload = {
    id,
    username,
    total_hours: totalHours
  };

  // if (email) payload.email = email;

  const secret =
    secureKey || 'Should configure local .env file for secretString'; // hard coding this in the code is bad practice

  const options = {
    expiresIn: expiration || tokenOptionExpiration // 60 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  const token = await jwt.sign(payload, secret, options);
  return token;
};

const refreshTokenAsNeeded = async token => {
  let token_decoded;
  const secret =
    secureKey || 'Should configure local .env file for secretString';
  await jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      throw { err };
    } else {
      token_decoded = decodedToken;
    }
  });
  let now = await new Date();
  return token_decoded.total_hours &&
    token_decoded.total_hours - now.getTime() / 1000 / 3600 <
    tokenTimeLeftRefresh
    ? generateToken(token_decoded.id, token_decoded.username)
    : token;
};

// authenticate that the user making the request is the same one whos info is being requested
// (e.g. you cannot request a different user's profile info)
function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).json({
      error: 'No token provided. It must be set on the Authorization Header.'
    });
  }
  return jwt.verify(token, secureKey, async (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ error: 'Your login has expired. Please sign in again.' });
    req.decoded = decoded;
    const requestingUserID = req.params.user_id;
    const loggedInUserID = '' + req.decoded.id;
    const currentUser = await usersDB.getUserName(req.decoded.id);
    if (req.decoded.username !== currentUser.username) {
      return res.status(401).json({ error: 'You need to delete localStorage.' });
    }
    if (requestingUserID !== loggedInUserID) {
      return res.status(401).json({ error: 'Not authorized.' });
    }
    next();
  });
};

function validateToken(req, res, next) {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).json({
      error: 'No token provided. It must be set on the Authorization Header.'
    });
  }
  return jwt.verify(token, secureKey, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ error: 'Your login has expired. Please sign in again.' });
    req.decoded = decoded;
    next();
  });
};

function authorize(req, res, next) {
  // the auth token is normally sent in the authorization header
  const token = req.headers.authorization;
  const secret =
    process.env.JWT_SECRET ||
    'Should configure local .env file for secretString';

  // Token is provided
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      // Token is not valid
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        let userInCheck = await usersDB.getUserDetails(req.decodedToken.id);

        // user is banned
        if (
          accountStatusTypes[accountStatusTypes.length - 1] ===
          userInCheck.status
        ) {
          next();
        } else {
          res.status(403).json({ message: 'user is banned' });
        }
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

module.exports = {
  authenticate,
  authorize,
  generateToken,
  refreshTokenAsNeeded,
  validateToken,
};
