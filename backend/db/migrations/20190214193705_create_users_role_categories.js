exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_role_categories', function(tbl) {
    /*  Relationship
      - Many user_id's can have many category_id's
      - Many category_id's can have many user_id's
      - One role per relationship/row between category_id and user_id
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

    // Role: super_moderator and moderator Only
    tbl.string('role', 32).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_role_categories');
};
