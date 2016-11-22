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

    $scope.paginado = "page=0&size=3";

    var promises = [
      $scService.getSolicitudes($scope.paginado)
    ];

    $q.all(promises).then(function(response) {
      $scope.solicitudes = response[0].data.content;
      $scope.solicitudesData = response[0].data;
    });

    $scope.filteredTodos = []
      ,$scope.currentPage = 1
      ,$scope.numPerPage = 3
      ,$scope.maxSize = 3;

    $scope.makeTodos = function() {
      $scope.todos = [];
      for (var i=1;i<=1000;i++) {
        $scope.todos.push({ text:"todo "+i, done:false});
      }
    };
    $scope.makeTodos();

    $scope.$watch("currentPage + numPerPage", function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

      $scope.filteredTodos = $scope.todos.slice(begin, end);
    });

        $scope.paginado = "page=0&size=3";
        $scope.currentPage = 1;
        $scope.numberOfElements = 10;
        $scope.maxSize = 5;

        var promises = [
          $scService.getSolicitudes($scope.paginado)
        ];

        $q.all(promises).then(function(response) {
          $scope.solicitudes = response[0].data.content;
          $scope.solicitudesData = response[0].data;
          $scope.filteredSolicitudes = ($scope.currentPage - 1).toString();
          $scope.paginado = "page=" + $scope.filteredSolicitudes + "&size=3";
        });

        $scope.cambiar = function(){
          $scope.solicitudes = $scService.getSolicitudes($scope.currentPage).then(function(response){
            return response.data.content;
          })
        }


  }]);
