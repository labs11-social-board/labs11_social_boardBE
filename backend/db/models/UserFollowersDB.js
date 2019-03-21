//returns all the 'users" THE user is following
const getUserFollowers = user_id => {
  return db("user_followers").where({ user_id });
};

//Removes a follow connection between a user.
const removeFollow = (user_id, following_id) => {
  return db("user_followers")
    .where({ user_id, following_id })
    .del();
};



//Adds a follow connection between a user
const followUser = async (user_id, following_id) => {
    await db("user_followers").insert([{user_id, following_id}]);
  
  
  //delete if it already exists, simulated by a user click follow for a user they already follow.
  removeFollow(user_id, following_id);
};



module.exports = {
  getUserFollowers,
  removeFollow,
  followUser
};
