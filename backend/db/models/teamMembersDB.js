const db = require('../dbConfig.js');

const getTeamMembers = team_id => {
  return db('team_members as tm')
    .select(
      'tm.team_id',
      't.team_name',
      'tm.user_id',
      'u.username',
      'tm.role',
      'us.avatar',
      'u.uuid')
    .join('users as u', 'u.id', 'tm.user_id')
    .join('user_settings as us', 'us.user_id', 'tm.user_id')
    .join('teams as t', 't.id', 'tm.team_id')
    .where({ team_id });
};

const getTeamMember = (user_id, team_id) => {
  return db('team_members')
    .where({ user_id, team_id })
    .first();
}

const addTeamMember = async (user_id, team_id, role) => {
  const member = { user_id, team_id, role };
  const newMem = await db('team_members').insert(member);

  return getTeamMembers(team_id);
}

const deleteTeamMember = async (user_id, team_id) => {
  const del = await db('team_members').where({ user_id, team_id }).del();

  return getTeamMembers(team_id);
}

const updateRole = async (user_id, team_id, role) => {
  const update = await db('team_members').where({team_id, user_id }).update('role', role, ['role']);

  return getTeamMembers(team_id);
  
}

module.exports = {
  getTeamMembers,
  getTeamMember,
  addTeamMember,
  deleteTeamMember,
};