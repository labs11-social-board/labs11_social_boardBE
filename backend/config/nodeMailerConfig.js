require('dotenv').config();

const nodemailer = require('nodemailer');

// globals
const {
	nodeMailerHost,
	nodeMailerPort,
	nodeMailerUser,
	nodeMailerPass,
	frontEndUrl,
} = require('./globals.js');

const transporter = nodemailer.createTransport({
	host: nodeMailerHost,
	port: nodeMailerPort,
	requireTLS: true,
	auth: {
		user: nodeMailerUser,
		pass: nodeMailerPass,
	},
});

const getMailOptions = (route, email, token, clientIP) => {
	const mailOptions = {
		from: '"Symposium Board" <symposiumdiscussionboard@gmail.com>',
		to: email,
	};
	if (route === 'register' || route === 'update-email') {
		mailOptions.subject = 'Symposium Board e-mail confirmation.';
		mailOptions.html = `<table width="100%" border="0" cellpadding="10" cellspacing="0" align="center"><tr><td><table border="0" cellpadding="10" cellspacing="0" align="center"><tr><td style="text-align: center;"><img src="https://i.imgur.com/BstVkVa.png"></img></td></tr><tr><td style="color: #84794B; font-weight: bold; text-align: center; font-size: 18px;">Symposium Board</td></tr><tr><td style="text-align: center;"><a href = '${ frontEndUrl }/confirm-email/${ token }'>Click here to confirm your e-mail address.</td></a></tr><tr><td style="text-align: center;">Or copy and paste the following link into your browser:</td></tr><tr><td style="text-align: center;">${ frontEndUrl }/confirm-email/${ token }</td></tr><tr><td style="text-align: center;">You received this e-mail because you signed up for Symposium Board</td></tr></table></td></tr><tr><td style="text-align: center; font-size: 11px; color: #999;">This request was sent from IP address ${ clientIP }</td></tr></table></td></tr></table>`;
	}
	if (route === 'reset-pw') {
		mailOptions.subject = 'Symposium Board password reset.';
		mailOptions.html = `<table width="100%" border="0" cellpadding="10" cellspacing="0" align="center"><tr><td><table border="0" cellpadding="10" cellspacing="0" align="center"><tr><td style="text-align: center;"><img src="https://i.imgur.com/BstVkVa.png"></img></td></tr><tr><td style="color: #84794B; font-weight: bold; text-align: center; font-size: 18px;">Symposium Board</td></tr><tr><td style="text-align: center;"><a href = '${ frontEndUrl }/reset/${ token }'>Click here to reset your password.</td></a></tr><tr><td style="text-align: center;">Or copy and paste the following link into your browser:</td></tr><tr><td style="text-align: center;">${ frontEndUrl }/reset-pw/${ token }</td></tr><tr><td style="text-align: center;">You received this e-mail because you requested a password reset.</td></tr><tr><td style="text-align: center;">This token will only last 30 minutes, after which you will have to request another password reset.</td></tr><tr><td style="text-align: center; font-size: 11px; color: #999;">This request was sent from IP address ${ clientIP }</td></tr></table></td></tr></table>`;
	}
	return mailOptions;
};

module.exports = {
	transporter,
	getMailOptions,
};
