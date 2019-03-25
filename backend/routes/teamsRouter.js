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

router.post("/:user_id", authenticate, (req, res) => {
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

router.get("/:user_id/:team_name", authenticate, (req, res) => {
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

router.get("/:user_id/:id", authenticate, (req, res) => {
  const { id } = req.params;
  return teamsDB
    .getTeamById(id)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(500).json({ error: `Failed to get team information: ${err}` })
    );
});

router.put("/:user_id/:id", authenticate, (req, res) => {
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
})

module.exports = router;
