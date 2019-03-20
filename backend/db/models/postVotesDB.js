const db = require('../dbConfig.js')

//Get/Read -/+ post votes table
const get = ( post_id, user_id ) => {
    return db('post_votes')
        .select('type')
        .where({ post_id })
        .andWhere({ user_id });
};

//Adds vote for a post by a user
const add = ( post_id, user_id, type ) => {
    return db('post_votes').insert({ post_id, user_id, type });
};

//Updates vote count +/- for a user
const update = (post_id, user_id, type) => {
    return db('post_votes')
        .update({ type })
        .where({ post_id })
        .andWhere({ user_id })
}

//Removes a vote for a post by a user
const remove = (post_id, user_id) => {
    return db('post_votes')
        .del()
        .where({ post_id })
        .andWhere({ user_id })
}

module.exports = {
    get,
    add,
    update,
    remove
}