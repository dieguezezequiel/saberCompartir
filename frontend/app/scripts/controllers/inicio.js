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

  }]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});

