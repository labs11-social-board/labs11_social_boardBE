exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_votes', function(tbl) {
    //Foreign Key 'post_id'
    tbl
      .integer('post_id')
      .references('id')
      .inTable('posts')
      .notNullable()
      .onDelete('CASCADE');

    //Foreign Key 'user_id'
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    // 1 for upvote / -1 for downvote
    tbl.integer('type').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post_votes');
};
