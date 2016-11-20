var argv = require("minimist")(process.argv.slice(2));
var nodemailer = require('nodemailer');
var restify = require('restify');

var listenPort = 9001;

var smtpConfig = {
	"username": "",
	"password": "",
	"server": ""
};

var messageConfig = {
	"fromString": "NeXt UI Feedback",
	"subject": "Feedback from website",
	"recipients": [
		"alzverev@cisco.com",
		//"aaikepae@cisco.com"
	],
	text: "test"

};

if (argv.hasOwnProperty("u") && argv.hasOwnProperty("p") && argv.hasOwnProperty("s")) {

	smtpConfig.username = argv.u;
	smtpConfig.password = argv.p;
	smtpConfig.server = argv.s;

	// create server
	var restServer = restify.createServer({
		name: 'contact-server',
		version: '1.0.0'
	});

	// receive POST request
	restServer.post("/contact/", function (req, res, next) {
		//sendMail(smtpConfig, messageConfig);
		console.log(req, res);
		return next();
	});

	// listen for connection
	restServer.listen(listenPort, function () {
		console.log('%s listening at %s', restServer.name, restServer.url);
	});


}
else {
	console.error("How-to-start instruction");
}


function sendMail(smtpConfig, messageConfig) {
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://'
		+ encodeURIComponent(smtpConfig.username) + ':'
		+ smtpConfig.password + '@'
		+ smtpConfig.server);

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '"' + messageConfig.fromString + '" <' + smtpConfig.username + '>', // sender address
		to: messageConfig.recipients.join(","), // list of receivers
		subject: messageConfig.subject, // Subject line
		text: messageConfig.text // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});

}