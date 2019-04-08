const db = require('../dbConfig.js');

// GET ALL USERS THAT ARE MODERATORS
const getModerators = () => {
  return db('users')
    .select('id', 'username', 'email', 'status', 'us.user_permissions')
    .join('user_settings as us', 'us.user_id', 'users.id')
    .orderBy('username')
};

// GET INDIVIDUAL USER BY ID
const getUser = (id) => {
  return db('users')
    .where({ id: id })
    .select('id', 'username', 'email', 'status', 'us.user_permissions')
    .join('user_settings as us', 'us.user_id', 'users.id')
    .orderBy('us.user_permissions', 'desc')
};

// change user to moderator 
const changeToModerator = (changeUser_id) => {

  return db('user_settings')
    .where({ 'user_id': changeUser_id })
    .select('user_permissions')
    .then(data => {
      console.log(data[0].user_permissions);
      if (data[0].user_permissions != 'moderator') {

        return db('user_settings')
          .where({ 'user_id': changeUser_id })
          .update({ 'user_permissions': 'moderator' })

      }
      else {
        console.log('user is already moderator');
        return getModerators(changeUser_id);
      }

    }).catch(err => {
      return err;

    });
};


const changeToBasic = (changeUser_id) => {

  return db('user_settings')
    .where({ 'user_id': changeUser_id })
    .select('user_permissions')
    .then(data => {
      console.log(data.user_permissions);
      if (data.user_permissions != 'basic') {

        return db('user_settings')
          .where({ 'user_id': changeUser_id })
          .update({ 'user_permissions': 'basic' })

      }
      else {
        console.log('user is not moderator already');
        return getModerators(changeUser_id);
      }

    }).catch(err => {
      return err;

    });


};

const removePost = (id) => {
  return db('post')
    .where({ id })
    .del()
}

const hidePost = (post, user_id) => {
  db('hidden_post')
    .where({ user_id })
    .leftJoin('posts')
    .join('users as u', 'u.id', 'u.user_id')
    .insert(post, user_id)

  return removePost(id)
}


module.exports = {
  getModerators,
  changeToModerator,
  changeToBasic,
  getUser,
  removePost,
  hidePost
}