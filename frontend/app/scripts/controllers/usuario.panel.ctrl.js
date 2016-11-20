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
  .controller('UsuarioPanelCtrl', ['$scope','$scService', '$q', function ($scope, $scService, $q) {

    $scope.cantidadClasesFinalizadas = 0;
    $scope.cantidadClasesProgramadas = 0;
    $scope.cantidadClasesPresenciadas = 0;
    $scope.cantidadClasesFavoritas = 0;
    $scope.paginacion = {page:0, size:10};
    //TODO OBTENER EL USUARIO DE NO SE DONDE, TENDRIA QUE ESTAR EN LA COOKIE 
    $scope.usuario = {id:1, nick:"Superman", firstName:"Clark", lastName:"Kent"};

    $scService.getEstadosDeClase().then(function(response) {
      $scope.estadosDeClase = response.data;

      var promises = [
        $scService.getClasesPorEstadoYUsuario($scope.findObject($scope.estadosDeClase, 'FINALIZADA').id, $scope.usuario.id, $scope.paginacion),
        $scService.getClasesPorEstadoYUsuario($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, $scope.usuario.id, $scope.paginacion),
        $scService.getClasesPresenciadasPorUsuario($scope.usuario.id, $scope.paginacion),
        $scService.getClasesFavoritasPorUsuario($scope.usuario.id, $scope.paginacion)
      ];

      $q.all(promises).then(function(response) {
        $scope.clasesFinalizadas = response[0].data.content;
        $scope.clasesProgramadas = response[1].data.content;
        $scope.clasesPresenciadas = response[2].data.content;
        $scope.clasesFavoritas = response[3].data.content;

        $scope.cantidadClasesFinalizadas = response[0].data.totalElements;
        $scope.cantidadClasesProgramadas = response[1].data.totalElements;
        $scope.cantidadClasesPresenciadas = response[2].data.totalElements;
        $scope.cantidadClasesFavoritas = response[3].data.totalElements;

      }, function(response){

      });

    }, function(){

    });

    $scope.findObject = function(list, name){
      return _.find(list, function(obj){
        return obj.name == name;
      });
    };

  }]);
