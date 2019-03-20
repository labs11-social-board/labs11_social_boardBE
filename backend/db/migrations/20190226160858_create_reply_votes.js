exports.up = function(knex, Promise) {
    return knex.schema.createTable('reply_votes', function(tbl) {
      //Foreign Key 'reply_id'
      tbl
        .integer('reply_id')
        .references('id')
        .inTable('replies')
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
    return knex.schema.dropTableIfExists('reply_votes');
  };
