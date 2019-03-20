/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { discussionFollowsDB } = require('../db/models/index.js');
const router = express.Router();

/***************************************************************************************************
 ******************************************* middleware ******************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

// User can follow a discussion
router.post('/:user_id/:discussion_id', authenticate, (req, res) => {
	const { discussion_id, user_id } = req.params;
	// check first to see if user_id is following discussion_id
	return discussionFollowsDB
		.get(discussion_id, user_id)
		.then(follow => {
			if (follow.length > 0) {
				// if user is already following this discussion, remove the follow
				return discussionFollowsDB
					.remove(discussion_id, user_id)
					.then((follows) => res.status(201).json(follows))
					.catch(err => res.status(500).json({ error: `Failed to remove(): ${ err }` }));
			}
			// else if user is not following this discussion, add the follow
			return discussionFollowsDB
				.add(discussion_id, user_id)
				.then((follows) => res.status(201).json(follows))
				.catch(err => res.status(500).json({ error: `Failed to add(): ${ err }` }));
		})
		.catch(err => res.status(500).json({ error: `Failed to get(): ${ err }` }));
});

module.exports = router;