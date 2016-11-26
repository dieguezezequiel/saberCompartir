'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('BusquedaAllCtrl', ['$scope', '$q', '$scService', function ($scope, $q, $scService) {

    $scope.paginado = "page=0&size=3";
    var promises = [
      $scService.getclases($scope.paginado),
      $scService.getSolicitudes($scope.paginado)
    ];

    $q.all(promises).then(function(response) {
      if(!$scope.searcher) {
        $scope.clases = response[0].data;
        $scope.solicitudes = response[1].data;
      }
    });

    $scope.$watch("currentPageClase", function( newValue, oldValue ) {
      if(!angular.equals(newValue, oldValue)) {
        $scope.paginado = "page=" + ($scope.currentPageClase - 1).toString() + "&size=3";
        $scService.getSearchClases($scope.paginado,$scope.searcher).then(function (response) {
          $scope.clases = response.data;
        })
      }
    });

    $scope.$watch("currentPageSolicitud", function( newValue, oldValue ) {
      if(!angular.equals(newValue, oldValue)) {
        $scope.paginado = "page=" + ($scope.currentPageSolicitud - 1).toString() + "&size=3";
        $scService.getSearchSolicitudes($scope.paginado,$scope.searcher).then(function (response) {
          $scope.solicitudes = response.data;
        })
      }
    });

  }]);
