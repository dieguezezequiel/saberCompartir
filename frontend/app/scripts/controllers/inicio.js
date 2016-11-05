'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('InicioCtrl', ['$scope','HomeResource', '$q', function ($scope, HomeResource, $q) {

    var promises = [
      HomeResource.getSolicitudesMasSolicitadas()
    ];

    $q.all(promises).then(function(response) {
      $scope.solicitudes = response[0];
    });

    //$scope.solicitudes = [{id: 1, nombre: "Ingles", solicitantes: 87, puntos: 500, estado: "Pendiente"},{id: 2, nombre: "Lenguaje de señas", solicitantes: 24, puntos: 100, estado: "Pendiente"}]

  }]);
