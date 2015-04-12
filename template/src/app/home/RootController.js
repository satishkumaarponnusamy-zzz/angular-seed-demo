  "use strict";

  function <%= controllerName %> ($scope) {
    $scope.name = "<%= webAppTitle %>";
  }

  module.exports = ["$scope", <%= controllerName %> ];