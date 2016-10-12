var paths = {

	// source directory
	"src": "./src",

	// destination
	"dest": "./dest",

	// all HTML pages
	"html": {
		"pages": {
			"src": "/*.html",
			"dest": "/"
		}
	},

	// all LESS files to convert into CSS
	"less": {
		"src": "/less/style.less",
		"dest": "/css/style.css"
	},

	// all scripts
	"js": {

	},

	// all images
	"images": {
		"src": "/images/*.*",
		"dest": "/images/"
	},

	// all fonts
	"fonts": {
		"src": "/fonts/*.*",
		"dest": "/fonts/"
	},

	// vendor files
	"vendor": {
		"src": "/vendor/**/*.*",
		"dest": "/vendor/"
	}
};
module.exports = paths;