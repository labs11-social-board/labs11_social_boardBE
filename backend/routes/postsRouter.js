/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const Jimp = require('jimp');
const {
  postsDB,
  discussionFollowsDB,
  userNotificationsDB,
  teamsDB
} = require('../db/models/index.js');
const router = express.Router();

const {
  maxNumOfNotifications,
  allowedAvatarTypes
} = require('../config/globals.js');
const pusher = require('../config/pusherConfig.js');

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const { authenticate } = require('../config/middleware/authenticate.js');
const { checkRole } = require('../config/middleware/helpers.js');

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
  return postsDB
    .search(searchText, order, orderType)
    .then(results => {
      const newRes = results.filter(res => res.isPrivate !== true);
      res.status(200).json(newRes);
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to search(): ${err}` })
    );
});

// create a post by a given user_id to a given discussion_id
router.post('/:user_id', authenticate, checkRole, (req, res) => {
  const { user_id } = req.params;
  const { discussion_id, postBody, repliedPostID } = req.body;
  const created_at = Date.now();
  if (!postBody)
    return res.status(400).json({ error: 'Post body must not be empty.' });
  const newPost = { user_id, discussion_id, body: postBody, created_at };
  if (repliedPostID) newPost.reply_to = repliedPostID;
  return postsDB
    .insert(newPost)
    .then(async newId => {
      const discFollowers = await discussionFollowsDB.getFollowers(
        discussion_id
      );
      discFollowers.forEach(async user => {
        const newNotification = {
          user_id: user.user_id,
          discussion_id,
          post_id: newId[0],
          created_at
        };
        const notifications = await userNotificationsDB.getCount(user.user_id);
        if (parseInt(notifications.count) >= maxNumOfNotifications) {
          await userNotificationsDB.removeOldest(user.user_id);
        }
        await userNotificationsDB.add(newNotification);
        pusher.trigger(`user-${user.uuid}`, 'notification', null);
      });
      return res.status(201).json(newId);
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to insert(): ${err}` })
    );
});

// edit post with given post id
router.put('/:user_id', authenticate, (req, res) => {
  const { post_id, postBody } = req.body;
  const last_edited_at = Date.now();
  const post = { body: postBody, last_edited_at };
  if (!postBody)
    return res.status(400).json({ error: 'Post body must not be empty.' });
  if (!post_id) return res.status(400).json({ error: 'Post ID is required.' });
  return postsDB
    .update(post_id, post)
    .then(() => res.status(201).json({ message: 'Post update successful.' }))
    .catch(err =>
      res.status(500).json({ error: `Failed to update(): ${err}` })
    );
});

// remove post with given post id
router.delete('/:user_id/:post_id', authenticate, (req, res) => {
  const { post_id } = req.params;
  if (!post_id) return res.status(400).json({ error: 'Post ID is required.' });
  return postsDB
    .remove(post_id)
    .then(() => {
      res.status(201).json({ message: 'Post removal successful.' })
    })
    .catch(err =>
      res.status(500).json({ error: `Failed to remove(): ${err}` })
    );
});

// get the images for a Post
router.get('/images/:user_id/:post_id', async (req, res) => {
  const { post_id } = req.params;

  try {
    const images = await postsDB.getPostImagesByPostId(post_id);

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: `Unable to getPostImagesByPostId:${err}` });
  }
});

// Upload image for a Post
router.post('/images/:user_id', fileUpload(), async (req, res) => {
  const post_image = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  const imageFile = req.files.imageFile;
  const imageBuffer = imageFile.data;
  const mimeType = imageFile.mimetype;
  if (!allowedAvatarTypes.includes(mimeType)) {
    return res.status(401).json({
      error: `${mimeType.replace(
        'image/',
        ''
      )} is not an allowed avatar type. It must be a jpeg, jpg, png, bmp, or tiff.`
    });
  }

  try {
    const cImage = await Jimp.read(imageBuffer).then(image => {
      return image
        .scaleToFit(100, 100)
        .getBase64(Jimp.AUTO, (err, convertedImage) => {
          if (err) throw err;
          return (post_image.image = convertedImage);
        });
    });
    const image = await postsDB.addImage(post_image);
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: `Unable to addImage():${err}` });
  }
});

//Update the image with the Post it will be attached to
router.put('/images/:user_id', async (req, res) => {
  const { image_id, post_id, reply_id, discussion_id, team_id } = req.body;
  try {
    if (post_id) {
      const addPost = await postsDB.updateImageWithPost(image_id, post_id);

      res.status(200).json(addPost);
    } else if (reply_id) {
      const addReply = await postsDB.updateImageWithReply(image_id, reply_id);

      res.status(200).json(addReply);
    } else if (discussion_id) {
      const addDiscussion = await postsDB.updateImageWithDiscussion(image_id, discussion_id);

      res.status(200).json(addDiscussion);
    } else {
      const addTeam = await teamsDB.updateImageWithTeam(image_id, team_id);

      res.status(200).json(addTeam);
    }
  } catch (err) {
    res.status(500).json({ error: `Unable to updateImageWithPost():${err}` });
  }
});

router.delete('/images/:user_id/:image_id', async (req, res) => {
  const { image_id } = req.params;

  try {
    const deleteImage = await postsDB.deleteImage(image_id);

    res.status(200).json({ message: 'image deleted' });
  } catch (err) {
    res.status(500).json({ error: `Unable to deleteImage():${err}` });
  }
});

module.exports = router;
