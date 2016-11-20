'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SolicitudesCtrl', ['$scope','HomeResource', '$q', function ($scope, HomeResource, $q) {

    var promises = [
      HomeResource.getSolicitudesAllSolicitadas()
    ];

    $q.all(promises).then(function(response) {
      $scope.solicitudes = response[0];
    });

  }]);
