var paths = require("./gulpfile-paths"),
	gulp = require("gulp"),
	compileLess = require("gulp-less"),
	minifyCss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	runSequence = require("run-sequence"),
	del = require("del");

gulp.task("clean-full", function () {
	return del([
		paths.dest

	], {
		force: true
	});
});

gulp.task("clean", function () {
	return del([
		paths.dest,
		"!" + paths.vendor.src

	], {
		force: true
	});
});

// build HTML
gulp.task("build:html", function(){
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest));
});

// build LESS files into CSS
gulp.task("build:less", function(){
	return gulp.src(paths.html.src)
		.pipe(compileLess())
		.pipe(minifyCss())
		.pipe(rename(paths.less.dest))
		.pipe(gulp.dest(paths.html.dest));
});


gulp.task("build:js", function(){
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest));
});

gulp.task("build:images", function(){
	// todo: compress/optimize images
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest));
});

gulp.task("build:fonts", function(){
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
});

// full clean & build
gulp.task("build-full", function(){
	return runSequence(
		"clean-full",
		["build:less", "build:js", "build:images", "build:fonts"],
		"build:html"
	);
});

// build
gulp.task("build", function(){
	return runSequence(
		"clean",
		["build:less", "build:js", "build:images", "build:fonts"],
		"build:html"
	);
});

gulp.task("default", function(){
	console.log(paths);
});
