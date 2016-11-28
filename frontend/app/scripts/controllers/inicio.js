'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('InicioCtrl', ['$location','$scope', '$q', '$scService', '$rootScope', 'AuthenticationService', 'notificationService',
    function ($location, $scope, $q, $scService, $rootScope, AuthenticationService, notificationService) {

    $scope.usuarioLoggeado = $rootScope.globals.currentUser;

    $scope.hide = false;
    $scope.paginado = "page=0&size=3";

   /*   if(!AuthenticationService.isAuthenticated()){
        $location.path('/login');
      }*/

    $scService.getEstadosDeClase().then(function(response){

      $scope.estadosDeClase = response.data;

      var promises = [
        $scService.getSolicitudesTopNStatePendiente("page=0&size=6",'totalUsers','PENDIENTE'),
        $scService.getclasesPorEstadoOrdenadas($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, "date,desc", $scope.paginado),
        $scService.getclasesPorEstadoOrdenadas($scope.findObject($scope.estadosDeClase, 'EN_CURSO').id, "date,desc",  $scope.paginado),
        $scService.getUsuariosRankingOrdenados("Score", $scope.paginado)
      ];

      $q.all(promises).then(function(response) {
        $scope.solicitudes = response[0].data.content;
        $scope.clasesProgramadas = response[1].data.content;
        $scope.clasesEnCurso = response[2].data.content;
        $scope.usuariosRanking = response[3].data.content;

      });
    },
    function(error){
      new PNotify({
        title: "Oh no!",
        text: "Usuario y/o contraseña invalidos",
        type: 'error'
      })
    });

    $scope.findObject = function(list, name){
      return _.find(list, function(obj){
        return obj.name == name;
      });
    };

    $scope.IfICanJoinSolicitud = function(solicitud){
      var idUsersInSolicitud = _.pluck(solicitud.joinedUsers, 'id');
      solicitud.sumarse = !(_.contains(idUsersInSolicitud, $scope.usuarioLoggeado.id));
    };

    $scope.sumarse = function(solicitud){
      $scService.sumarseASolicitud(solicitud,$scope.usuarioLoggeado).then(function (response) {
        if(response.type == "error"){
          notificationService.error(response.data.text);
        }else{
          notificationService.success(response.data.text);
          solicitud.sumarse = false;
        }
      }, function (error) {
        notificationService.error(error.data.text);
      });
    }

  }]);
