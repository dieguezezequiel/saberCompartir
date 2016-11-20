'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('Authentication')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'UsuarioResource', '$http', 'AuthenticationService',
    function ($rootScope, $scope, $location, UsuarioResource, $http, AuthenticationService) {

      AuthenticationService.ClearCredentials();
      $scope.usuario = {};

      $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.usuario, function (response) {
          if (response) {
            AuthenticationService.SetCredentials($scope.usuario);
          } else {
            new PNotify({
              title: "Oh no!",
              text: "Usuario o Contraseña invalidos",
              type: 'error'
            })
          }
        });
      }
    }]);
