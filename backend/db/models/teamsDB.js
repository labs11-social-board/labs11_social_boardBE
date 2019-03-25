const db = require('../dbConfig.js');

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

//Finds the Team by their id in the database
const getTeamById = id => {
  return db('teams')
    .where({ id })
    .first();
};

//Adds a Team Board to the database and returns the team board that was added
const addTeamBoard = async (team) => {
  const [id] = await db('teams').insert(team, 'id');

  return getTeamById(id);
};

//Updates the Team Boards information and returns the updated Team from the database
const updateTeamBoard = (id, changes) => {
  return db('teams')
    .where({ id })
    .update(changes)
    .then(updated => (updated > 0 ? getTeamById(id) : null ));
};

//Delete the Team board from the database
const deleteTeamBoard = id => {
  return db('teams')
    .where({ id })
    .del();
};

module.exports = {
  getTeams,
  getTeamByName,
  addTeamBoard,
  updateTeamBoard,
  deleteTeamBoard
};