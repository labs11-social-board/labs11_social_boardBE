const db = require('../dbConfig.js');

// GET ALL USERS THAT ARE MODERATORS
const getModerators = (id) => {
    return db('users')
       .where({'id': id})
        .select('id', 'username', 'email', 'status', 'us.user_permissions')
        .join('user_settings as us', 'us.user_id', 'users.id')
        .orderBy('us.user_permissions', 'desc')
};
// change user to moderator 
const changeToModerator = (changeUser_id) => {

  return db('user_settings')
 .where({'user_id': changeUser_id})
 .select('user_permissions')
 .then(data=>{
  console.log(data[0].user_permissions);
  if(data[0].user_permissions != 'moderator'){
    
       return db('user_settings')
        .where({'user_id': changeUser_id})
        .update({'user_permissions': 'moderator'})

 }
 else{
    console.log('user is already moderator');
    return getModerators(changeUser_id);
}

}).catch(err=>{
  return err;
    
});
        
    



};


const changeToBasic = (changeUser_id) => {
 
    return db('user_settings')
    .where({'user_id': changeUser_id})
    .select('user_permissions')
    .then(data=>{
     console.log(data[0].user_permissions);
     if(data[0].user_permissions != 'basic'){
       
          return db('user_settings')
           .where({'user_id': changeUser_id})
           .update({'user_permissions': 'basic'})
   
    }
    else{
       console.log('user is not moderator already');
       return getModerators(changeUser_id);
   }
   
   }).catch(err=>{
     return err;
       
   });

    
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