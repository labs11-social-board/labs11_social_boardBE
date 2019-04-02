const db = require('../dbConfig.js');

// GET ALL USERS THAT ARE MODERATORS
const getModerators = () => {
    return db('users')
        .where('us.user_permissions', 'moderator')
        .select('id', 'username', 'email', 'status', 'us.user_permissions')
        .join('user_settings as us', 'us.user_id', 'users.id')
};

module.exports = {
    getModerators
}