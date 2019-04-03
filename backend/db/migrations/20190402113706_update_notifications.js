
exports.up = function(knex, Promise) {
  return knex.schema.table('user_notifications', un => {
    un
			.integer('team_id')
			.references('id')
			.inTable('teams')
			.onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  if(knex.schema.hasColumn('user_notifications', 'team_id')){
    return knex.schema.table('user_notifications', un => {
      un.dropColumn('team_id');
    })
  }
};
