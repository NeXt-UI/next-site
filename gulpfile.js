var paths = require("./gulpfile-paths"),
	gulp = require("gulp"),
	compileLess = require("gulp-less"),
	minifyCss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	runSequence = require("run-sequence"),
	del = require("del"),
	watch = require("gulp-watch"),
	fileInclude = require("gulp-file-include"),
	pyshell = require("python-shell"),
	fs = require("fs");


// delete content of "dest" directory (except the directory itself)
gulp.task("clean-full", function (cb) {

	return del(
		[
			paths.dest() + "/**",
			"!" + paths.dest()
		],
		{
			force: true
		},
		cb
	);

});

// delete content of "dest" directory except vendor files
gulp.task("clean-fast", function (cb) {

	return del(
		[
			paths.dest() + "/**",
			"!" + paths.dest(),
			"!" + paths.dest("vendor") + "**",
			"!" + paths.dest("files") + "**"
		],
		{
			force: true
		},
		cb
	);

});

gulp.task("build:examples.html", function(){
	pyshell.run("codepen-parser/html_generator.py", {
		"pythonPath": "/Library/Frameworks/Python.framework/Versions/3.5/bin/python3.5"
	}, function (err) {
		if (err) throw err;
		fs.createReadStream("codepen-parser/examples.html").pipe(fs.createWriteStream("src/examples.html"));
	});
});

// build HTML
gulp.task("build:html", function(){
	// copy main HTML files
	gulp.src(paths.src("html.pages"))
		.pipe(fileInclude({
			prefix: "@@",
			basepath: "@file",
			context: {
				navActiveItem: ""
			}
		}))
		.pipe(gulp.dest(paths.dest("html.pages")));

	// copy the rest
	return gulp.src(paths.src("html.yuidocs"))
		.pipe(gulp.dest(paths.dest("html.yuidocs")));

});

// build LESS files into CSS
gulp.task("build:less", function(){
	return gulp.src(paths.src("less"))
		.pipe(compileLess())
		.pipe(minifyCss())
		.pipe(rename(paths.get("less.destFile")))
		.pipe(gulp.dest(paths.dest("less")));
});

// build scripts
gulp.task("build:js", function(){
	return gulp.src(paths.src("js"))
		.pipe(gulp.dest(paths.dest("js")));
});

// bunble images
gulp.task("build:images", function(){
	// todo: compress/optimize images
	return gulp.src(paths.src("images"))
		.pipe(gulp.dest(paths.dest("images")));
});

// build fonts
gulp.task("build:fonts", function(){
	return gulp.src(paths.src("fonts"))
		.pipe(gulp.dest(paths.dest("fonts")));
});

// bundle vendor files
gulp.task("build:vendor", function(){
	return gulp.src(paths.src("vendor"))
		.pipe(gulp.dest(paths.dest("vendor")));
});

// bundle zip files of NeXt
gulp.task("build:files", function(){
	return gulp.src(paths.src("files"))
		.pipe(gulp.dest(paths.dest("files")));
});

// full clean & build
gulp.task("build-full", function(){
	return runSequence(
		"clean-full",
		["build:less", "build:js", "build:images", "build:fonts", "build:vendor", "build:examples.html", "build:files"],
		"build:html"
	);
});

// build CSS, JS and HTML only
gulp.task("build-fast", function(){
	return runSequence(
		"clean-fast",
		["build:less", "build:js", "build:images", "build:fonts", "build:examples.html"],
		"build:html"
	);
});

// simple watcher that listens to any changes
gulp.task("simple-watch", function(){

	// gulp.watch(paths.src(), ["build-fast"])
	return watch([
		paths.src(),
		"!" + paths.src() + "/examples.html"
	], { ignoreInitial: true }, function(){
		console.log("Change detected");
		runSequence("build-fast");
	});
});

gulp.task("default", function(){
	console.log("Initial build & start watcher");
	runSequence("build-full", "simple-watch");
});
