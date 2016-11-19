var Paths = function(){

	/**
	 * Source files' directory
	 * @type {string}
	 * @private
	 */
	this._src = "./src";

	/**
	 * Destination files' directory
	 * @type {string}
	 * @private
	 */
	this._dest = "./dest";

	/**
	 * Files' paths
	 * @type {Object}
	 */
	this.paths = {
		// all HTML pages
		"html": {
			"pages": {
				"src": "/*.html",
				"dest": "/"
			},
			"yuidocs": {
				"src": "/yui-docs/**",
				"dest": "/yui-docs/"
			}
		},

		// all LESS files to convert into CSS
		"less": {
			"src": "/less/style.less",
			"dest": "/css/",
			"destFile": "style.css"
		},

		// all scripts
		"js": {
			"src": "/js/**/*.*",
			"dest": "/js/"
		},

		// all images
		"images": {
			"src": "/images/**/*.*",
			"dest": "/images/"
		},

		// all fonts
		"fonts": {
			"src": "/fonts/**/*.*",
			"dest": "/fonts/"
		},

		// vendor files
		"vendor": {
			"src": "/vendor/**/*.*",
			"dest": "/vendor/"
		},

		// zip files
		"files": {
			"src": "/files/**/*.*",
			"dest": "/files/"
		}
	};

	/**
	 * Get source files' path by property's path
	 * @param propPath
	 */
	this.src = function(propPath){
		if(propPath === undefined){
			return this._src;
		}
		else{
			var fullLocalPath = propPath + ".src";
			var filePath = this.get(fullLocalPath);
			return (filePath === undefined) ?
				undefined : this._src + filePath;
		}
	};

	/**
	 * Get destination files' path by property's path
	 * @param propPath
	 */
	this.dest = function(propPath){
		if(propPath === undefined){
			return this._dest;
		}
		else{
			var fullLocalPath = propPath + ".dest";
			var filePath = this.get(fullLocalPath);
			return (filePath === undefined) ?
				undefined : this._dest + filePath;
		}
	};

	/**
	 * Set new "_src" value
	 * @param newSrc {String} New value
	 */
	this.setSrc = function(newSrc){
		this._src = newSrc;
	};

	/**
	 * Set new "_dest" value
	 * @param newDest {String} New value
	 */
	this.setDest = function(newDest){
		this._dest = newDest;
	};

	/**
	 * Find a property in an object by path
	 * @param path {String} e.g. "foo.bar.baz"
	 * @private
	 */
	this.get = function(path){
		var paths = path.split('.'),
			current = this.paths,
			i;

		for (i = 0; i < paths.length; i++) {
			if (current[paths[i]] == undefined) {
				return undefined;
			} else {
				current = current[paths[i]];
			}
		}
		return current;
	};

};

var paths = new Paths();

module.exports = paths;