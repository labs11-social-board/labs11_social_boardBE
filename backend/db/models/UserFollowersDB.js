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

const removeFollow = async (user_id, following_id) => {
  await db("user_followers")
  .where({ user_id, following_id })
  .del();
  return getUserFollowers(user_id); 
};



//Adds a follow connection between a user
const followUser = async (user_id, following_id) => {
    await removeFollow(user_id, following_id);
    await db("user_followers").insert([{user_id, following_id}]);
    return getUserFollowers(user_id);
};

//Need to grab the uuid's for. 
const getUsersFollowingUser = (following_id) => {
/*The following_id should be the user_id that created the discussion. so for example
User A is following User B.  User A  has  id in Users of 1  User B has id in Users as 2. 
in the table their connection is    user_id: 1  following_id: 2  So when User B makes a discussion 
(post on the site) we want to alert every user_id in the 'user_followers' table where User B is the following_id. 
This function will grab the uuid's for each user so that this will return an array of uuid's so that they can be looped through on the 
discussionsRouter and trigger notifications for each user. 
*/
return db("user_followers")
  .innerJoin("users", "user_followers.user_id", "users.id")
  .where({"user_followers.following_id": following_id})
  .select(["users.uuid"])
};



module.exports = {
  getUserFollowers,
  removeFollow,
  followUser,
  getUsersFollowingUser
};
