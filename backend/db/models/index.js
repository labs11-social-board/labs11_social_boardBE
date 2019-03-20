const categoriesDB = require('./categoriesDB.js')
const discussionsDB = require('./discussionsDB.js');
const discussionVotesDB = require('./discussionVotesDB.js');
const postsDB = require('./postsDB.js');
const usersDB = require('./usersDB.js');
const discussionFollowsDB = require('./discussionFollowsDB.js');
const categoryFollowsDB = require('./categoryFollowsDB.js');
const postVotesDB = require('./postVotesDB.js');
const replyVotesDB = require('./replyVotesDB.js');
const userNotificationsDB = require('./userNotificationsDB.js');
const repliesDB = require('./repliesDB.js');

module.exports = {
	categoriesDB,
	discussionsDB,
	discussionVotesDB,
	postsDB,
	postVotesDB,
	replyVotesDB,
	repliesDB,
	usersDB,
	discussionFollowsDB,
	categoryFollowsDB,
	userNotificationsDB,
};
