
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
  if(knex.schema.hasColumn('discussions', 'team_id')){
    return knex.schema.table('discussions', disc => {
      disc.dropColumn('team_id');
    })
  }
};
