'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:PresenciadoCtrl
 * @description
 * # PresenciadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PresenciadoCtrl', ['$scope','$scService', '$q', 'Constants', '$stateParams', '$location', 'notificationService', '$rootScope',
    function ($scope, $scService, $q, Constants, $stateParams, $location, notificationService, $rootScope) {
      $scope.idClase = $stateParams.id;
      $scope.claseFinalizada = false;
      $scope.calificacion = 0;
      $scope.userWasJoined = false;
      $scope.messages = [];
      $scope.myMessage = "";

      $scope.usuario = {username: $rootScope.globals.currentUser.username, id: $rootScope.globals.currentUser.publicId};

      $scope.enviarMensaje = function(){
        var message = {user: {}};

        message.user.name = $scope.usuario.username;
        message.data = $scope.myMessage;

        $scope.messages.push(message);
        $scope.webrtc.sendToAll('peer-text', { user: $scope.usuario.username, message: $scope.myMessage });
        $scope.myMessage = "";
        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight;

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

        $scope.webrtc.connection.on('remove', function(peer){
          //TODO: Si el peer.id es el del usuario que dicta, entonces terminar clase
          //TODO: Si no es ese usuario, entonces encontrar el usuario por ID y eliminarlo del array de usuarios conectados
          $scope.claseFinalizada = true;
          $scope.$apply();
        });

        $scope.webrtc.on('connectionReady', function (sessionId) {
          $scope.webrtc.joinRoom($scope.clase.id.toString(), function(err, name){
            console.log(err);
            console.log(name);
          });
        });

        $scope.webrtc.connection.on('message', function(data) {
          if(data.type==='peer-text') {
            console.log(data);
            var message = {user: {}};

            message.user.name = data.payload.user;
            message.data = data.payload.message;

            $scope.messages.push(message);
            var objDiv = document.getElementById("chat");
            objDiv.scrollTop = objDiv.scrollHeight;
            $scope.$apply();
          }
        });

        $scope.webrtc.on('createdPeer', function (peer) {
          console.log(peer);
        });

        $scService.joinClassRoom($scope.clase.id).then(function(){
            $scope.userWasJoined = true;
          },
        function(){
          notificationService.error('Error inesperado. Lo sentimos');

        });
      };

      $scope.calificar = function(calificacion){
          $scService.calificarClase($scope.clase.id, calificacion).then(function(response){

            },
          function(response){

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
