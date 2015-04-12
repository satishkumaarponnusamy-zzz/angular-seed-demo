/*jshint node:true*/
"use strict";

var gulp = require("gulp");
var bowerFiles = require("main-bower-files");
var connect = require("gulp-connect");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var gulpif = require("gulp-if");
var streamify = require("gulp-streamify");
var uglifyjs = require("gulp-uglify");
var preprocess = require("gulp-preprocess");
var rename = require("gulp-rename");
var runInSequence = require("run-sequence");

var CONNECT_PORT = 8000;
var BUILD_PATH = "./build";

var env = process.env.NODE_ENV || "debug";

gulp.task("bower", function () {
  return gulp.src(bowerFiles(), {
      base: "./bower_components"
    })
    .pipe(gulp.dest("./vendor"));
});

gulp.task("connect", function () {
  connect.server({
    root: BUILD_PATH,
    port: CONNECT_PORT
  });
});

gulp.task("copyIndexHtml", function () {
  return gulp.src("src/index.template.html")
    .pipe(preprocess({
      context: {
        NODE_ENV: env
      }
    }))
    .pipe(rename(function (path) {
      path.basename = "index";
    }))
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task("browserify-app", function () {
  return browserify("./src/app/app.js", {
      debug: env === "debug"
    })
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulpif(env !== "debug", streamify(uglifyjs())))
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task("browserify-vendor", function () {
  return browserify("./src/app/vendor.js", {
      debug: env === "debug"
    })
    .bundle()
    .pipe(source("vendor.js"))
    .pipe(gulpif(env !== "debug", streamify(uglifyjs())))
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task("build-js", ["browserify-app", "browserify-vendor"]);

gulp.task("watch-js", function () {
  gulp.watch(["src/app/**/*.js", "!src/app/**/*.spec.js", "src/app.js"], ["browserify-app"]);
});

gulp.task("default", function () {
  runInSequence("bower", "copyIndexHtml", "build-js", "watch-js", "connect");
});