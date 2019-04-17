
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        { team_name: 'labs11', wiki: 'Labs 11 is the best labs group to date!', isPrivate: false },
        { team_name: 'PrivateTeam', wiki: 'This is private!', isPrivate: true },
        {team_name: "Algo\'s", wiki: 'Designed for data structures and algorithms students', isPrivate: false},
      ]);
    });
};
