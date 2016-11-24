'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SolicitudesCtrl', ['$scope','$q','$scService', function ($scope, $q, $scService) {

    $scope.$watch("currentPage", function( newValue, oldValue ) {
      if(!angular.equals(newValue, oldValue)) {
          $scope.paginado = "page=" + ($scope.currentPage - 1).toString() + "&size=3";
          $scService.getSearchSolicitudes($scope.paginado,$scope.searcher).then(function (response) {
            $scope.solicitudes = response.data;
          })
      }
    });

  }]);
