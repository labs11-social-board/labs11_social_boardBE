const db = require('../dbConfig.js');

// GET ALL RESOURCES AND USERS WHO CREATED THEM
async function getResources () {
    const query = await db('resources as r')
    .select('r.title', 'r.resource', 'u.username')
    .join('users a u', 'u.id', 'r.user_id')

    return query;
}

const insertResource = (user_id, resource, info, title) => {
    return db('resources')
    .insert({'title': title, 'resource': resource, 'info': info, 'user_id': user_id})
}

module.exports = {
    getResources,
    insertResource
}