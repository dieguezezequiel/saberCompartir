'use strict';

describe('Controller: DictadoCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var dictadoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    dictadoCtrl = $controller('dictadoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(dictadoCtrl.awesomeThings.length).toBe(3);
  });
});
