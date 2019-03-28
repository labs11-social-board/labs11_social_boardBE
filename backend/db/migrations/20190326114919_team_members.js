
exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_members', tm => {
    // teams reference key
    tm
      .integer('team_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE');

    // users reference key
    tm
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // Role: team_owner or member 
    tm.string('role', 50).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('team_members');
};
