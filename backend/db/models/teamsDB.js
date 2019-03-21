const db = require('../dbConfig.js');

module.exports = {
  getTeams,
  getTeamByName,
  addTeamBoard
};

//returns all the Teams in the teams table in the database
const getTeams = () => {
  return db('teams');
};

//Finds the Team by it's name in the database
const getTeamByName = team_name => {
  return db('teams')
    .where({ team_name })
    .first();
};

//Adds a Team Board to the database and returns the team board that was added
const addTeamBoard = async (team) => {
  const [id] = await db('teams').insert(team, 'id');

  return db('teams').where({ id }).first();
};