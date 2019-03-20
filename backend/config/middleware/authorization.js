require('dotenv').config();
const jwt = require('jsonwebtoken');
const { secureKey, accountUserTypes, subSilverStartIndex } = require('../globals.js');
const { usersDB } = require('../../db/models/index.js');

const authorizeCreateCat = async (req, res, next) => {
  const token = await req.get('Authorization');
  try {
    await jwt.verify(token, secureKey, async (err, decoded) => {
      if (err) throw { code: 401 };
      req.decoded = decoded;
      const loggedInUserID = req.decoded.id;
      const accountSettings = await usersDB.getUserType(loggedInUserID);
      if (accountUserTypes.indexOf(accountSettings.user_type) < subSilverStartIndex) throw { code: 403 };
      next();
    });
  } catch (err) {
    if (err.code === 401) {
      res.status(401).json({ error: 'Your login has expired. Please sign in again.' });
    }
    if (err.code === 403) {
      res.status(403).json({ error: 'Must be at least a silver user.' });
    }
    res.status(500).json({ error: err })
  }
}

module.exports = {
  authorizeCreateCat
};