/* eslint-disable*/

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
// var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var rename = require("gulp-rename");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("docs/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("docs/css"))
    // .pipe(server.stream());
});

// gulp.task("serve", function() {
//   server.init({
//     server: "docs/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//
//   gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
//   gulp.watch("source/*.html"), ["html"];
//   gulp.watch("source/*.html").on("change", server.reload);
// });

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
    "source/pdf/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest('docs'));
});

gulp.task("clean", function () {
    return del("docs");
  });

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("docs/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("docs"));
});

gulp.task("build", function(done) {
  run("clean", "copy", "style", "sprite", "html", done);
});
