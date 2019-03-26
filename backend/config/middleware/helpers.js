const checkIfInTeam = (team_id, user_id, team_members) => {
  for(let i = 0; i < team_members.length; i++){
    
    if(team_members[i].team_id === (Number(team_id)) && team_members[i].user_id === (Number(user_id))){
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  checkIfInTeam
};