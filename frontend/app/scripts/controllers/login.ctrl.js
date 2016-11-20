'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'UsuarioResource', '$http', '$cookieStore',
    function ($rootScope, $scope, $location, UsuarioResource, $http, $cookieStore) {

    $scope.usuario = {};
    $scope.login = function(){
        UsuarioResource.login($scope.usuario, function(response){
          if(response){
            $http.defaults.headers.common['Authorization'] = 'Basic '
              + btoa($scope.usuario.username+":"+ $scope.usuario.password);
            $location.url("/home");
          }
        }, function(error){
          new PNotify({
            title: "Oh no!",
            text: "Usuario o Contraseña invalidos",
            type: 'error'
          })
        });
    }

  }]);
