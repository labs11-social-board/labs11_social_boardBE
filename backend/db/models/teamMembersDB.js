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

const deleteTeamMember = (user_id, team_id) => {
  return db('team_members')
    .where({ user_id, team_id })
    .del();
}

module.exports = {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
};