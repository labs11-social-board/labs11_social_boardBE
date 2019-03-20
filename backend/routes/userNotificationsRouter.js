/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
// require('dotenv').config();
const express = require('express');
const { userNotificationsDB } = require('../db/models/index.js');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.get('/user/:user_id', authenticate, (req, res) => {
	const { user_id } = req.params;
	return userNotificationsDB
		.getAll(user_id)
		.then(notifications => res.status(200).json(notifications))
		.catch(err => res.status(500).json({ error: `Failed to getAll(): ${ err }` }));
});

router.delete('/:id/:user_id', authenticate, (req, res) => {
	const { id, user_id } = req.params;
	return userNotificationsDB
		.remove(id)
		.then(() => {
			return userNotificationsDB
				.getAll(user_id)
				.then(notifications => res.status(201).json(notifications))
				.catch(err => res.status(500).json({ error: `Failed to getAll(): ${ err }` }));
		})
		.catch(err => res.status(500).json({ error: `Failed to remove(): ${ err }` }));
});

module.exports = router;
