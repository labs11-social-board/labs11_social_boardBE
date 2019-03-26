/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require("dotenv").config();
const express = require("express");
const { teamsDB, teamMembersDB } = require("../db/models/index.js");

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require("../config/middleware/authenticate.js");
const { checkIfInTeam, checkRole } = require("../config/middleware/helpers.js");

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

//Add a Team to the Database
router.post('/:user_id', authenticate, async (req, res) => {
  const team = req.body;
  const { user_id } = req.params;
  const role = 'team_owner';

  try {
    const teamBoard = await teamsDB.addTeamBoard(team);
    const teamOwner = await teamMembersDB.addTeamMember(user_id, teamBoard.id, role);

    res.status(201).json({ teamBoard, teamOwner })
  } catch(err) {
    res.status(500).json({ error: `Unable to addTeamBoard(): ${err}`});
  }
});

// router.get('/:user_id/:team_name', authenticate, (req, res) => {
//   const { team_name } = req.params;
//   return teamsDB
//     .getTeamByName(team_name)
//     .then(team => res.status(200).json(team))
//     .catch(err =>
//       res.status(500).json({
//         error: `Failed to get team information: ${err}`
//       })
//     );
// });

//Get Team information by Id
router.get('/:user_id/:team_id', authenticate, checkIfPrivate, (req, res) => {
  const { team_id } = req.params;
  
  return teamsDB
    .getTeamById(team_id)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(500).json({ error: `Failed to get team information: ${err}` })
    );
});

//Update Team information
router.put('/:user_id/:team_id', authenticate, checkRole, async (req, res) => {
  const { team_id, user_id } = req.params;
  const changes = req.body;
  
  try {
    const updated = await teamsDB.updateTeamBoard(team_id, changes);

    if(updated === null){
      res.status(400).json({ error: 'Only the Team Owner can update the Teams information' });
    } else {
      res.status(200).json(updated);
    }
  } catch (err) {
    res.status(500).json({ error: `Unable to update the Team information: ${err}`});
  }
});

//Get discussions for a Team by it's id
router.get('/discussions/:user_id/:team_id', authenticate, async (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { user_id, team_id } = req.params;
  
  try {
    const discussions = await teamsDB.findByTeamId(team_id, user_id, order, orderType);

    res.status(200).json(discussions);
  } catch(err) {
    res.status(500).json({ error: `unable to findByTeamId(): ${err}`});
  }
});

//Get the posts for the discussion selected from the Team Board using the discussions ID
router.get('/discussion/posts/:user_id/:discussion_id', authenticate, async (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { discussion_id, user_id } =  req.params;
  
  try {
    const posts = await teamsDB.getTeamDiscussionPostsById(discussion_id, user_id, order, orderType);

    res.status(200).json(posts);

  } catch(err) {
    res.status(500).json({error: `Failed to getTeamDiscussionPostsById(): ${err}` });
  }
});

//Get the team members of a Team
router.get('/team_members/:user_id/:team_id', authenticate, async (req, res) => {
  const { team_id } = req.params;

  try {
    const members = await teamMembersDB.getTeamMembers(team_id);

    res.status(200).json(members);
  } catch(err) {
    res.status(500).json({ error: `Unable to getTeamMembers(): ${err}`});
  }
});

//Add a team member to a team
router.post('/team_members/:user_id/:team_id', authenticate, async (req, res) => {
  const { user_id, team_id } = req.params;
  const role = 'member';
  const team_members = await teamMembersDB.getTeamMembers(team_id);
  
  if(checkIfInTeam(team_id, user_id, team_members)){
    res.status(400).json({ error: 'That User is already apart of that Team!' });
  } else {
    try {
      const member = await teamMembersDB.addTeamMember(user_id, team_id, role);
  
      res.status(201).json(member);
    } catch(err) {
      res.status(500).json({ error: `Unable to addTeamMember(): ${err}`});
    }
  }
});

//Delete a team member from a team
router.delete('/team_members/:user_id/:team_id', authenticate, async (req, res) => {
  const { user_id, team_id } = req.params;

  try {
    const team_members = await teamMembersDB.deleteTeamMember(user_id, team_id);

    res.status(200).json({ message: 'Deleted the Team Member from the Team', team_members });
  } catch (err) {
    res.status(500).json({ error: `Unable to deleteTeamMember(): ${err}`});
  }
});

//Delete a Team member if you are the Team Owner
router.delete('/team_members/team_owner/:user_id/:team_id', authenticate, checkRole, async (req, res) => {
  const { team_id } = req.params;
  const { team_member_id } = req.body;

  if(!team_member_id){
    res.status(400).json({ error: 'Please send a team_member_id to be removed from the Team'})
  } else {
    try {
      const team_members = await teamMembersDB.deleteTeamMember(team_member_id, team_id);
  
      res.status(200).json({ message: 'Team Member Removed!', team_members });
    } catch(err) {
      res.status(500).json({ error: `Unable to deleteTeamMember(): ${err}`});
    }
  }
});

async function checkIfPrivate (req, res, next) {
  const { user_id, team_id } = req.params;
  const team = await teamsDB.getTeamById(team_id);

  if(team.isPrivate){
    const member = await teamMembersDB.getTeamMember(user_id, team_id);
    if(member){
      next();
    } else {
      res.status(401).json({ error: 'This Team is Private, you must be apart of the Team to view it'})
    }
  } else {
    next();
  }
}
module.exports = router;
