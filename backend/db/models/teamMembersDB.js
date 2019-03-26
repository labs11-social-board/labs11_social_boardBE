const db = require('../dbConfig.js');

const getTeamMembers = team_id => {
  return db('team_members')
    .where({ team_id });
};

const addTeamMember = async (user_id, team_id, role) => {
  const member = { user_id, team_id, role };
  const newMem = await db('team_members').insert(member);

  return getTeamMembers(team_id);
}

const deleteTeamMember = async (user_id, team_id) => {
  const del = await db('team_members').where({ user_id, team_id }).del();

  return getTeamMembers(team_id);
}

module.exports = {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
};