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

    //TODO FIXEAR ESTO CUANDO LLEGUE A CASA
        $scope.guardar = function () {
            var resource = UsuarioResource.create($scope.usuario);
            resource.$promise.then(function (response) {
                $scope.messagesBuilder(response);
              if(response.type == "success"){
                $state.go('login',{},{reload: true});
              }
            }, function (error) {
                notificationService.error("Hubo un error a la hora de registrar sus datos, disculpe las molestias");
            });
        }

    }]);
