exports.up = function(knex, Promise) {
    return knex.schema.createTable('replies', function (tbl) {
        //Primary Key
        tbl.increments();
  
        //Foreign Key 'user_id' (user making the post)
        tbl
          .integer('user_id')
          .references('id')
          .inTable('users')
          .onDelete('SET NULL');
  
       //Foreign Key 'post_id' (post replied to)
       tbl
          .integer('post_id')
          .references('id')
          .inTable('posts')
          .notNullable()
          .onDelete('CASCADE');
  
       //Other Columns
       tbl.text('body', 2048).notNullable();
  
       // Date in milliseconds
      tbl.bigInteger('created_at').notNullable();
  
      // Date in milliseconds
      tbl.bigInteger('last_edited_at');
        
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('replies');
  };