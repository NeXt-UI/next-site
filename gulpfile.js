var paths = require("./gulpfile-paths"),
	gulp = require("gulp"),
	compileLess = require("gulp-less"),
	minifyCss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	runSequence = require("run-sequence"),
	del = require("del");


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
			"!" + paths.dest("vendor") + "**"
		],
		{
			force: true
		},
		cb
	);

});

// build HTML
gulp.task("build:html", function(){
	return gulp.src(paths.src("html.pages"))
		.pipe(gulp.dest(paths.dest("html.pages")));
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

// full clean & build
gulp.task("build-full", function(){
	return runSequence(
		"clean-full",
		["build:less", "build:js", "build:images", "build:fonts", "build:vendor"],
		"build:html"
	);
});

// build CSS, JS and HTML only
gulp.task("build-fast", function(){
	return runSequence(
		"clean-fast",
		["build:less", "build:js", "build:images", "build:fonts"],
		"build:html"
	);
});

gulp.task("default", function(){
	// todo: watchers + webserver
});
