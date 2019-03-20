const requestIp = require('request-ip');

const requestClientIP = function(req, res, next) {
	const clientIP = requestIp.getClientIp(req); 
	req.body.clientIP = clientIP;
	next();
};

module.exports = requestClientIP;
