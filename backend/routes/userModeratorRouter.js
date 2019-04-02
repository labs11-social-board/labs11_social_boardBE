// DEPENDENCIES
const express = require('express');
const userModeratorDB = require('../db/models/userModeratorDB');
const router = express.Router();

router.get('/mod', (req, res) => {
    return userModeratorDB
        .getModerators()
        .then(moderators => {
            res.status(200).json(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get moderators'
            })
        })
})

module.exports = router;