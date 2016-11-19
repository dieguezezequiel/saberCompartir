'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('InicioCtrl', ['$scope','HomeResource', '$q', '$scService', function ($scope, HomeResource, $q, $scService) {

    $scope.hide = false;
    $scope.paginado = "page=0&size=3";

    $scService.getEstadosDeClase().then(function(response){

      $scope.estadosDeClase = response.data;

      var promises = [
        HomeResource.getSolicitudesMasSolicitadas(),
        $scService.getclasesPorEstadoOrdenadas($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, "date,desc", $scope.paginado),
        $scService.getclasesPorEstadoOrdenadas($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, "date,desc",  $scope.paginado),
        $scService.getUsuariosRanking("Score", $scope.paginado)
      ];

      $q.all(promises).then(function(response) {
        $scope.solicitudes = response[0];
        $scope.clasesUltimas = response[1];
        $scope.clasesEnCurso = response[2];
        $scope.usuariosRanking = response[3];

      });
    },
    function(){

    });

    $scope.findObject = function(list, name){
      return _.find(list, function(obj){
        return obj.name == name;
      });
    };



    $scope.sumarse = function(solicitud){
      solicitud.totalUsers = solicitud.totalUsers + 1;
      $scope.hide = true;
      new PNotify({
        title: "Genial!",
        text: "Te acabas de sumar a la solicitud de " + solicitud.subject,
        type: 'success'
      })
    }

  }]);
