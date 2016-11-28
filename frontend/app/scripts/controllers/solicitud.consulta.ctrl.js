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
      $scope.isMakingRequest = false;

      $scope.tomarSolicitud = function(){
        $scService.tomarSolicitudAndCrearClase($scope.idSolicitud, $scope.solicitud).then(function(response){
          $scope.claseTomadaConExito = true;
          notificationService.success('Clase programada!');
          $location.path("/panel");
        }, function(response){
          $scope.claseTomadaConExito = false;
          notificationService.error('Error inesperado. Lo sentimos.');
        });
      };

      $scope.init = function(){
        $scope.isMakingRequest = true;
        $scService.getSolicitudById($scope.idSolicitud).then(function(response){
          $scope.solicitud = response.data;
          if($scope.solicitud != ""){
            $scope.solicitudIsValid = true;
            //TODO ALGO
          }else{
            $scope.solicitudIsValid = false;
          }
          $scope.isMakingRequest = false;
        },function(){
          //TODO MOSTRAR MENSAJE GRANDE EN LA PANTALLA
          $scope.isMakingRequest = false;
          notificationService.error("Error del sistema");
        });
      };

      $scope.init();

  }]);
