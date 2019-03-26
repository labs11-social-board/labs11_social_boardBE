const db = require('../dbConfig.js');

//returns all the Teams in the teams table in the database
const getTeams = () => {
  return db('teams');
};

//Finds the Team by it's name in the database
const getTeamByName = team_name => {
  return db('teams')
    .where({ team_name })
    .first();
};

//Finds the Team by their id in the database
const getTeamById = id => {
  return db('teams')
    .where({ id })
    .first();
};

//Adds a Team Board to the database and returns the team board that was added
const addTeamBoard = async (team) => {
  const [id] = await db('teams').insert(team, 'id');

  return getTeamById(id);
};

//Updates the Team Boards information and returns the updated Team from the database
const updateTeamBoard = async (id, changes) => {
  return db('teams')
      .where({ id })
      .update(changes)
      .then(updated => (updated > 0 ? getTeamById(id) : null ));
  // const { team_owner_id } = await getTeamById(id);
  
  // if(Number(user_id) !== team_owner_id){
  //   return null;
  // } else {
  //   return db('teams')
  //     .where({ id })
  //     .update(changes)
  //     .then(updated => (updated > 0 ? getTeamById(id) : null ));
  // }
};

//Delete the Team board from the database
const deleteTeamBoard = id => {
  return db('teams')
    .where({ id })
    .del();
}; 

//Gets all of the discussions that are associated with the Team Board based on the Teams id
const findByTeamId =  async (team_id, user_id, order, orderType) => {
  if (order === 'undefined') order = undefined;

  const team = await db('teams').where({ id: team_id }).first();

  const discussionVotes = db('discussion_votes as dv').select(
    db.raw('COUNT(CASE WHEN dv.type = 1 THEN 1 END) AS upvotes'),
    db.raw('COUNT(CASE WHEN dv.type = -1 THEN 1 END) AS downvotes'),
    'discussion_id'
  ).groupBy('discussion_id');

  const discussionUser_vote = db('discussion_votes as dv').where({ user_id });
  
  const discussions = await db('discussions as d')
    .select(
      'd.id',
      'd.user_id',
      'u.username',
      'us.avatar',
      'd.team_id',
      't.team_name',
      'd.body',
      'd.created_at',
      'd.last_edited_at',
      'dv.upvotes',
      'dv.downvotes',
      'd.views',
      'uv.type as user_vote'
    )
    .join('users as u', 'u.id', 'd.user_id')
    .join('user_settings as us', 'us.user_id', 'u.id')
    .join('teams as t', 't.id', 'd.team_id')
    .leftOuterJoin(discussionVotes.as('dv'), function(){
      this.on('dv.discussion_id', '=', 'd.id');
    })
    .leftOuterJoin(discussionUser_vote.as('uv'), function() {
      this.on('uv.discussion_id', '=', 'd.id')
    })
    .where({ team_id })
    .orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);
  
  for(let i = 0; i < discussions.length; i++){
    let post_count = await db('posts').count({post_count: 'posts.id'}).where('discussion_id', discussions[i].id);
    discussions[i].post_count = post_count[0].post_count;
  }

  const res = { team, discussions };
  return res;
};

//Get the posts and post replies for the discussion within the Team
const getTeamDiscussionPostsById = async (id, user_id, order, orderType) => {
  if (order === 'undefined') order = undefined;
  //grabs the upvotes and down votes for the discussion
  const discussionVotes = db('discussion_votes as dv').select(
    db.raw('COUNT(CASE WHEN dv.type = 1 THEN 1 END) AS upvotes'),
    db.raw('COUNT(CASE WHEN dv.type = -1 THEN 1 END) AS downvotes'),
    'discussion_id'
  ).groupBy('discussion_id');

  const discussionUser_vote = db('discussion_votes as dv').where({ user_id });

  const discussion = await db('discussions as d')
    .select(
      'd.id', 
      'd.user_id', 
      'u.username', 
      'd.team_id', 
      't.team_name', 
      'us.avatar', 
      'us.signature', 
      'd.body', 
      'd.created_at', 
      'd.last_edited_at', 
      'd.views',
      'dv.upvotes',
      'dv.downvotes',
      'uv.type as user_vote'
      )
    .join('users as u', 'u.id', 'd.user_id')
    .join('user_settings as us', 'us.user_id', 'u.id')
    .join('teams as t', 't.id', 'd.team_id')
    .leftOuterJoin(discussionVotes.as('dv'), function() {
      this.on('dv.discussion_id', '=', 'd.id')
    })
    .leftOuterJoin(discussionUser_vote.as('uv'), function() {
      this.on('uv.discussion_id', '=', 'd.id')
    })
    .where('d.id', id)
    .groupBy('d.id', 'u.username', 't.team_name', 'us.avatar','us.signature', 'd.body', 'dv.upvotes', 'dv.downvotes', 'uv.type')
    .first();
  
  const postVotes = db('post_votes').select(
    db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
    db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
    'post_id',
  ).groupBy('post_id');

  const userPostVote = db('post_votes').where({ user_id });

  const posts = await db('posts as p').select(
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
    .join('users as u', 'u.id', 'p.user_id')
    .join('user_settings as us', 'us.user_id', 'u.id')
    .leftOuterJoin(postVotes.as('pv'), function(){
      this.on('pv.post_id', '=', 'p.id')
    })
    .leftOuterJoin(userPostVote.as('uv'), function() {
      this.on('uv.post_id', '=', 'p.id')
    })
    .where({ discussion_id: id })
    .orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);
  console.log(posts)
  discussion.post_count = posts.length;
  
  const replies = [];
  const newPosts = posts.map(post => { return {...post, replies: [] }}); //creates a new array from the posts sql query and adds a replies key to every post
  const replyVotes = db('reply_votes').select(
    db.raw('COUNT(CASE WHEN type = 1 THEN 1 END) AS upvotes'),
    db.raw('COUNT(CASE WHEN type = -1 THEN 1 END) AS downvotes'),
    'reply_id',
  ).groupBy('reply_id');

  const userReplyVote = db('reply_votes').where({ user_id });

  //loops through the newPosts array and adds the replies for the post into the empty replies Key from the map
  for(let i = 0; i < newPosts.length; i++){
    replies.push(await db('replies as r').select(
      'r.id', 
      'r.user_id', 
      'r.post_id', 
      'r.body', 
      'r.created_at', 
      'r.last_edited_at',
      'u.username',
      'us.avatar',
      'us.signature',
      'p.discussion_id',
      'uv.type as user_vote',
      'rv.upvotes',
      'rv.downvotes'
      )
      .join('users as u', 'u.id', 'r.user_id')
      .join('user_settings as us', 'us.user_id', 'u.id')
      .leftOuterJoin('posts as p', 'p.id', 'r.post_id')
      .join('discussions as d', 'd.id', 'p.discussion_id')
      .leftOuterJoin(replyVotes.as('rv'), function() {
        this.on('rv.reply_id', '=', 'r.id')
      })
      .leftOuterJoin(userReplyVote.as('uv'), function() {
        this.on('uv.reply_id', '=', 'r.id')
      }).where({ post_id: posts[i].id }));
    newPosts[i].replies = replies[i];
  }

  discussion.posts = newPosts;
  
  return discussion;
};

module.exports = {
  getTeams,
  getTeamByName,
  addTeamBoard,
  updateTeamBoard,
  deleteTeamBoard,
  getTeamById,
  findByTeamId,
  getTeamDiscussionPostsById
};