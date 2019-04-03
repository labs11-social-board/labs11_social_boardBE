const db = require('../dbConfig.js');

// GET ALL USERS THAT ARE MODERATORS
const getModerators = (id) => {
    return db('users')
       .where({'id': id})
        .select('id', 'username', 'email', 'status', 'us.user_permissions')
        .join('user_settings as us', 'us.user_id', 'users.id')
        .orderBy('us.user_permissions', 'desc')
};

const changeToModerator = (changeUser_id) => {
    let v = db('user_settings')
    .where({'user_id': changeUser_id})
    .select('user_permissions')
if(v.user_permissions != 'moderator'){
    return db('user_settings')
    .where({'user_id': changeUser_id})
    .update({'user_permissions': 'moderator'})

}
    

    
};
const changeToBasic = (changeUser_id) => {
    let v = db('user_settings')
    .where({'user_id': changeUser_id})
    .select('user_permissions')
    if(v.user_permissions = 'moderator'){
        return db('user_settings')
        .where({'user_id': changeUser_id})
        .update({'user_permissions': 'basic'})
    }
    
    

    
};

 //const userModerator = (changeUser_id) => {
  //  return db('users').where({'id': changeUser_id})
  //  .select('id', 'username', 'email', 'status', 'us.user_permissions')
 //   .join('user_settings as us', 'us.user_id', 'users.id')
 //   .orderBy('us.user_permissions', 'desc')
 //};


module.exports = {
    getModerators,
    changeToModerator,
    changeToBasic
}