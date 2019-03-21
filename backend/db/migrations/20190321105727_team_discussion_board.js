
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', team => {
    team.increments(); //sets up primary key 'id'

    //Team name
    team.string('team_name', 100).notNullable().unique();

    //wiki 
    team.text('wiki', 1000).notNullable();

    //wether the team board is private or not
    team.boolean('isPrivate').notNullable();

    //When created links the user that created the Team Board as the team owner
    team
      .integer('team_owner_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');

    //Date in seconds
    team.timestamp('created_at').defaultTo(knex.fn.now());
    team.timestamp('updated_at');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teams');
};
