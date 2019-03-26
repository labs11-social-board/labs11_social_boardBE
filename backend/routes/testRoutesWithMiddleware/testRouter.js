/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
// const { backendStripePkToken } = require('../../config/globals.js');
const express = require('express');
// const base64Img = require('base64-img');
// const stripe = require('stripe')(backendStripePkToken);
const { teamsDB } = require('../../db/models/index.js');

const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
/*const {
  refreshTokenAsNeeded
} = require('../../config/middleware/authenticate.js');
*/
/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.get('/', (req, res, next) => {
  res
    .status(200)
    .json({ message: 'used for directly testing endpoint/middleware logic' });
});

/*router.get('/auth_refresh_token', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const rToken = await refreshTokenAsNeeded(token);
    return res
      .status(200)
      .json({ message: 'success', old_token: token, refreshed_token: rToken });
  } catch (err) {
    next(err);
  }
});
*/


/*router.get('/url_to_base64', async (req, res, next) => {
  try {
    const url = 'https://i.imgur.com/6gMn1RD.png';
    let base64;
    // let base64;
    base64Img.requestBase64(url, function (err, result, body) {
      console.log('BODY', body.slice(0, 30));
      base64 = body.slice(0, 30);
      console.log('base64_inside_cb', body.slice(0, 30));
    });
    console.log('base64_outside_cb', typeof base64);
    res.send({ message: 'success' });
  } catch (err) {
    next(err);
  }
});
*/

/*router.post('/stripe', (req, res, next) => {
  const stripeToken = req.body.data.stripeToken;
  const payment = Number(req.body.data.payment);


  (async () => {
    try {
      const charge = await stripe.charges.create({
        amount: payment,
        currency: 'usd',
        description: 'silver plan',
        source: stripeToken
      });
      res.status(201).json([{ charge }]);
    } catch (err) {
      res.status(401).json({ err })
    }
  })();
})
*/

router.get('/teams/discussion/:id/:user_id', async (req, res) => {
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

router.get('/teams/:team_id/:user_id', async (req, res) => {
  const order = req.get('order');
  const orderType = req.get('orderType');
  const { team_id, user_id } = req.params;

  try {
    const discussions = await teamsDB.findByTeamId(team_id, user_id, order, orderType);

    res.status(200).json(discussions);
  } catch(err) {
    res.status(500).json({ error: `unable to findByTeamId(): ${err}`});
  }

});

module.exports = router;
