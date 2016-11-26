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
  .controller('UsuarioPanelCtrl', ['$scope','$scService', '$q', '$state', 'AuthenticationService', '$location', '$rootScope',
    function ($scope, $scService, $q, $state, AuthenticationService, $location, $rootScope) {

    $scope.cantidadClasesFinalizadas = 0;
    $scope.cantidadClasesProgramadas = 0;
    $scope.cantidadClasesPresenciadas = 0;
    $scope.cantidadSolicitudesPendientes = 0;
    $scope.cantidadSolicitudesARealizar = 0;
    $scope.cantidadClasesFavoritas = 0;
    $scope.paginacion = {page:0, size:10};
    $scope.showMenu = true;
    $scope.showMenuClasesProgramadas = false;
    $scope.showMenuClasesFinalizadas = false;
    $scope.showMenuClasesPresenciadas = false;
    $scope.showMenuClasesFavoritas = false;
    $scope.showMenuSolicitudesPendientes = false;
    $scope.showMenuSolicitudesARealizar = false;


    $scope.usuario = {username: $rootScope.globals.currentUser.username, id: $rootScope.globals.currentUser.publicId};

    if(!AuthenticationService.isAuthenticated()){
      $state.go('login');
    }

    var promisesInit = [
      $scService.getEstadosDeClase(),
      $scService.getEstadosDeSolicitud()
    ];

    $q.all(promisesInit).then(function(response) {
      $scope.estadosDeClase = response[0].data;
      $scope.estadosDeSolicitud = response[1].data;

      var promises = [
        $scService.getClasesPorEstadoYUsuario($scope.findObject($scope.estadosDeClase, 'FINALIZADA').id, $scope.usuario.username, $scope.paginacion),
        $scService.getClasesPorEstadoYUsuario($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, $scope.usuario.username, $scope.paginacion),
        $scService.getClasesPresenciadasPorUsuario($scope.usuario.username, $scope.paginacion),
        $scService.getClasesFavoritasPorUsuario($scope.usuario.username, $scope.paginacion),
        $scService.getSolicitudesPorEstadoYUsuario('PENDIENTE', $scope.usuario.username, $scope.paginacion),
        $scService.getSolicitudesPorEstadoYUsuario('A_REALIZARSE', $scope.usuario.username, $scope.paginacion)

      ];

      $q.all(promises).then(function(response) {
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


      }, function(response){

      });

    }, function(){

    });

    $scope.goToUrl = function(url){
      $location.url(url);
    };

    $scope.findObject = function(list, name){
      return _.find(list, function(obj){
        return obj.name == name;
      });
    };

  }]);
