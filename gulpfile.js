const gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	cssMin = require('gulp-minify-css'),
	rimRaf = require('rimraf'),
	rename = require('gulp-rename'),
	terser = require('gulp-terser'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

const path = {
	build: {
		html: 'build',
		js: 'build/js',
		css: 'build/css'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/',
		style: 'src/style/main.scss'
	},
	watch: {
		html: 'src/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss'
	},
	clean: 'build'
};

gulp.task('webserver', function() {
	browserSync({
		server: {
			baseDir: 'build'
		}
	});
});

gulp.task('html:build', function() {
	return gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}))
})

gulp.task('js:build', function() {
	return gulp.src([path.src.js + 'main.js', path.src.js + 'modernizr-custom.js'])
		.pipe(terser())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('style:build', function() {
	return gulp.src(path.src.style)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(cssMin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('clean', function(cb) {
	rimRaf(path.clean, cb);
});

gulp.task('watch', function() {
	gulp.watch(path.watch.html, gulp.parallel('html:build'));
	gulp.watch(path.watch.js, gulp.parallel('js:build'));
	gulp.watch(path.watch.style, gulp.parallel('style:build'));	
});

gulp.task('build', gulp.parallel('html:build', 'js:build', 'style:build'));

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));