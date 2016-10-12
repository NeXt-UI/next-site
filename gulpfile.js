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
		paths.dest()

	], {
		force: true
	});
});

gulp.task("clean", function () {
	return del([
		paths.dest(),
		"!" + paths.dest("vendor")

	], {
		force: true
	});
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


gulp.task("build:js", function(){
	return gulp.src(paths.src("js"))
		.pipe(gulp.dest(paths.dest("js")));
});

gulp.task("build:images", function(){
	// todo: compress/optimize images
	return gulp.src(paths.src("images"))
		.pipe(gulp.dest(paths.dest("images")));
});

gulp.task("build:fonts", function(){
	return gulp.src(paths.src("fonts"))
		.pipe(gulp.dest(paths.dest("fonts")));
});

// // full clean & build
// gulp.task("build-full", function(){
// 	//not implemented
// });

// build
gulp.task("build", function(){
	return runSequence(
		"clean",
		["build:less", "build:js", "build:images", "build:fonts"],
		"build:html"
	);
});

gulp.task("default", function(){
	// todo: watchers + webserver
});
