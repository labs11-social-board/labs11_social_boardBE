const db = require('../dbConfig.js');

// GET ALL RESOURCES AND USERS WHO CREATED THEM
const getResources = () => {
    return db('resources as r')
    .select('r.title', 'r.resource', 'u.username')
    .join('users a u', 'u.id', 'r.user_id')
}

const insertResource = (user_id, resource, title) => {
    return db('resources')
    .insert({'title': title, 'resource': resource, 'user_id': user_id})
}

module.exports = {
    getResources,
    insertResource
}