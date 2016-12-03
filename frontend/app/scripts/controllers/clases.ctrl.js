'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ClasesCtrl', ['$scope', '$q', '$scService','$rootScope', function ($scope, $q, $scService,$rootScope) {

    $scope.paginado = "page=0&size=6";
    $scope.usuarioLoggeado = $rootScope.globals.currentUser;

    if(!$scope.searcher) {
      var promises = [
        $scService.getclasesValidas($scope.paginado)
      ];

      $q.all(promises).then(function(response) {
          $scope.clases = response[0].data;
      });
    }

    $scope.IfICanJoinClase = function(clase){
      if($scope.usuarioLoggeado){
        var idUsersInClase = _.pluck(clase.guestUsers, 'id');
        clase.sumarse = !(_.contains(idUsersInClase, $scope.usuarioLoggeado.id));
      }
    };

    $scope.IfICanJoinClaseProgramada = function(clase){
      if($scope.usuarioLoggeado){
        var idUsersInClase = _.pluck(clase.joinedUsers, 'id');
        clase.sumarse = !(_.contains(idUsersInClase, $scope.usuarioLoggeado.id));
      }
    };

    $scope.sumarseClase = function(clase){
      $scService.sumarseAClase(clase.id,$scope.usuarioLoggeado.id).then(function (response) {
        $scope.messagesBuilder(response.data);
        clase.sumarse = false;
      }, function (error) {
        notificationService.error("Hubo un error, no puede unirse a " + clase.name + " por el momento");
      });
    };

    $scope.$watch("currentPage", function( newValue, oldValue ) {
      if(!angular.equals(newValue, oldValue)) {
        $scope.paginado = "page=" + ($scope.currentPage - 1).toString() + "&size=6";
        $scService.getSearchClases($scope.paginado,$scope.searcher).then(function (response) {
          $scope.clases = response.data;
        })
      }
    });

  }]);
