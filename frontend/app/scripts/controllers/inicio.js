'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('InicioCtrl', ['$location', '$scope', '$q', '$scService', 'AuthenticationService', 'notificationService',
        function ($location, $scope, $q, $scService, AuthenticationService, notificationService) {
            
            $scope.hide = false;
            $scope.paginado = "page=0&size=3";
            
            /*   if(!AuthenticationService.isAuthenticated()){
             $location.path('/login');
             }*/
            
            $scService.getEstadosDeClase().then(function (response) {
                    
                    $scope.estadosDeClase = response.data;
                    
                    var promises = [
                        $scService.getSolicitudes($scope.paginado),
                        $scService.getclasesPorEstadoOrdenadas($scope.findObject($scope.estadosDeClase, 'PROGRAMADA').id, "date,desc", $scope.paginado),
                        $scService.getclasesPorEstadoOrdenadas($scope.findObject($scope.estadosDeClase, 'EN_CURSO').id, "date,desc", $scope.paginado),
                        $scService.getUsuariosRankingOrdenados("Score", $scope.paginado)
                    ];
                    
                    $q.all(promises).then(function (response) {
                        $scope.solicitudes = response[0].data.content;
                        $scope.clasesProgramadas = response[1].data.content;
                        $scope.clasesEnCurso = response[2].data.content;
                        $scope.usuariosRanking = response[3].data.content;
                        
                    });
                },
                function (error) {
                    notificationService.notify({
                        title: 'Ocurrio un error',
                        title_escape: false,
                        text: 'No estas autorizado para acceder al contenido',
                        text_escape: false,
                        type: "error",
                        icon: true,
                        delay: 2000
                    })
                });
            
            $scope.findObject = function (list, name) {
                return _.find(list, function (obj) {
                    return obj.name == name;
                });
            };
            
            
            $scope.sumarse = function (solicitud) {
                solicitud.totalUsers = solicitud.totalUsers + 1;
                $scope.hide = true;
                notificationService.notify({
                    title: 'Felicitaciones!',
                    title_escape: false,
                    text: 'Te sumaste a la solicitud de ' + solicitud.subject,
                    text_escape: false,
                    type: "success",
                    icon: true,
                    delay: 2000
                })
            }
            
        }]);
