
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', team => {
    team.increments(); //sets up primary key 'id'

    //Team name
    team.string('team_name', 100).notNullable().unique();

    //wiki 
    team.text('wiki', 1000).notNullable();

    //wether the team board is private or not
    team.boolean('isPrivate');

    //Date in seconds
    team.timestamps(true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teams');
};
