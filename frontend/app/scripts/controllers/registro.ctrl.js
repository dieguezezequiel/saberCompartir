'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('RegistroCtrl', ['$scope','$state', 'UsuarioResource','notificationService', function ($scope, $state, UsuarioResource,notificationService) {

    $scope.usuario = {};

    $scope.guardar = function(){
        var resource = UsuarioResource.create($scope.usuario);
        resource.$promise.then(function (response) {
          notificationService.success(response);
          $state.go('login');
        }, function(error){
          notificationService.error(error);
        });
    }

  }]);
