const db = require('../dbConfig.js');

const getTeamMembers = team_id => {
  return db('team_members')
    .where({ team_id });
};

const addTeamMember = (user_id, team_id, role) => {
  const member = { user_id, team_id, role };
  return db('team_members')
    .insert(member);
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