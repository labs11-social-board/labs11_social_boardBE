const Pusher = require('pusher');

// globals
const { pusherAppId, pusherKey, pusherSecret, pusherCluster } = require('./globals.js');

const pusher = new Pusher({
	appId: pusherAppId,
	key: pusherKey,
	secret: pusherSecret,
	cluster: pusherCluster,
	userTLS: true,
});

module.exports = pusher;
