require('dotenv').config();
const express = require('express');
const { replyVotesDB } = require('../db/models/index.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

//add reply vote
router.post('/:user_id', authenticate, (req, res) => {
    const { reply_id, type } = req.body;
    let { user_id } = req.params;
    user_id = parseInt(user_id);
    if(
        !Number.isInteger(reply_id) ||
        !Number.isInteger(user_id) ||
        !Number.isInteger(type)
    ){
        return res.status(400).json({ error:  'reply_id, user_id, and type must all be integers.' })
    }
    //Check to see if User has already voted
    return replyVotesDB.get(reply_id, user_id)
        .then(post => {
            //If user had already voted
            if (post.length) {
                //and it was the same vote type
                if(post[0].type === type) {
                //then remove the vote
                return replyVotesDB.remove(reply_id, user_id)
                    .then(() => res.status(201).json({ error: 'Vote has been removed' }))
                    .catch((err) => res.status(500).json({ error: `Failed to remove(): ${ err }` }))        
            }
            // else if it wasnt the same vote type, update the vote type
            return replyVotesDB.update(reply_id, user_id, type)
                .then(() => res.status(201).json([{ message: 'Vote changed.' }]))
                .catch(err => res.status(500).json({ error: `Failed to update(): ${ err }` }));
            }
            //Else If user has not voted, add the vote type
            return replyVotesDB.add(reply_id, user_id, type)
                .then(() => res.status(200).json({ message: 'Vote added!'}))
                .catch((err) => res.status(500).json({ error: `Failed to add(): ${ err }` }))
            })
        .catch((err) => {
            res.status(500).json({ error: `Failed to get(): ${ err }`});
        });
});

module.exports = router;
