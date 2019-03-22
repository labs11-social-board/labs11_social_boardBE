const express = require('express');

const { discussionsDB } = require('../db/models/index.js');

const router = express.Router();

const { authenticate } = require('../config/middleware/authenticate.js');

//get discussions for a Team
router.get('/discussions/:team_id/:user_id', authenticate, async (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { team_id } = req.body;
  try {
    const discussions = await discussionsDB.findByTeamId(team_id, order, orderType);

    res.status(200).json(discussions);
  } catch(err){
    console.log(err)
    res.status(500).json({ error: 'Unable to get the discussions for the Team' });
  }
});

router.get('/discussion/:id/:user_id', authenticate, async (req,res) => {
  const { id } = req.params;

  try {
    const discussion = await discussionsDB.getTeamDiscussionPostsById(id);

    res.status(200).json(discussion);
  } catch(err) {
    console.log(err)
    res.status(500).json({ error: 'Unable to get the discussion from the Team' });
  }
})

module.exports = router;