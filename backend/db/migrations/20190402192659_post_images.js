
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_images', pi => {
    pi.increments();
    
    //reference key to the post the image is being added to
    pi
      .integer('post_id')
      .unsigned()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE');
    
    pi
      .integer('replies_id')
      .unsigned()
      .references('id')
      .inTable('replies')
      .onDelete('CASCADE')

    // image: base64
    pi.text('image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post_images');
};
