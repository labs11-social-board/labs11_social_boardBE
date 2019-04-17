
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('team_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('team_members').insert([
        {team_id: 1, user_id: 405, role: 'team_owner'},
        {team_id: 2, user_id: 405, role: 'team_owner'},
        {team_id: 1, user_id: 402, role: 'member'},
        {team_id: 2, user_id: 402, role: 'member'},
        {team_id: 3, user_id: 413, role: 'team_owner'},
        {team_id: 3, user_id: 414, role: 'member'},
        {team_id: 3, user_id: 300, role: 'member'},
        {team_id: 3, user_id: 301, role: 'member'},
        {team_id: 3, user_id: 302, role: 'member'},
        {team_id: 3, user_id: 303, role: 'member'},
        {team_id: 3, user_id: 304, role: 'member'},
        {team_id: 3, user_id: 305, role: 'member'},
        {team_id: 3, user_id: 306, role: 'member'},
        {team_id: 3, user_id: 307, role: 'member'},
        {team_id: 3, user_id: 308, role: 'member'},

      ]);
    });
};
