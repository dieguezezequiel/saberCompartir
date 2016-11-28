'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('RegistroCtrl', ['$scope', '$state', 'UsuarioResource', 'notificationService', function ($scope, $state, UsuarioResource, notificationService) {

        $scope.usuario = {};

        $scope.guardar = function () {
            var resource = UsuarioResource.create($scope.usuario);
            resource.$promise.then(function (response) {
                if(response.type == "error"){
                  notificationService.error(response.text);
                }else{
                  notificationService.success(response.text);
                }
                $state.go('login');
            }, function (error) {
                notificationService.error(error.text);
            });
        }

    }]);
