const db = require('../dbConfig.js');

// get top (limit 10) daily discussions
const getTopDailyDiscussions = (user_id, order, orderType) => {
  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  // prettier-ignore
  return db('discussions as d')
    .select(
      'd.id',
      'd.user_id',
      'u.username',
      'd.category_id',
      'c.name as category_name',
      'd.body',
      'd.created_at',
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      db.raw('SUM(COALESCE(dv.type, 0)) AS vote_count'),
      'uv.type as user_vote'
    )
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    // this whereRaw gets the created_at dates that are 24 hours away from the current time
    .whereRaw("d.created_at >= ?", [Date.parse(new Date()) - (24 * 60 * 60 * 1000)])
    .groupBy('d.id', 'u.username', 'c.name', 'pc.post_count', 'uv.type')
    // order by given order and orderType
    // else default to ordering by vote_count descending
    .orderBy(`${order ? order : 'vote_count'}`, `${orderType ? orderType : 'desc'}`)
    .limit(5);
};

//gets All Discussions
const getDiscussions = () => {
  return db('discussions');
};

// get all the discussions in all the categories a user is following
const getAllDiscussionsByFollowedCategories = user_id => {
  const categoryFollowsQuery = db('category_follows')
    .select('category_id')
    .where({ user_id });

  const postCountQuery = db('posts')
    .select('discussion_id')
    .count({ post_count: 'id' })
    .groupBy('discussion_id');

  const userVoteQuery = db('discussion_votes')
    .select('type', 'discussion_id')
    .where({ user_id });
  
  const discussionVotesQuery = db('discussion_votes')
    .select(
      db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
      db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
      'discussion_id',
    )
    .groupBy('discussion_id');

  const userSettingsQuery = db('user_settings')
    .select('user_id', 'avatar');

  const userQuery = db('users as u')
    .select('u.id', 'u.username', 'us.avatar')
    .leftOuterJoin(userSettingsQuery.as('us'), function() {
      this.on('us.user_id', '=', 'u.id');
    });

  const categoryQuery = db('categories')
    .select('name', 'id', 'icon');

  return db('discussions as d')
    .select(
      'd.id',
      'd.category_id',
      'd.body',
      'd.created_at',
      'pc.post_count',
      'uv.type as user_vote',
      'dv.upvotes',
      'dv.downvotes',
      'u.username',
      'u.avatar',
      'u.id as user_id',
      'c.name as category_name',
      'c.icon as category_icon',
      'd.views',
    )
    .join(categoryFollowsQuery.as('cf'), function() {
      this.on('cf.category_id', '=', 'd.category_id');
    })
    .leftOuterJoin(postCountQuery.as('pc'), function() {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userVoteQuery.as('uv'), function() {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(discussionVotesQuery.as('dv'), function() {
      this.on('dv.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userQuery.as('u'), function() {
      this.on('u.id', '=', 'd.user_id');
    })
    .join(categoryQuery.as('c'), function() {
      this.on('c.id', '=', 'd.category_id');
    })
    .orderBy('d.created_at', 'desc');
};

//Find By ID (discussions own ID)
const findById = (id, user_id, order, orderType) => {
  if (order === 'undefined') order = undefined;
  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userDiscussionVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  const discussionVotesQuery = db('discussion_votes')
    .select(
      db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
      db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
      'discussion_id',
    )
    .groupBy('discussion_id');

  const discussionQuery = db('discussions as d')
    .select(
      'd.id',
      'd.user_id',
      'u.username',
      'd.category_id',
      'c.name as category_name',
      'c.id as category_id',
      'c.icon as category_icon',
      'us.avatar',
      'us.signature',
      'd.body',
      'd.created_at',
      'd.last_edited_at',
      'dv.upvotes',
      'dv.downvotes',
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      'uv.type as user_vote'
    )
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin('user_settings as us', 'us.user_id', 'u.id')
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userDiscussionVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(discussionVotesQuery.as('dv'), function() {
      this.on('dv.discussion_id', '=', 'd.id');
    })
    .where('d.id', id)
    .groupBy('d.id', 'u.username', 'c.name', 'c.id', 'uv.type', 'us.avatar', 'us.signature','pc.post_count', 'dv.upvotes', 'dv.downvotes');

  const userPostVoteQuery = db('post_votes as pv')
    .select('pv.type', 'pv.post_id')
    .where({ user_id });

  const postVotesQuery = db('post_votes')
    .select(
      db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
      db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
      'post_id',
    )
    .groupBy('post_id');

  const postsQuery = db('posts as p')
    .select(
      'p.id',
      'p.user_id',
      'u.username',
      'us.avatar',
      'us.signature',
      'p.discussion_id',
      'p.body',
      'p.created_at',
      'p.last_edited_at',
      'uv.type as user_vote',
      'pv.upvotes',
      'pv.downvotes',
    )
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .leftOuterJoin('users as u', 'u.id', 'p.user_id')
    .leftOuterJoin('user_settings as us', 'us.user_id', 'u.id')
    .leftOuterJoin(userPostVoteQuery.as('uv'), function () {
      this.on('uv.post_id', '=', 'p.id');
    })
    .leftOuterJoin(postVotesQuery.as('pv'), function() {
      this.on('pv.post_id', '=', 'p.id');
    })
    .where('p.discussion_id', id)
    .groupBy('p.id', 'u.username', 'uv.type', 'us.avatar', 'us.signature', 'pv.upvotes', 'pv.downvotes')
    // order by order and orderType variables
    // else default to ordering by created_at descending
    .orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);

  const promises = [discussionQuery, postsQuery];

  return Promise.all(promises).then(results => {
    const [discussionResults, postsResults] = results;
    if (!discussionResults.length) throw `No discussion found with ID ${id}`;
    const postIDs = postsResults.map(post => post.id);
    const userReplyVoteQuery = db('reply_votes as rv')
      .select('rv.type', 'rv.reply_id')
      .where({ user_id });
    const replyVotesQuery = db('reply_votes')
    .select(
      db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
      db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
      'reply_id',
    )
    .groupBy('reply_id');
    const repliesQuery = db('replies as r')
      .select(
        'r.user_id', 
        'r.post_id', 
        'r.body', 
        'r.created_at',
        'u.username',
        'r.id',
        'us.avatar',
        'd.id as discussion_id',
        'uv.type as user_vote',
        'rv.upvotes',
        'rv.downvotes',
      )
      .join('users as u', 'u.id', 'r.user_id')
      .leftOuterJoin('user_settings as us', 'us.user_id', 'u.id')
      .leftOuterJoin('posts as p', 'p.id', 'r.post_id')
      .leftOuterJoin('discussions as d', 'd.id', 'p.discussion_id')
      .leftOuterJoin(userReplyVoteQuery.as('uv'), function () {
        this.on('uv.reply_id', '=', 'r.id');
      })
      .leftOuterJoin(replyVotesQuery.as('rv'), function() {
        this.on('rv.reply_id', '=', 'r.id');
      })
      .whereIn('r.post_id', postIDs)
      .groupBy('r.id','u.username', 'us.avatar', 'u.id', 'd.id', 'rv.upvotes', 'rv.downvotes', 'uv.type')
      .orderBy('r.created_at');


    return Promise.all([repliesQuery])
      .then(result => {
        const [repliesResults] = result;
        let newPostsResults = [];
        for (let l = 0; l < postsResults.length; l++) {
          newPostsResults[l] = { ...postsResults[l] };
          newPostsResults[l].replies = [];
        }
        for (let j = 0; j < repliesResults.length; j++) {
          for (let k = 0; k < newPostsResults.length; k++) {
            if (repliesResults[j].post_id === newPostsResults[k].id) {
              newPostsResults[k].replies.push(repliesResults[j]);
              continue;
            }
          }
        }
        discussionResults[0].posts = newPostsResults;
        return discussionResults;
      });
  });
};

const search = (searchText, order, orderType) => {
  return db('discussions as d')
    .select(
      'd.id',
      'd.body',
      'd.user_id',
      'u.username',
      'd.created_at',
      'd.category_id',
      'c.name as category_name',
      db.raw('SUM(COALESCE(dv.type, 0)) AS votes'),
    )
    .leftOuterJoin('discussion_votes as dv', 'dv.discussion_id', 'd.id')
    .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .orWhereRaw('LOWER(d.body) LIKE ?', `%${searchText.toLowerCase()}%`)
    .groupBy('d.id', 'u.username', 'c.name')
    // order by given order and orderType, else default to ordering by created_at descending
    .orderBy(`${order ? order : 'd.created_at'}`, `${orderType ? orderType : 'desc'}`);
};

//Find by User ID (Original Creator)
const findByUserId = user_id => {
  return db('discussions').where({ user_id });
};

//Find by Associated Category (category ID)
const findByCategoryId = (category_id, user_id, order, orderType) => {
  const postCountQuery = db('posts as p')
    .select('p.discussion_id')
    .count({ post_count: 'p.id' })
    .join('discussions as d', 'd.id', 'p.discussion_id')
    .groupBy('p.discussion_id');

  const userVoteQuery = db('discussion_votes as dv')
    .select('dv.type', 'dv.discussion_id')
    .where({ user_id });

  const discussionVotesQuery = db('discussion_votes')
    .select(
      db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
      db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
      'discussion_id',
    )
    .groupBy('discussion_id');

  const userSettingsQuery = db('user_settings')
    .select('user_id', 'avatar');

  const userQuery = db('users as u')
    .select('u.id', 'u.username', 'us.avatar')
    .leftOuterJoin(userSettingsQuery.as('us'), function() {
      this.on('us.user_id', '=', 'u.id');
    });

  const discussionQuery = db('discussions as d')
    .select(
      'd.id',
      'd.user_id',
      'u.username',
      'u.avatar',
      'd.category_id',
      'c.name as category_name',
      'c.icon as category_icon',
      'd.body',
      'd.created_at',
      'dv.upvotes',
      'dv.downvotes',
      'd.views',
      db.raw('COALESCE(pc.post_count, 0) AS post_count'),
      'uv.type as user_vote'
    )
    // .leftOuterJoin('users as u', 'u.id', 'd.user_id')
    .join('categories as c', 'c.id', 'd.category_id')
    .leftOuterJoin(discussionVotesQuery.as('dv'), function() {
      this.on('dv.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userQuery.as('u'), function() {
      this.on('u.id', '=', 'd.user_id');
    })
    .leftOuterJoin(postCountQuery.as('pc'), function () {
      this.on('pc.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(userVoteQuery.as('uv'), function () {
      this.on('uv.discussion_id', '=', 'd.id');
    })
    .where('c.id', category_id)
    .groupBy('d.id', 'u.username', 'c.name', 'pc.post_count', 'uv.type', 'dv.upvotes', 'dv.downvotes', 'u.avatar', 'c.icon')
    // order by given order and orderType variables
    // else default to ordering by created_at descending
    .orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);

  const categoryQuery = db('categories as c')
    .select(
      'c.name',
      'u.username',
      'c.created_at',
    )
    .leftOuterJoin('users as u', 'u.id', 'c.user_id')
    .where('c.id', category_id)
    .first();

  const promises = [discussionQuery, categoryQuery];
  return Promise.all(promises)
    .then(results => {
      const [discussionResults, categoryResults] = results;
      return {
        category: categoryResults,
        discussions: discussionResults,
      };
    });
};

const addViewToDiscussion = id => {
  return db('discussions')
    .increment('views', 1)
    .where({ id });
};

//AUTHORIZED ACCESS

//Add Discussion into the Discussion table
const insert = discussion => {
  return db('discussions').insert(discussion).returning('id');
};

//EDIT [ACCOUNT TYPE ACCESS: USER_ID]
const update = (id, discussion) => {
  return db('discussions').where({ id }).update(discussion);
};

const remove = id => {
  return db('discussions').where({ id }).del();
};

module.exports = {
  getTopDailyDiscussions,
  getDiscussions,
  getAllDiscussionsByFollowedCategories,
  addViewToDiscussion,
  search,
  findById,
  findByUserId,
  findByCategoryId,
  insert,
  update,
  remove
};
