/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { errorHandler } = require("./config/middleware/errorHandler.js");

/***************************************************************************************************
 ******************************************** middleware ********************************************
 **************************************************************************************************/
const server = express();
var bodyParser = require('body-parser');
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(helmet()); // hides your tech stack from sniffers
server.use(express.json()); // built-in
server.use(morgan("dev")); // logging middleware for console
server.use(cors()); // allows domains/ports to connect to your server

/***************************************************************************************************
 ********************************************** routes **********************************************
 **************************************************************************************************/
// Home Page
server.get("/", (req, res) => {
  res.send(`WEB APP IS RUNNING...`);
});

// Routes/Endpoints
const {
  authRouter,
  categoriesRouter,
  discussionsRouter,
  discussionVotesRouter,
  postsRouter,
  postVoteRouter,
  repliesRouter,
  testRouter,
  usersRouter,
  discussionFollowsRouter,
  categoryFollowsRouter,
  userNotificationsRouter,
  replyVoteRouter,
  userFollowersRouter,
  teamsRouter,
  userModerator,
  emailRouter,
  analyticsRouter,
} = require('./routes/index.js');

//Auth Route
server.use('/auth', authRouter);
//Categories Routes
server.use('/categories', categoriesRouter);
server.use('/category-follows', categoryFollowsRouter);
//Discussion Routes
server.use('/discussions', discussionsRouter);
server.use('/discussion-follows', discussionFollowsRouter);
server.use('/discussion-votes', discussionVotesRouter);
//Posts Routes
server.use('/posts', postsRouter);
server.use('/post-votes', postVoteRouter);
//Reply Routes
server.use('/reply-votes', replyVoteRouter);
server.use('/replies', repliesRouter);
//Tests Routes
server.use('/tests', testRouter);
//Users Routes
server.use('/users', usersRouter);
server.use('/user-notifications', userNotificationsRouter);
//Users Follows 
server.use('/followers', userFollowersRouter);
//Team Board Route
server.use('/team', teamsRouter);
//Moderator Routes
server.use('/moderators', userModerator);
//Email Routes
server.use('/emails', emailRouter);
// Analytic Stuff
server.use('/analytics', analyticsRouter);

server.use(errorHandler); // This line needs to be after all routes

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = server;
