/**
 * Created by matias on 18/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SolicitudCrear
 * @description
 * # SolicitudCrear
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SolicitudCrearCtrl', ['$scope', 'UsuarioResource','notificationService','$scService', '$q', '$location',
    function ($scope, UsuarioResource,notificationService, $scService, $q, $location) {

    $scope.categoriaList = [];

    var promises = [
      $scService.getCategorias()
    ];

    $q.all(promises).then(function(response){
      $scope.categoriaList = response[0].data;

    }, function(response){

    });

    $scope.save = function(){

      $scService.saveSolicitud($scope.solicitud).then(function(){
        notificationService.success("Solicitud creada!");
        $location.path("panel");

      }, function(){
          notificationService.error("Error inesperado. Lo sentimos.");
      });
    }



  }]);
