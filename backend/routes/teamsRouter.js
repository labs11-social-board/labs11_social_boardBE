/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require("dotenv").config();
const express = require("express");
const { teamsDB } = require("../db/models/index.js");

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require("../config/middleware/authenticate.js");

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

router.post('/:user_id', authenticate, (req, res) => {
  const { new_team } = req.body;
  const { user_id } = req.params;
  return teamsDB
    .addTeamBoard(new_team)
    .then(team => res.status(200).json({ id: team.id }))
    .catch(err =>
      res.status(500).json({
        error: `Failed to get team information: ${err}`
      })
    );
});

router.get('/:user_id/:team_name', authenticate, (req, res) => {
  const { team_name } = req.params;
  return teamsDB
    .getTeamByName(team_name)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(500).json({
        error: `Failed to get team information: ${err}`
      })
    );
});

router.get('/:user_id/:id', authenticate, (req, res) => {
  const { id } = req.params;
  return teamsDB
    .getTeamById(id)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(500).json({ error: `Failed to get team information: ${err}` })
    );
});

//Update Team information
router.put('/:user_id/:id', authenticate, (req, res) => {
  const { id, user_id } = req.params;
  const { Changes } = req.params;
  return teamsDB
    .updateTeamBoard(id, Changes)
    .then(team => res.status(200).json({ id: team.id }))
    .catch(err =>
      res.status(500).json({
        error: `Failed to update team information: ${err}`
      })
    );
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
router.get('/discussion/posts/:user_id/:id', authenticate, async (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { id, user_id } =  req.params;
  
  try {
    const posts = await teamsDB.getTeamDiscussionPostsById(id, user_id, order, orderType);

    res.status(200).json(posts);

  } catch(err) {
    res.status(500).json({error: `Failed to getTeamDiscussionPostsById(): ${err}` });
  }
});

module.exports = router;
