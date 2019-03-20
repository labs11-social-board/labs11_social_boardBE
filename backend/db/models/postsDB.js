const db = require('../dbConfig.js');

const search = (searchText, order, orderType) => {
  return db('posts as p')
    .select(
      'p.id',
      'p.discussion_id',
      'p.created_at',
      'p.body',
      'p.user_id',
      'u.username',
      'c.id as category_id',
      'c.name as category_name',
      'd.body as discussion_body',
      db.raw('SUM(COALESCE(pv.type, 0)) AS votes'),
    )
    .leftOuterJoin('post_votes as pv', 'pv.post_id', 'p.id')
    .leftOuterJoin('users as u', 'u.id', 'p.user_id')
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .whereRaw('LOWER(p.body) LIKE ?', `%${ searchText.toLowerCase() }%`)
    .groupBy('p.id', 'u.username', 'c.name', 'c.id', 'd.body')
    // order by given order and orderType, else default to ordering by created_at descending
    .orderBy(`${ order ? order : 'p.created_at' }`, `${ orderType ? orderType : 'desc' }`);
};

// get the user_id and discussion_id related to the post with the given id
const getDiscAndUserInfoFromPostID = id => {
  return db('posts as p')
    .select('p.user_id', 'p.discussion_id', 'u.uuid')
    .leftOuterJoin('users as u', 'u.id', '=', 'p.user_id')
    .where('p.id', id)
    .first();
};

// create a post by a given user_id to a given discussion_id
const insert = newPost => {
  return db('posts').insert(newPost).returning('id');
};

// edit post with given post id
const update = (id, post) => {
  return db('posts').where({ id }).update(post);
};

// remove post with given post id
const remove = id => {
  return db('posts').where({ id }).del();
};

module.exports = {
  search,
  getDiscAndUserInfoFromPostID,
  insert,
  update,
  remove,
};
