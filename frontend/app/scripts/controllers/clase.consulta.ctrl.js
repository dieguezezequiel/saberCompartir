/**
 * Created by redbee on 23/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ClaseConsultaCtrl
 * @description
 * # ClaseConsultaCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ClaseConsultaCtrl', ['$scope', '$q', '$scService', function ($scope, $q, $scService) {

    $scope.paginado = "page=0&size=3";

    var promises = [
      $scService.getclases($scope.paginado)
    ];

    $q.all(promises).then(function(response) {
      $scope.clases = response[0].data.content;
    });

  }]);
