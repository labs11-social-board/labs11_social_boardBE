require('dotenv').config();
const express = require('express');
const { repliesDB, postsDB, userNotificationsDB } = require('../db/models/index.js');
const router = express.Router();

const { maxNumOfNotifications } = require('../config/globals.js');
const pusher = require('../config/pusherConfig.js');

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/

// create reply by given user_id to the selected post_id
router.post('/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  const { post_id, replyBody } = req.body;
  const created_at = Date.now();

  if (!replyBody) return res.status(400).json({ error: 'Reply body must not be empty.' });
  const newReply = { user_id, post_id, body: replyBody, created_at };
  return repliesDB
    .insert(newReply)
    .then(async newId => {
      const user = await postsDB.getDiscAndUserInfoFromPostID(post_id);
      const newNotification = {
        user_id: user.user_id,
        discussion_id: user.discussion_id,
        post_id,
        reply_id: newId[0],
        created_at,
      };
      const notifications = await userNotificationsDB.getCount(user.user_id);
      if (parseInt(notifications.count) >= maxNumOfNotifications) {
        await userNotificationsDB.removeOldest(user.user_id);
      }
      await userNotificationsDB.add(newNotification);
      pusher.trigger(
        `user-${user.uuid}`,
        'notification',
        null,
      );
      return res.status(201).json(newId);
    })
    .catch(err => res.status(500).json({ error: `Failed to insert(): ${err}` }))
});

// edit reply with the reply_id
router.put('/:user_id', authenticate, (req, res) => {
  const { reply_id, replyBody } = req.body;
  const last_edited_at = Date.now();
  const reply = { body: replyBody, last_edited_at };
  if (!replyBody) return res.status(400).json({ error: 'Reply body empty.' })
  if (!reply_id) return res.status(400).json({ error: 'Reply ID required.' })
  return repliesDB
    .update(reply_id, reply)
    .then(() => res.status(201).json({ message: 'Reply successful' }))
    .catch(err => res.status(500).json({ error: `Failed to update(): ${err}` }))
});

//Delete Reply with Given Reply ID
router.delete('/:user_id', authenticate, (req, res) => {
  const reply_id = req.get('reply_id');
  if (!reply_id) return res.status(400).json({ error: 'Reply ID required.' });
  return repliesDB
    .remove(reply_id)
    .then(() => res.status(201).json({ message: 'Reply deleted.' }))
    .catch(err => res.status(500).json({ error: `Failed to remove(): ${err}` }));
});

module.exports = router;