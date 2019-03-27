const db = require('../dbConfig.js');

//returns all the 'users" THE user is following
const getUserFollowers = user_id => {
  /*The user being followed id, username and avatar link is returned so that this information can be used on the front end */
  return db("user_followers")
    .innerJoin("users", "user_followers.following_id", "users.id")
    .where({"user_followers.user_id": user_id})
    .innerJoin("user_settings", "users.id", "user_settings.user_id")
    .select(["user_followers.following_id", "users.username", "user_settings.avatar"])
};

//Removes a follow connection between a user.
const removeConnection = (user_id, following_id) => {
  db("user_followers")
    .where({ user_id, following_id })
    .del();
}
const removeFollow = async (user_id, following_id) => {
  await removeConnection(user_id, following_id);
  return getUserFollowers(user_id); 
};



//Adds a follow connection between a user
const followUser = async (user_id, following_id) => {
    await removeFollow(user_id, following_id);
    await db("user_followers").insert([{user_id, following_id}]);
    return getUserFollowers(user_id);
};



module.exports = {
  getUserFollowers,
  removeFollow,
  followUser
};
