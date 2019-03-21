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
const updateTeamBoard = (id, changes) => {
  return db('teams')
    .where({ id })
    .update(changes)
    .then(updated => (updated > 0 ? getTeamById(id) : null ));
};

//Delete the Team board from the database
const deleteTeamBoard = id => {
  return db('teams')
    .where({ id })
    .del();
};

//Gets the discussions that are associated with the Team Board based on the Teams id
const getTeamDiscussions =  async (team_id, order, orderType) => {
  if (order === 'undefined') order = undefined;
  const discussions = await db('discussions').where({ team_id }).orderBy(`${order ? order : 'created_at'}`, `${orderType ? orderType : 'desc'}`);
  
  for(let i = 0; i < discussions.length; i++){
    let post_count = await db('posts').count({post_count: 'posts.id'}).where('discussion_id', discussions[i].id);
    discussions[i].post_count = post_count[0].post_count;
  }

  return discussions;
};

//Get the posts for the discussion o
const getTeamDiscussionPosts = async discussion_id => {
  const discussion = await db('discussions').where({ discussion_id }).first();
  const posts = await db('posts').where({ discussion_id });

  discussion.posts = posts;

  return discussion;
};

module.exports = {
  getTeams,
  getTeamByName,
  addTeamBoard,
  updateTeamBoard,
  deleteTeamBoard,
  getTeamDiscussions,
  getTeamDiscussionPosts
};