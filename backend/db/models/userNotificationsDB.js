const db = require('../dbConfig.js');

const getAll = user_id => {
	return db('user_notifications as un')
		.select(
			'un.id',
			'un.category_id',
			'c.name as category_name',
			'un.discussion_id',
			'd.body as discussion_body',
			'un.post_id',
			'p.body as post_body',
			'un.reply_id',
			'r.body as reply_body',
			'un.created_at',
		)
		.leftOuterJoin('categories as c', 'c.id', 'un.category_id')
		.leftOuterJoin('discussions as d', 'd.id', 'un.discussion_id')
		.leftOuterJoin('posts as p', 'p.id', 'un.post_id')
		.leftOuterJoin('replies as r', 'r.id', 'un.reply_id')
		.where('un.user_id', user_id)
		.orderBy('un.created_at', 'desc');
};

const getCount = user_id => {
	return db('user_notifications')
		.count({ count: 'user_id' })
		.where({ user_id })
		.first();
};

const add = notification => {
	return db('user_notifications')
		.insert(notification);
};

const remove = id => {
	return db('user_notifications')
		.where({ id })
		.del();
};

const removeOldest = user_id => {
	return db.raw(`
		DELETE FROM user_notifications
		WHERE ctid IN (
			SELECT ctid
			FROM user_notifications
			WHERE user_id = ${ user_id }
			ORDER BY created_at
			LIMIT 1
		)
	`);
};

module.exports = {
	getAll,
	getCount,
	add,
	remove,
	removeOldest,
};
