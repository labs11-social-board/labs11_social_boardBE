
exports.up = function(knex, Promise) {
  return knex.schema.table('discussions', disc => {
    //Foreign Key 'team_id'
    disc
      .integer('team_id')
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropColumn('team_id');
};
