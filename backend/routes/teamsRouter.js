const express = require('express');

const { teamsDB } = require('../db/models/index.js');

const router = express.Router();

const { authenticate } = require('../config/middleware/authenticate.js');

//get discussions for a Team
router.get('/discussions/:team_id/:user_id', authenticate, async (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { team_id } = req.body;
  try {
    const discussions = await teamsDB.getTeamDiscussions(team_id, order, orderType);

    res.status(200).json(discussions);
  } catch(err){
    console.log(err)
    res.status(500).json({ error: 'Unable to get the discussions for the Team' });
  }
});

module.exports = router;