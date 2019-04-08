// DEPENDENCIES
const express = require('express');
const userModeratorDB = require('../db/models/userModeratorDB');
const router = express.Router();

// Get All Users With Moderators At The Top
router.get('/', (req, res) => {
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
});

// Get Individual User 
router.get('/:id', (req, res) => {
    return userModeratorDB
        .getUser(req.params.id)
        .then(moderators => {
            res.status(200).json(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get moderators'
            })
        })
});

router.get('/changeToMod/:user_id', (req, res) => {

    return userModeratorDB
        .changeToModerator(req.params.user_id)
        .then(moderators => {
            if (moderators === 1) {
                res.status(202).json(moderators)
            } else {
                res.status(401).json({ message: 'already a moderator' })
            }
            console.log(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: `Failed to update${err}`
            })
        })
});

router.get('/changeToBasic/:user_id', (req, res) => {

    return userModeratorDB
        .changeToBasic(req.params.user_id)
        .then(moderators => {
            if (moderators) {
                res.status(202).json(moderators)
            }
            console.log(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: `Failed to update${err}`
            })
        })
});

// Hide Comments By A Moderator
router.post('/hide-post/:id/:user_id', (req, res) => {
    const moderator = req.params.user_id;
    const post = req.body;
    return userModeratorDB
        .hidePost(post, moderator)
        .then()
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;