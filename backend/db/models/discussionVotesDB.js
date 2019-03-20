const db = require('../dbConfig.js');

// returns a row if the user already voted on the discussion
const get = (discussion_id, user_id) => {
	return db('discussion_votes')
		.select('type')
		.where({ discussion_id })
		.andWhere({ user_id });
};

// adds a vote for a certain discussion by a certain user
const add = (discussion_id, user_id, type) => {
	return db('discussion_votes').insert({ discussion_id, user_id, type });
};

// changes type of vote for a certain discussion by a certain user
const update = (discussion_id, user_id, type) => {
	return db('discussion_votes')
		.update({ type })
		.where({ discussion_id })
		.andWhere({ user_id });
};

// removes a vote for a certain discussion by a certain user
const remove = (discussion_id, user_id) => {
	return db('discussion_votes')
		.del()
		.where({ discussion_id })
		.andWhere({ user_id });
};

module.exports = {
	add,
	get,
	remove,
	update,
};
