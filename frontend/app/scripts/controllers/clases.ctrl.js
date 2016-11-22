'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ClasesCtrl', ['$scope', '$q', '$scService', function ($scope, $q, $scService) {

    $scope.paginado = "page=0&size=3";

      var promises = [
        $scService.getclases($scope.paginado)
      ];

      $q.all(promises).then(function(response) {
        $scope.clases = response[0].data.content;
      });

  }]);
