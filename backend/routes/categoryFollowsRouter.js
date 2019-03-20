/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { categoryFollowsDB } = require('../db/models/index.js');

const router = express.Router();
/***************************************************************************************************
 ******************************************* middleware ******************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

// User can follow a category
router.post('/:user_id/:category_id', authenticate, (req, res) => {
	const { category_id, user_id } = req.params;
	// check first to see if user_id is following category_id
	return categoryFollowsDB
		.get(category_id, user_id)
		.then(follow => {
			if (follow.length > 0) {
				// if user is already following this category, remove the follow
				return categoryFollowsDB
					.remove(category_id, user_id)
					.then((follows) => res.status(201).json(follows))
					.catch(err => res.status(500).json({ error: `Failed to remove(): ${ err }` }));
			}
			// else if user is not following this discussion, add the follow
			return categoryFollowsDB
				.add(category_id, user_id)
				.then((follows) => res.status(201).json(follows))
				.catch(err => res.status(500).json({ error: `Failed to add(): ${ err }` }));
		})
		.catch(err => res.status(500).json({ error: `Failed to get(): ${ err }` }));
});

module.exports = router;