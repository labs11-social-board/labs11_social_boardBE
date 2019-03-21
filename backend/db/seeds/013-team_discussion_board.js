
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teams').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {team_name: 'labs11', wiki: 'Labs 11 is the best labs group to date!', isPrivate: false },
      ]);
    });
};
