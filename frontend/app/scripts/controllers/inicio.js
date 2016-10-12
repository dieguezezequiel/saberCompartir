'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('InicioCtrl', ['$scope','$scService', '$q', function ($scope, $scService, $q) {

    var promises = [
      $scService.getStreamingActuales(),
      $scService.getStreamingProgramados(),
      $scService.getRankingUsuarios(),
      $scService.getRankingSolicitudes()
    ];

    $q.all(promises).then(function(response) {
      $scope.streamingActuales = response[0];
      $scope.streamingProgramados = response[1];
      $scope.rankingUsuarios = response[2];
      $scope.rankingSolicitudes = response[3];

    });

  }]);
