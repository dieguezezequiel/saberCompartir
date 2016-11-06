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

    $scope.hide = false;

    var promises = [
      HomeResource.getSolicitudesMasSolicitadas()
    ];

    $q.all(promises).then(function(response) {
      $scope.solicitudes = response[0];
    });

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
