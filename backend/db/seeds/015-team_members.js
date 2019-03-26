
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('team_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('team_members').insert([
        {team_id: 1, user_id: 505, role: 'team_owner'},
      ]);
    });
};
