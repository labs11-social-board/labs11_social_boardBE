const { teamMembersDB } = require('../../db/models/index.js');

const checkIfInTeam = (user_id, team_members) => {
  const filtered = team_members.filter(member => member.user_id === Number(user_id));

  if(filtered.length > 0){
    return true;
  } else {
    return false;
  }
}

//Middleware function used to check the role of a User of a Team Board
async function checkRole (req, res, next) {
  const { user_id, team_id } = req.params;
  const teamId = req.body.team_id;

  if(!teamId){
    next();
  } else if (!team_id){
    const member = await teamMembersDB.getTeamMember(user_id, teamId);

    if(!member){
      res.status(401).json({ error: 'You are not a Member of this Team'});
    } else {
      next();
    }
  } else {
    const member = await teamMembersDB.getTeamMember(user_id, team_id);

    if(!member){
      res.status(401).json({ error: 'You are not a Member of this Team'});
    } else {

      if(member.role !== 'team_owner'){
        res.status(401).json({ error: 'Only Team Owners can do this'});
      } else {
        next();
      }
    }
  }
}

module.exports = {
  checkIfInTeam,
  checkRole
};