exports.up = function(knex, Promise) {
  return knex.schema.createTable('category_follows', function(tbl) {
    /*  Relationship
      - many user_id's can have/follow many categories_id's
      - many categories_id's can have many user_id's/followers
    */

    // categories reference key
    tbl
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
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
  return knex.schema.dropTableIfExists('category_follows');
};
