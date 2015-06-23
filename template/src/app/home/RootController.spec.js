"use strict";

describe("Controller: <%= controllerName %>", function () {
  var controller,
    scope;

  beforeEach(function () {
    module("<%= angularAppName %>.controllers");

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      controller = $controller("<%= controllerName %>", {
        $scope: scope
      });
    });
  });

  describe("initial state", function () {
    it("has scope", function () {
      expect(scope).not.toBe(undefined);
    });
  });
});