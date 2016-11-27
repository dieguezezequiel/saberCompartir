'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:PresenciadoCtrl
 * @description
 * # PresenciadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PresenciadoCtrl', ['$scope','$scService', '$q', 'Constants', '$stateParams', '$location', 'notificationService',
    function ($scope, $scService, $q, Constants, $stateParams, $location, notificationService) {
      $scope.idClase = $stateParams.id;
      $scope.claseFinalizada = false;

      $scope.enviarMensaje = function(){
        //PUT SOME SOCKET.IO MAGIC HERE
      };

      $scope.enviarMensajeAUsuario = function(){
        //PUT SOME SOCKET.IO MAGIC HERE
      };

      $scope.abrirChat = function(){
        $scope.showChat = true;
        $scope.showChatConfiguracion = false;
        $scope.showUsuariosConectados = false;
      };

      $scope.abrirUsuariosConectados = function(){
        $scope.showChat = false;
        $scope.showChatConfiguracion = false;
        $scope.showUsuariosConectados = true;
      };

      $scope.abrirChatConfiguracion = function(){
        $scope.showChat = false;
        $scope.showChatConfiguracion = true;
        $scope.showUsuariosConectados = false;
      };

      $scope.$on('$destroy', function () {
        //TODO: Alertar al usuario que se va a cerrar la clase
        $scope.unjoinClassRoom();
      });

      $scope.unjoinClassRoom = function(){
        $scope.webrtc.leaveRoom();
        $scope.webrtc.disconnect();

        $scService.unjoinClassRoom($scope.clase.id).then(function(){

          },
          function(){
            notificationService.error('Error inesperado. Lo sentimos');

          });
      };

      $scope.joinClassRoom = function(){
        $scope.webrtc = new SimpleWebRTC({
          media: { video: false, audio: false},
          url: Constants.URL_SIGNALING_SERVER,
          nick: 'Ricardo Fort', //TODO: ESTO NO ANDA, VER POR QUÉ
          remoteVideosEl: "remoteVideo"
        });

        $scope.abrirChat();

        $scope.webrtc.on('connectionReady', function (sessionId) {
          $scope.webrtc.joinRoom($scope.clase.id.toString(), function(err, name){
            console.log(err);
            console.log(name);
          });
        });


        $scope.webrtc.on('createdPeer', function (peer) {
          console.log(peer);
        });

        $scService.joinClassRoom($scope.clase.id).then(function(){

          },
        function(){
          notificationService.error('Error inesperado. Lo sentimos');

        });
      };

      $scope.init = function(){
        $scService.getClaseById($scope.idClase).then(
          function(response){
            $scope.clase = response.data;

            //TODO: Si la clase está programada, el usuario puede entrar pero no ve nada, o ve..... SAAARAAAN SAAAARANNNN PUBLICIDAD
           if($scope.clase){
             switch ($scope.clase.state.id){
               case 0:
               break;
               case 1: $scope.joinClassRoom();
               break;
               case 2: $scope.joinClassRoom();
               break;
               case 3: $scope.joinClassRoom();
               break;
               case 4: $scope.claseFinalizada = true;
               break;
               case 5: //Mostrar mensaje de clase cancelada
             }
           }else{
             $location.path('/');
           }
          },
          function(response){
            return false;
          }
        );

      };

      $scope.init();

    }]);
