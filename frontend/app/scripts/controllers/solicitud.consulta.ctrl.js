/**
 * Created by matias on 18/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SolicitudConsulta
 * @description
 * # SolicitudConsulta
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SolicitudConsultaCtrl', ['$scope', 'UsuarioResource','notificationService', '$scService', '$stateParams', '$location',
    function ($scope, UsuarioResource,notificationService, $scService, $stateParams, $location) {
      $scope.idSolicitud = $stateParams.id;
      $scope.solicitudIsValid = false;

      $scope.tomarSolicitud = function(){
        $scService.tomarSolicitudAndCrearClase($scope.idSolicitud, $scope.solicitud).then(function(response){

        }, function(response){

        });
      };

      $scope.init = function(){
        $scService.getSolicitudById($scope.idSolicitud).then(function(response){
          $scope.solicitud = response.data;
          if($scope.solicitud != ""){
            $scope.solicitudIsValid = true;
            //TODO ALGO
          }else{
            //TODO: MOSTRAR MENSAJE LINDO DE QUE NO EXISTE ESA SOLICITUD
            $scope.solicitudIsValid = false;
            $location.path("/#");
          }
        },function(){
          //TODO MOSTRAR MENSAJE GRANDE EN LA PANTALLA
          notificationService.error("Error del sistema");
        });
      };

      $scope.init();

  }]);
