'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('LoginCtrl', ['$scope', 'UsuarioResource', function ($scope, UsuarioResource) {

    $scope.usuario = {};

    //TODO: Iniciar sesion, hacer redirect y demas
    $scope.loguear = function(){
        UsuarioResource.login($scope.usuario);
    }

  }]);
