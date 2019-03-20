/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const { postsDB, discussionFollowsDB, userNotificationsDB } = require('../db/models/index.js');
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

router.get('/search', (req, res) => {
  const searchText = req.get('searchText');
  let order = req.get('order');
  let orderType = req.get('orderType');
  if (order === 'undefined') order = null;
  if (orderType === 'undefined') orderType = null;
  if (!searchText) return res.status(200).json([]);
  return postsDB.search(searchText, order, orderType)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({ error: `Failed to search(): ${err}` }));
});

// create a post by a given user_id to a given discussion_id
router.post('/:user_id', authenticate, (req, res) => {
  const { user_id } = req.params;
  const { discussion_id, postBody, repliedPostID } = req.body;
  const created_at = Date.now();
  if (!postBody) return res.status(400).json({ error: 'Post body must not be empty.' });
  const newPost = { user_id, discussion_id, body: postBody, created_at };
  if (repliedPostID) newPost.reply_to = repliedPostID;
  return postsDB
    .insert(newPost)
    .then(async newId => {
      const discFollowers = await discussionFollowsDB.getFollowers(discussion_id);
      discFollowers.forEach(async user => {
        const newNotification = { user_id: user.user_id, discussion_id, post_id: newId[0], created_at };
        const notifications = await userNotificationsDB.getCount(user.user_id);
        if (parseInt(notifications.count) >= maxNumOfNotifications) {
          await userNotificationsDB.removeOldest(user.user_id);
        }
        await userNotificationsDB.add(newNotification);
        pusher.trigger(
          `user-${ user.uuid }`,
          'notification',
          null,
        );
      });
      return res.status(201).json({ message: 'Post creation successful.' })
    })
    .catch(err => res.status(500).json({ error: `Failed to insert(): ${err}` }));
});

// edit post with given post id
router.put('/:user_id', authenticate, (req, res) => {
  const { post_id, postBody } = req.body;
  const last_edited_at = Date.now();
  const post = { body: postBody, last_edited_at };
  if (!postBody) return res.status(400).json({ error: 'Post body must not be empty.' });
  if (!post_id) return res.status(400).json({ error: 'Post ID is required.' });
  return postsDB
    .update(post_id, post)
    .then(() => res.status(201).json({ message: 'Post update successful.' }))
    .catch(err => res.status(500).json({ error: `Failed to update(): ${err}` }));
});

// remove post with given post id
router.delete('/:user_id', authenticate, (req, res) => {
  const post_id = req.get('post_id');
  if (!post_id) return res.status(400).json({ error: 'Post ID is required.' });
  return postsDB
    .remove(post_id)
    .then(() => res.status(201).json({ message: 'Post removal successful.' }))
    .catch(err => res.status(500).json({ error: `Failed to remove(): ${err}` }));
});

module.exports = router;
