/**
 * Created by matias on 19/11/16.
 */
/**
 * @ngdoc function
 * @name frontendApp.controller:UsuarioPanelCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('UsuarioPerfilCtrl', ['$scope', '$scService', '$q', '$state', 'AuthenticationService', '$location', '$rootScope', 'notificationService',
        function ($scope, $scService, $q, $state, AuthenticationService, $location, $rootScope, notificationService) {
            
            $scope.userPerfil = {};
            $scope.perfil = {}
            
            $scService.getUsuario($rootScope.globals.currentUser.userId).then(function(response){
                               
                $scope.userPerfil = response.data;
                $scope.perfil.firstName = $scope.userPerfil.firstName;
                $scope.perfil.lastName = $scope.userPerfil.lastName;
                $scope.perfil.email = $scope.userPerfil.email;
                $scope.perfil.age = $scope.userPerfil.age
            });
            
           
            
            
        }]);
