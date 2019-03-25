/*This file will be dedicated to the userFollowers router */
require('dotenv').config();
const express = require('express');
const userFollowersDB = require('../db/models/UserFollowersDB.js');
const router = express.Router(); 

// router.get('/followers/:user_id', (req,res) => {
router.get('/:user_id', (req,res) => {
  const userId = req.params.user_id; 
//   return userFollowersDB.getUserFollowers(userId)
  return userFollowersDB
    .getUserFollowers(userId)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({error: `Failed to get follow list ${err}`}));
});

module.exports = router; 
