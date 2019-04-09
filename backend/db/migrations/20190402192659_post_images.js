
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

    //reference key to the reply the image is being added to
    pi
      .integer('replies_id')
      .unsigned()
      .references('id')
      .inTable('replies')
      .onDelete('CASCADE')

    //reference key to the discussion the image is being added to
    pi
      .integer('discussion_id')
      .unsigned()
      .references('id')
      .inTable('discussions')
      .onDelete('CASCADE')

    pi
      .integer('team_id')
      .unsigned()
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE')

    // image: base64
    pi.text('image');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post_images');
};
