const db = require('../dbConfig.js')

//Get/Read -/+ reply votes table
const get = ( reply_id, user_id ) => {
    return db('reply_votes')
        .select('type')
        .where({ reply_id })
        .andWhere({ user_id });
};

//Adds vote for a reply by a user
const add = ( reply_id, user_id, type ) => {
    return db('reply_votes').insert({ reply_id, user_id, type });
};

//Updates vote count +/- for a user
const update = (reply_id, user_id, type) => {
    return db('reply_votes')
        .update({ type })
        .where({ reply_id })
        .andWhere({ user_id })
}

//Removes a vote for a reply by a user
const remove = (reply_id, user_id) => {
    return db('reply_votes')
        .del()
        .where({ reply_id })
        .andWhere({ user_id })
}

module.exports = {
    get,
    add,
    update,
    remove
};
