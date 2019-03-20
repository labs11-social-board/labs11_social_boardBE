const db = require('../dbConfig.js');

const search = (searchText, order, orderType) => {
  return db('replies as r')
    .select(
      'r.id',
      'r.post_id',
      'r.created_at',
      'r.body',
      'r.user_id',
      'u.username',
      'c.id as category_id',
      'c.name as category_name',
      db.raw('SUM(COALESCE(rv.type, 0)) AS votes'),
    )
    .leftOuterJoin('reply_votes as rv', 'rv.reply_id', 'r.id')
    .leftOuterJoin('users as u', 'u.id', 'r.user_id')
    .join('posts as p', 'p.id', 'r.post_id')
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .whereRaw('LOWER(r.body) LIKE ?', `%${ searchText.toLowerCase() }%`)
    .groupBy('r.id', 'u.username', 'c.name', 'c.id')

    // order by given order and orderType, else default to ordering by created_at descending
    .orderBy(`${ order ? order : 'r.created_at' }`, `${ orderType ? orderType : 'desc' }`);
};

// create a reply by a given user_id to a given post_id
const insert = newReply => {
    return db('replies').insert(newReply).returning('id');
};

// edit reply with given reply id
const update = (id, reply) => {
    return db('replies').where({ id }).update(reply);
};

// remove reply with given reply id
const remove = id => {
    return db('replies').where({ id }).del();
};

module.exports = {
    search,
    insert,
    update,
    remove,
};
