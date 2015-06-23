"use strict";

module.exports = angular.module("<%= angularAppName %>.controllers", [])
  .controller("<%= controllerName %>", require("../home/<%= controllerName %>"));