// DEPENDENCIES
const express = require('express');
const userModeratorDB = require('../db/models/userModeratorDB');
const router = express.Router();

router.get('/:id', (req, res) => {
    return userModeratorDB
        .getModerators(req.params.id)
        .then(moderators => {
            res.status(200).json(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get moderators'
            })
        })
})
router.get('/changeToMod/:user_id', (req, res) => {

    return userModeratorDB
        .changeToModerator(req.params.user_id)
        .then(moderators => {
            if(moderators===1){
                res.status(202).json(moderators)
            }
            console.log(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: `Failed to update${err}`
            })
        })
})
router.get('/changeToBasic/:user_id', (req, res) => {

    return userModeratorDB
        .changeToBasic(req.params.user_id)
        .then(moderators => {
            if(moderators===1){
                res.status(202).json(moderators)
            }
            console.log(moderators)
        })
        .catch(err => {
            res.status(500).json({
                error: `Failed to update${err}`
            })
        })
})
module.exports = router;