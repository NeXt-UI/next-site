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
		"aaikepae@cisco.com"
	],
	text: ""

};

var result = {};

if (argv.hasOwnProperty("u") && argv.hasOwnProperty("p") && argv.hasOwnProperty("s")) {

	smtpConfig.username = argv.u;
	smtpConfig.password = argv.p;
	smtpConfig.server = argv.s;

	// create server
	var restServer = restify.createServer({
		name: 'contact-server',
		version: '1.0.0'
	});

	// avoid CORS restrictions
	restServer.use(restify.CORS({
		origins: ['*'],   // defaults to ['*']
		credentials: true,                 // defaults to false
		headers: ['*']
	}));

	// allow to process JSON
	restServer.use(restify.jsonp());
	restServer.use(restify.bodyParser());

	// receive POST request
	restServer.post("/", function (req, res, next) {
		var params = req.params;

		// validate
		if (typeof params.name == "string" &&
			typeof params.contacts == "string" &&
			typeof params.message == "string") {

			if (params.name.length > 0 && params.name.length <= 100 &&
				params.contacts.length > 0 && params.contacts.length <= 200 &&
				params.message.length > 0 && params.message.length <= 2000) {

				// make up a message
				messageConfig.message =
					"Message from " + params.name + "\n\n" +
					"Contact them by: " + params.contacts + "\n\n" +
					params.message;

				// send email
				sendMail(smtpConfig, messageConfig);

				result = {
					"status": "ok",
					"text": "Message has been sent."
				}

			}
			else{
				result = {
					"status": "fail",
					"text": "All fields must be completed. Please do not exceed 100/200/2000-character limit."
				}
			}
		}
		else{
			result = {
				"status": "fail",
				"text": "Invalid format"
			}
		}

		res.send(result);
		return next();
	});

	// listen for connection
	restServer.listen(listenPort, function () {
		console.log('%s listening at %s', restServer.name, restServer.url);
	});

}
else {
	console.error('To start, use: node contact-daemon.js -u "example@gmail.com" -p "PaSsWoRd" -s "smtp.gmail.com"');
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
		text: messageConfig.message // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			return false;
		}
		console.log('Message sent: ' + info.response);
		return true;
	});

}