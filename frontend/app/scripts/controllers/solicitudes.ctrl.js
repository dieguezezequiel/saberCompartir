'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SolicitudesCtrl', ['$scope','$q','$scService','notificationService','$rootScope', function ($scope, $q, $scService,notificationService,$rootScope) {

    $scope.paginado = "page=0&size=6";
    $scope.usuarioLoggeado = $rootScope.globals.currentUser;

    if(!$scope.searcher){
      var promises = [
        $scService.getSolicitudesValidas($scope.paginado)
      ];

      $q.all(promises).then(function(response) {
          $scope.solicitudes = response[0].data;
      });
    }

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

    $scope.$watch("currentPage", function( newValue, oldValue ) {
      if(!angular.equals(newValue, oldValue)) {
          $scope.paginado = "page=" + ($scope.currentPage - 1).toString() + "&size=6";
          $scService.getSearchSolicitudes($scope.paginado,$scope.searcher).then(function (response) {
            $scope.solicitudes = response.data;
          })
      }
    });

  }]);
