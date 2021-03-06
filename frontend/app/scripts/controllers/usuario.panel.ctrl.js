/**
 * Created by matias on 19/11/16.
 */
/**
 * @ngdoc function
 * @name frontendApp.controller:UsuarioPanelCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UsuarioPanelCtrl', ['$scope', '$scService', '$q', '$state', 'AuthenticationService', '$location', '$rootScope', 'notificationService',
    function ($scope, $scService, $q, $state, AuthenticationService, $location, $rootScope, notificationService) {


      $scope.cantidadClasesFinalizadas = 0;
      $scope.cantidadClasesProgramadas = 0;
      $scope.cantidadClasesPresenciadas = 0;
      $scope.cantidadSolicitudesPendientes = 0;
      $scope.cantidadSolicitudesARealizar = 0;
      $scope.cantidadClasesFavoritas = 0;
      $scope.paginacion = {page: 0, size: 10};
      $scope.showMenu = true;
      $scope.showMenuClasesProgramadas = false;
      $scope.showMenuClasesFinalizadas = false;
      $scope.showMenuClasesPresenciadas = false;
      $scope.showMenuClasesFavoritas = false;
      $scope.showMenuSolicitudesPendientes = false;
      $scope.showMenuSolicitudesARealizar = false;


      if (!AuthenticationService.isAuthenticated()) {
        $state.go('login');
      }

      $scope.opcionActiva = 'inicio';

      $scope.showSolicitud = function (solicitud) {
            $scope.opcionActiva = solicitud;
      };


      $scope.usuario = {};

      if ($rootScope.globals.currentUser) {
        $scope.usuario = {
          username: $rootScope.globals.currentUser.username,
          id: $rootScope.globals.currentUser.publicId
        };
      }

      var promisesInit = [
        $scService.getEstadosDeClase(),
        $scService.getEstadosDeSolicitud()
      ];

      $q.all(promisesInit).then(function (response) {
        $scope.estadosDeClase = response[0].data;
        $scope.estadosDeSolicitud = response[1].data;

        var promises = [
          $scService.getClasesPorEstadoYUsuario($scope.findObject($scope.estadosDeClase, 'FINALIZADA').id, $scope.usuario.username,
            $scope.paginacion),
          $scService.getClasesPorEstadoYUsuario($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, $scope.usuario.username,
            $scope.paginacion),
          $scService.getClasesPresenciadasPorUsuario($scope.usuario.username, $scope.paginacion),
          $scService.getClasesFavoritasPorUsuario($scope.usuario.username, $scope.paginacion),
          $scService.getSolicitudesPorEstadoYUsuario('PENDIENTE', $scope.usuario.username, $scope.paginacion),
          $scService.getSolicitudesPorEstadoYUsuario('A_REALIZARSE', $scope.usuario.username, $scope.paginacion),


        ];

        $q.all(promises).then(function (response) {
          $scope.clasesFinalizadas = response[0].data.content;
          $scope.clasesProgramadas = response[1].data.content;
          $scope.clasesPresenciadas = response[2].data.content;
          $scope.clasesFavoritas = response[3].data.content;
          $scope.solicitudesPendientes = response[4].data.content;
          $scope.solicitudesARealizar = response[5].data.content;

          $scope.cantidadClasesFinalizadas = response[0].data.totalElements;
          $scope.cantidadClasesProgramadas = response[1].data.totalElements;
          $scope.cantidadClasesPresenciadas = response[2].data.totalElements;
          $scope.cantidadClasesFavoritas = response[3].data.totalElements;
          $scope.cantidadSolicitudesPendientes = response[4].data.totalElements;
          $scope.cantidadSolicitudesARealizar = response[5].data.totalElements;


        }, function (response) {

        });

      }, function (error) {
        notificationService.notify({
          title: 'Ocurrio un error',
          title_escape: false,
          text: 'No estas autorizado para acceder al contenido',
          text_escape: false,
          type: "error",
          icon: true,
          delay: 2000
        })

      });

      $scope.goToUrl = function (url) {
        $location.url(url);
      };

      $scope.findObject = function (list, name) {
        return _.find(list, function (obj) {
          return obj.name == name;
        });
      };


      //perfil

      $scope.userPerfil = {};
      $scope.perfil = {}

      $scService.getUsuario($rootScope.globals.currentUser.userId).then(function (response) {

        $scope.userPerfil = response.data;
        $scope.perfil.id = $scope.userPerfil.id;
        $scope.perfil.firstName = $scope.userPerfil.firstName;
        $scope.perfil.lastName = $scope.userPerfil.lastName;
        $scope.perfil.email = $scope.userPerfil.email;
        $scope.perfil.birthDate = new Date($scope.userPerfil.birthDate);
      });

      $scService.getNotificaciones($rootScope.globals.currentUser.userId).then(function(response){
        $scope.notificaciones = response.data;
      });

     /* $scope.leerNotificaciones = function(){
        $scService.leerNotificaciones($rootScope.globals.currentUser.userId)
      }*/

      $scope.actualizar = function () {
        $scService.actualizar($scope.perfil).then(function (response) {
          notificationService.notify({
            text: 'Perfil actualizado',
            text_escape: false,
            type: "success",
            icon: true,
            delay: 2000
          });
        }, function (error) {
          notificationService.notify({
            text: 'Error al actualizar perfil',
            text_escape: false,
            type: "error",
            icon: true,
            delay: 2000
          });
        });
      }

      $scope.formatearDate = function(date){
        return moment(date).format()
      };
      //fin perfil


    }]);
