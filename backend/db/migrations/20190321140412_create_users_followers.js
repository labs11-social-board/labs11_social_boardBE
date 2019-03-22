exports.up = function(knex, Promise) {
    return knex.schema.createTable("user_followers", function(tbl) {
      //primary key 'id'
      tbl.increments();
      //user_id
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      //following_id
      tbl
        .integer("following_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("user_followers");
  };