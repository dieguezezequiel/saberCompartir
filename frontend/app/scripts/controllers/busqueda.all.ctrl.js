'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('BusquedaAllCtrl', ['$scope', '$q', '$scService','$rootScope','notificationService', function ($scope, $q, $scService,$rootScope,notificationService) {

    $scope.paginado = "page=0&size=3";
    $scope.usuarioLoggeado = $rootScope.globals.currentUser;

    if(!$scope.searcher) {
      var promises = [
        $scService.getclasesValidas($scope.paginado),
        $scService.getSolicitudesValidas($scope.paginado)
      ];

      $q.all(promises).then(function(response) {
          $scope.clases = response[0].data;
          $scope.solicitudes = response[1].data;
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
        if(response.data.type == "success"){
          //solicitud.totalUsers = solicitud.totalUsers + 1;
        }
        clase.sumarse = false;
      }, function (error) {
        notificationService.error("Hubo un error, no puede unirse a " + clase.name + " por el momento");
      });
    };

    $scope.IfICanJoinSolicitud = function(solicitud){
      if($scope.usuarioLoggeado){
        var idUsersInSolicitud = _.pluck(solicitud.joinedUsers, 'id');
        solicitud.sumarse = !(_.contains(idUsersInSolicitud, $scope.usuarioLoggeado.id));
      }
    };

    $scope.sumarse = function(solicitud){
      $scService.sumarseASolicitud(solicitud.id,$scope.usuarioLoggeado.id).then(function (response) {
        $scope.messagesBuilder(response.data);
        if(response.data.type == "success"){
          solicitud.totalUsers = solicitud.totalUsers + 1;
        }
        solicitud.sumarse = false;
      }, function (error) {
        notificationService.error("Hubo un error, no puede unirse a " + solicitud.subject + " por el momento");
      });
    };

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
