/* eslint-disable*/

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var jsminify = require("gulp-minify");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var rename = require("gulp-rename");

gulp.task("serve", function() {
  server.init({
    server: "./",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("style"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("compress"));
  gulp.watch("./*.html").on("change", server.reload);
});

gulp.task("style", function(done) {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("./css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./css"))
});

gulp.task("compress", function(done) {
  return gulp.src("source/js/**")
    .pipe(jsminify())
    .pipe(gulp.dest("./js"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**",
    "source/pdf/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest('./'));
});

gulp.task('imagemin', function () {
	return gulp.src(['source/img/**', '!source/img/icon-*.svg'])
		.pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 30}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
		.pipe(gulp.dest('./img'))
});

gulp.task("clean", function () {
    return del(["css", "fonts", "img", "js", "pdf", "./index.html"]);
  });

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("./img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("./"));
});

gulp.task("build", gulp.series("clean", "copy", "imagemin", "style", "compress", "sprite", "html"));
