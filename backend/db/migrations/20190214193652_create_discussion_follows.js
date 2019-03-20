exports.up = function(knex, Promise) {
  return knex.schema.createTable('discussion_follows', function(tbl) {
    /*  Relationship
      - many user_id's can have/follow many discussion_id's
      - many discussion_id's can have many user_id's/followers
    */

    // discussions reference key
    tbl
      .integer('discussion_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('discussions')
      .onDelete('CASCADE');

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('discussion_follows');
};
