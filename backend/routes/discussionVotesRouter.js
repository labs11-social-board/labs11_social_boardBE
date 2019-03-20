/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { discussionVotesDB } = require('../db/models/index.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// add discussion vote
router.post('/:user_id', authenticate, (req, res) => {
	// discussion_id and type are integers
	const { discussion_id, type } = req.body;
	// user_id needs to be converted from string to integer
	let { user_id } = req.params;
	user_id = parseInt(user_id);
	if (
		// if none of these variables is an integer
		!Number.isInteger(discussion_id) ||
		!Number.isInteger(user_id) ||
		!Number.isInteger(type)
	) {
		// return an error message stating they must all be integers
		return res.status(400).json([{ error: 'discussion_id, user_id, and type must all be integers.' }]);
	}

	// check to see if the user already voted on this discussion
	return discussionVotesDB.get(discussion_id, user_id)
		.then(discussion => {
			// if they have voted on it
			if (discussion.length) {
				// and it was the same vote type, remove the vote
				if (discussion[0].type === type) {
					return discussionVotesDB.remove(discussion_id, user_id)
						.then(() => res.status(201).json([{ message: 'Vote removed.' }]))
						.catch(err => res.status(500).json({ error: `Failed to remove(): ${ err }` }));
				}
				// else if it wasnt the same vote type, update the vote type
				return discussionVotesDB.update(discussion_id, user_id, type)
					.then(() => res.status(201).json([{ message: 'Vote changed.' }]))
					.catch(err => res.status(500).json({ error: `Failed to update(): ${ err }` }));
			}
			// if they have not voted on the discussion, add the vote to the database
			return discussionVotesDB.add(discussion_id, user_id, type)
				.then(() => res.status(201).json([{ message: 'Vote added!' }]))
				.catch(err => res.status(500).json({ error: `Failed to add(): ${ err }` }));
		})
		.catch(err => res.status(500).json({ error: `Failed to get(): ${ err }` }));
});

module.exports = router;
