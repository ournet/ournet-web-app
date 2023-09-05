"use strict";

require("dotenv").config({ path: "../.env" });

process.env.PORT = 8080;

const path = require("path");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rev = require("gulp-rev-all");
const connect = require("gulp-connect");

const buffer = require("gulp-buffer");
const log = require("gulplog");
const browserify = require("browserify");
const uglify = require("gulp-uglify");
const tap = require("gulp-tap");

const rename = require("gulp-rename");
const gzip = require("gulp-gzip");

const awspublish = require("gulp-awspublish");
var s3Publisher = awspublish.create({
  // region: "your-region-id",
  params: {
    Bucket: process.env.ASSETS_AWS_BUCKET || "assets.ournetcdn.net",
    ACL: "public-read"
  }
});

const isProduction = process.env.NODE_ENV === "production";

// --------- IMAGES ------------

const imgDest = "../public/static/img/";

gulp.task("imagewebp", () =>
  gulp.src("./img/**").pipe(webp()).pipe(gulp.dest(imgDest))
);

gulp.task("imagemin", () =>
  gulp
    .src("./img/**")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 7 })
      ])
    )
    .pipe(gulp.dest(imgDest))
);

gulp.task("img", gulp.series(["imagewebp", "imagemin"]));

gulp.task("upload:img", () =>
  gulp
    .src(imgDest + "**")
    .pipe(
      rename(function (p) {
        p.dirname = path.join("ournet", "img", p.dirname);
      })
    )
    .pipe(s3Publisher.publish({ CacheControl: "public,max-age=" + 86400 * 14 }))
    // .pipe(publisher.cache())
    .pipe(awspublish.reporter())
);

// --------- CSS -------------

const cssDist = "../public/static/css/";

gulp.task("sass", function () {
  return (
    gulp
      .src(
        [
          "./scss/weather/main.scss",
          "./scss/weather/page-widget.scss",
          "./scss/horoscope/main.scss",
          "./scss/news/main.scss",
          "./scss/news/gallery.scss",
          "./scss/news/video-embed.scss",
          "./scss/portal/critical.scss",
          "./scss/portal/async.scss",
          "./scss/portal/main.scss"
        ],
        { base: "./scss" }
      )
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(cssDist))
      // .pipe(sourcemaps.init())
      .pipe(gulpif(isProduction, cleanCSS()))
      .pipe(gulpif(isProduction, rev.revision()))
      .pipe(gulpif(isProduction, gulp.dest(cssDist)))
      .pipe(gulpif(isProduction, rev.manifestFile()))
      // .pipe(sourcemaps.write())
      // .pipe(rename({ basename: config.css.main }))
      .pipe(gulpif(isProduction, gulp.dest(cssDist)))
  );
});

gulp.task("sass:watch", function () {
  gulp.watch("./scss/**/*.scss", gulp.series(["sass"]));
});

gulp.task("upload:css", () =>
  gulp
    .src(cssDist + "**")
    .pipe(
      rename(function (p) {
        p.dirname = path.join("ournet", "css", p.dirname);
      })
    )
    .pipe(gzip({ append: false }))
    .pipe(
      s3Publisher.publish({
        CacheControl: "public,max-age=" + 86400 * 14 + ",immutable",
        ContentEncoding: "gzip"
      })
    )
    // .pipe(publisher.cache())
    .pipe(awspublish.reporter())
);

// --------- JS -------------

const jsDist = "../public/static/js/";

gulp.task("js", function () {
  return (
    gulp
      .src(
        [
          "./js/weather/main.js",
          "./js/weather/page-widget.js",
          "./js/news/main.js",
          "./js/news/gallery.js",
          "./js/portal/main.js",
          "./js/horoscope/main.js"
        ],
        { read: false, base: "./js" }
      ) // no need of reading file because browserify does.
      // transform file objects using gulp-tap plugin
      .pipe(
        tap(function (file) {
          log.info("bundling " + file.path);

          // replace file contents with browserify's bundle stream
          file.contents = browserify(file.path, { debug: true }).bundle();
        })
      )
      .pipe(gulp.dest(jsDist))
      .pipe(gulpif(isProduction, buffer()))
      .pipe(gulpif(isProduction, uglify()))
      .pipe(gulpif(isProduction, rev.revision()))
      .pipe(gulpif(isProduction, gulp.dest(jsDist)))
      .pipe(gulpif(isProduction, rev.manifestFile()))
      .pipe(gulpif(isProduction, gulp.dest(jsDist)))
  );
});

gulp.task("js:watch", function () {
  gulp.watch("./js/**/*.js", gulp.series(["js"]));
});

gulp.task("upload:js", () =>
  gulp
    .src(jsDist + "**")
    .pipe(
      rename(function (p) {
        p.dirname = path.join("ournet", "js", p.dirname);
      })
    )
    .pipe(
      gzip({
        append: false
      })
    )
    .pipe(
      s3Publisher.publish({
        CacheControl: "public,max-age=" + 86400 * 14 + ",immutable",
        ContentEncoding: "gzip"
      })
    )
    // .pipe(publisher.cache())
    .pipe(awspublish.reporter())
);

gulp.task("connect", function () {
  connect.server({
    root: "../public/static",
    port: parseInt(process.env.PORT)
  });
});

gulp.task("watch", gulp.parallel(["sass:watch", "js:watch"]));
gulp.task("serv", gulp.parallel(["watch", "connect"]));
gulp.task("default", gulp.series(["img", "sass", "js"]));
gulp.task("upload", gulp.series(["upload:img", "upload:css", "upload:js"]));
