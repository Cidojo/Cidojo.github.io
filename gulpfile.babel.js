import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import yargs from 'yargs';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import browserSync from 'browser-sync';

const server = browserSync.create();
const PRODUCTION = yargs.argv.prod;
const mode = PRODUCTION ? 'production' : 'development';
const BUILD_PATH = 'docs';

const paths = {
  styles: {
      src: 'src/scss/style.scss',
      dest: `${BUILD_PATH}/css`
  },
  images: {
      src: 'src/img/**/*.{jpg,jpeg,png,svg,gif}',
      dest: `${BUILD_PATH}/img`
  },
  js: {
      src: 'src/js/main.js',
      dest: `${BUILD_PATH}/js`
  },
  other: {
    src: ['src/**/*', '!src/{img,js,scss}','!src/{img,js,scss}/**/*'],
    dest: `${BUILD_PATH}`
  }
};

export const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(PRODUCTION, autoprefixer()))
        .pipe(gulpif(PRODUCTION, cleanCss({
            compatibility: 'ie8'
        })))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

export const images = () => {
    return gulp.src(paths.images.src)
        .pipe(gulpif(PRODUCTION, imagemin()))
        .pipe(gulp.dest(paths.images.dest))
};

export const babelJS = () => {
  return gulp.src(paths.js.src)
    .pipe(webpackStream(webpackConfig(mode), webpack))
  .pipe(gulp.dest(paths.js.dest));
};

export const copy = () => {
  return gulp.src(paths.other.src)
      .pipe(gulp.dest(paths.other.dest));
};

export const clean = (done) => {
  del([BUILD_PATH]);
  done();
};

export const serve = (done) => {
  server.init({
    server: './docs'
  });
  done();
};

export const reload = (done) => {
  server.reload();

  done();
};

export const watch = () => {
  gulp.watch('src/scss/**/*', styles);
  gulp.watch('src/js/**/*', gulp.series(babelJS, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
  gulp.watch(paths.other.src, gulp.series(copy, reload));
};

gulp.task('start', gulp.series(clean, styles, babelJS, images, copy, gulp.parallel(serve, watch)));
gulp.task('build', gulp.series(clean, styles, babelJS, images, copy));
