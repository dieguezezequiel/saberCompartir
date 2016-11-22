'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('Authentication')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$state', 'UsuarioResource', '$http', 'AuthenticationService',
    function ($rootScope, $scope, $location, $state, UsuarioResource, $http, AuthenticationService) {

     
      $scope.usuario = {};

      $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.usuario, function (response) {
          if (response.email != undefined) {
            AuthenticationService.SetCredentials($scope.usuario);
            new PNotify({
              title: "Has iniciado sesion!",
              text: "Bienvenido!",
              type: 'success'
            });
            $state.go("inicio");
          }
          else {
            new PNotify({
              title: "Oh no!",
              text: "Usuario o Contraseña invalidos",
              type: 'error'
            })
          }

        });
      }
    }]);
