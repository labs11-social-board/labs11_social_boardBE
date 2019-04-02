exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_notifications', function(tbl) {
		tbl
			.increments();

		tbl
			.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');

		tbl
			.integer('category_id')
			.references('id')
			.inTable('categories')
			.onDelete('CASCADE');

		tbl
			.integer('discussion_id')
			.references('id')
			.inTable('discussions')
			.onDelete('CASCADE');

		tbl
			.integer('post_id')
			.references('id')
			.inTable('posts')
			.onDelete('CASCADE');

		tbl
			.integer('reply_id')
			.references('id')
			.inTable('replies')
			.onDelete('CASCADE');

		tbl
			.bigInteger('created_at') // milliseconds since the epoch
			.notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('user_notifications');
};
