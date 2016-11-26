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

    $scope.paginado = "page=0&size=6";

    var promises = [
      $scService.getSolicitudes($scope.paginado)
    ];

    $q.all(promises).then(function(response) {
      if(!$scope.searcher){
        $scope.solicitudes = response[0].data;
      }
    });

    $scope.$watch("currentPage", function( newValue, oldValue ) {
      if(!angular.equals(newValue, oldValue)) {
          $scope.paginado = "page=" + ($scope.currentPage - 1).toString() + "&size=6";
          $scService.getSearchSolicitudes($scope.paginado,$scope.searcher).then(function (response) {
            $scope.solicitudes = response.data;
          })
      }
    });

  }]);
