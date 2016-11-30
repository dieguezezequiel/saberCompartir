'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('Authentication')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$route','$location', '$window', '$state', 'UsuarioResource', '$http', 'AuthenticationService', 'notificationService',
    function ($rootScope, $scope,$route, $location, $window, $state, UsuarioResource, $http, AuthenticationService, notificationService) {

      $scope.usuario = {};

      $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.usuario, function (response) {
          if (response.email != undefined) {
            $scope.usuario["id"] = response.id;
            AuthenticationService.SetCredentials($scope.usuario);
            notificationService.notify({
              title: 'Has iniciado sesion!',
              title_escape: false,
              text: 'Bienvenido a SaberCompartir',
              text_escape: false,
              type: "success",
              icon: true,
              delay: 2000
            });
            $state.go("inicio",{}, {reload: true});



          }
          else {
            notificationService.notify({
              title: 'Login incorrecto',
              title_escape: false,
              text: 'Compruebe su usuario y/o contraseña',
              text_escape: false,
              type: "error",
              icon: true,
              delay: 2000
            });
          }

        });
      }
    }]);
