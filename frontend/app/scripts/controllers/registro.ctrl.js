'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('RegistroCtrl', ['$scope', 'UsuarioResource', function ($scope, UsuarioResource) {

    $scope.usuario = {};

    $scope.guardar = function(){
        UsuarioResource.create($scope.usuario);
    }

  }]);
