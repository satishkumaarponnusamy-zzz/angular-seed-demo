"use strict";

require("./register/controllers");

module.exports = angular
  .module("<%= angularAppName %>", [
    "<%= angularAppName %>.controllers"
  ]);