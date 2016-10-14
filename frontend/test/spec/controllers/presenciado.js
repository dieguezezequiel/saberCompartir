'use strict';

describe('Controller: PresenciadoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var PresenciadoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PresenciadoCtrl = $controller('PresenciadoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PresenciadoCtrl.awesomeThings.length).toBe(3);
  });
});
