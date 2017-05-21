var gulp = require('gulp'),
	$ = require("gulp-load-plugins")();

// Create config to abstract commonly used values below
const config = {
	styles: {
		src: ["./src/styles/site.less"],
		dest: "./public/styles",
		autoprefixer: ['IE 11', 'last 2 versions'],
		srcDirectory: ["./src/styles/**/*.{less, css}"]
	},

	scripts: {
		src: ["./src/scripts/**/*.js"],
		dest: "./public/scripts",
		bundle: "app.js",
	}
};

gulp.task("dev:styles", devStyles);
gulp.task("dev:scripts", devScripts);
gulp.task("dev", gulp.parallel("dev:styles", "dev:scripts"));

// Note: We run a dev build before we start the watch
gulp.task("dev:watch", gulp.series("dev", devWatch));


gulp.task("prod:styles", prodStyles);
gulp.task("prod:scripts", prodScripts);
gulp.task("prod", 
	gulp.parallel(
		"prod:scripts",
		"prod:styles"
	)
);

gulp.task("default", gulp.series("dev"));


function devWatch() {
	$.livereload.listen();
	// gulp.watch(a file path, a task)
	gulp.watch(config.styles.srcDirectory, gulp.series(devStyles));
	gulp.watch(config.scripts.src, gulp.series(devScripts));
}

function devStyles() {
	return gulp
		// advantage of only compiling site.less is that you end 
		// up with one main css file, but still have the power of less
		//  to @import other .less files into site.less
		// .src('./src/styles/**/*.{less, css}')
		.src(config.styles.src)
		.pipe($.sourcemaps.init())
		.pipe($.less())
		.pipe($.autoprefixer({browsers:config.styles.autoprefixer}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(config.styles.dest))
		.pipe($.livereload());
}

function devScripts() {
	return gulp
		.src(config.scripts.src)
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write('.')) //sourcemaps.write() = internal map
		.pipe(gulp.dest(config.scripts.dest))
		.pipe($.livereload());
}

function prodStyles () {
	return gulp
		.src(config.styles.src)
		.pipe($.less())
		.pipe($.autoprefixer({browsers:config.styles.autoprefixer}))
		.pipe($.cleanCss())
		.pipe(gulp.dest(config.styles.dest));
}

function prodScripts () {
	return gulp
		.src(config.scripts.src)
		.pipe($.babel())
		.pipe($.concat(config.scripts.bundle))
		.pipe($.uglify())
		.pipe(gulp.dest(config.scripts.dest));
}

