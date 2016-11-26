/**
 * Created by redbee on 23/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ClaseConsultaCtrl
 * @description
 * # ClaseConsultaCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ClaseConsultaCtrl', ['$scope', '$q', '$scService', '$stateParams', 'notificationService', function ($scope, $q, $scService, $stateParams, notificationService) {

    $scope.idClase = $stateParams.id;
    $scope.claseIsValid = false;

    $scope.init = function(){
      $scService.getClaseById($scope.idClase).then(function(response){
        $scope.clase = response.data;
        if($scope.clase != ""){
          $scope.claseIsValid = true;
          //TODO ALGO
        }else{
          $scope.solicitudIsValid = false;
        }
      },function(){
        //TODO MOSTRAR MENSAJE GRANDE EN LA PANTALLA
        notificationService.error("Error del sistema");
      });
    };

    $scope.dictarClase = function(){
      $scService.streamClaseById($scope.idClase).then(function(){
        $location.path("/dictado");
      }, function(){
        notificationService.error("Ha ocurrido un error inesperado. Lo sentimos");
      })
    };

    $scope.init();
  }]);
