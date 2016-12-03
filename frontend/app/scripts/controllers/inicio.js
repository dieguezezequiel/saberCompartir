'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('InicioCtrl', ['$location','$scope', '$q', '$scService', '$rootScope', 'AuthenticationService', 'notificationService', '$state',
    function ($location, $scope, $q, $scService, $rootScope, AuthenticationService, notificationService, $state) {

    $scope.solicitudes = '';
    $scope.clasesProgramadas = '';
    $scope.clasesEnCurso = '';
    $scope.usuariosRanking = '';
    $scope.usuarioLoggeado = $rootScope.globals.currentUser;

    $scope.hide = false;
    $scope.paginado = "page=0&size=6";

   /*   if(!AuthenticationService.isAuthenticated()){
        $location.path('/login');
      }*/

    $scService.getEstadosDeClase().then(function(response){

      $scope.estadosDeClase = response.data;

      var promises = [
        $scService.getSolicitudesTopNStatePendiente($scope.paginado,'totalUsers','PENDIENTE'),
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
        if(response.data.type == "success" && (clase.state.name == 'EN_CURSO' || clase.state.name == 'ESTABLECIDA')){
          $state.go("presenciado",{id: clase.id},{reload:true})
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

  }]);
