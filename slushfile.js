/*jshint node:true*/
"use strict";

var gulp = require("gulp"),
  inquirer = require("inquirer"),
  _ = require("underscore.string"),
  path = require("path"),
  template = require("gulp-template"),
  rename = require("gulp-rename"),
  conflict = require("gulp-conflict");

gulp.task("main", function (done) {
  inquirer.prompt([{
    name: "angularAppName",
    message: "What is the angular module name?",
    "default": function (answers) {
      return _.camelize(path.basename(process.cwd())) + "App";
    }
  }, {
    name: "webAppTitle",
    message: "What is the name of the app?",
    "default": function (answers) {
      return _.titleize(answers.angularAppName);
    }
  }, {
    name: 'controllerName',
    message: 'What is the initial controller name?',
    'default': function (answers) {
      return _.classify(answers.angularAppName) + "Controller";
    }
  }, {
    name: 'description',
    message: "What is the app's description?"
  }, {
    name: 'version',
    message: 'What is the version?',
    'default': '0.0.0'
  }, {
    name: 'port',
    message: 'What port will the localhost server run on?',
    'default': '8000',
    validate: function (text) {
      return /^\d+$/.test(text) && +text < 65536;
    }
  }], function (answers) {
    answers.currentFullYear = new Date().getFullYear();
    gulp.src(path.join(__dirname, "template", "**"))
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        } else if (_.startsWith(file.basename, "RootController")) {
          file.basename = answers.controllerName + file.basename.substring("RootController".length);
        }
      }))
      .pipe(conflict("./"))
      .pipe(gulp.dest("./"))
      .on("end", function () {
        console.log("Done");
      });
    done();
  });
});

gulp.task("default", ["main"]);