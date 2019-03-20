exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', function (tbl) {
    // Primary Key 'id'
    tbl.increments();

    //Foreign Key 'user_id'
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    //Foreign Key 'discussion_id'
    tbl
      .integer('discussion_id')
      .references('id')
      .inTable('discussions')
      .notNullable()
      .onDelete('CASCADE');

    // Other Columns
    tbl.text('body', 2048).notNullable();

    // Date in milliseconds
    tbl.bigInteger('created_at').notNullable();

    // Date in milliseconds
    tbl.bigInteger('last_edited_at');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
