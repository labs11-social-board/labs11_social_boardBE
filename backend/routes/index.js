const authRouter = require('./authRouter.js');
const categoriesRouter = require('./categoriesRouter.js');
const discussionsRouter = require('./discussionsRouter.js');
const discussionVotesRouter = require('./discussionVotesRouter.js');
const postsRouter = require('./postsRouter.js');
const postVoteRouter = require('./postVoteRouter.js');
const replyVoteRouter = require('./replyVoteRouter.js');
const repliesRouter = require('./repliesRouter.js');
const usersRouter = require('./usersRouter.js');
const testRouter = require('./testRoutesWithMiddleware/testRouter.js');
const discussionFollowsRouter = require('./discussionFollowsRouter.js');
const categoryFollowsRouter = require('./categoryFollowsRouter.js');
const userNotificationsRouter = require('./userNotificationsRouter.js');

module.exports = {
  authRouter,
  categoriesRouter,
  discussionsRouter,
  discussionVotesRouter,
  postsRouter,
  postVoteRouter,
  replyVoteRouter,
  repliesRouter,
  testRouter,
  usersRouter,
  discussionFollowsRouter,
  categoryFollowsRouter,
  userNotificationsRouter,
};
