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
      $scope.claseEnCurso = false;
      $scope.claseCancelada = false;
      $scope.calificacion = 0;
      $scope.userWasJoined = false;
      $scope.messages = [];
      $scope.myMessage = "";
      $scope.usuariosConectados = [];
      $scope.cantidadUsuariosConectados = 0;

      $scope.usuario = {username: $rootScope.globals.currentUser.username, id: $rootScope.globals.currentUser.publicId};

      $scope.enviarMensaje = function(){
        var message = {user: {}};

        message.user.name = $scope.usuario.username;
        message.data = $scope.myMessage;

        $scope.messages.push(message);
        $scope.webrtc.sendToAll('peer-text', { user: $scope.usuario.username, message: $scope.myMessage });
        $scope.myMessage = "";
        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight + 50;

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
          nick: $scope.usuario.username, //TODO: ESTO NO ANDA, VER POR QUÉ
          remoteVideosEl: "remoteVideo"
        });

        $scope.abrirChat();

        $scope.webrtc.connection.on('remove', function(peer){
          $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados - 1;
          //TODO: Encontrar el usuario por ID y eliminarlo
          $scope.usuariosConectados.pop();
          $scope.$apply();
        });

        $scope.webrtc.on('connectionReady', function (sessionId) {
          $scope.webrtc.joinRoom($scope.clase.id.toString(), function(err, name){
            console.log(err);
            console.log(name);
          });
        });

        $scope.webrtc.connection.on('classRoomFinished', function(data){
          $scope.claseFinalizada = true;
        });

        $scope.webrtc.connection.on('classRoomCreated', function(data){
          $scope.claseEnCurso = true;

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
          var usuario = {id: peer.id, nombre: peer.nick};
          $scope.usuariosConectados.push(usuario);
          $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados + 1;
        });

        $scService.joinClassRoom($scope.clase.id).then(function(){
            $scope.userWasJoined = true;
          },
        function(){
          notificationService.error('Error inesperado. Lo sentimos');

        });

        if($scope.clase.state.id == 1){

        }else if($scope.clase.state.id == 2){

        }
      };

      $scope.calificar = function(calificacion){
          $scService.calificarClase($scope.clase.id, calificacion).then(function(response){
              $location.path('/panel');
            },
          function(response){
            console.log(response);
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
               case 1: $scope.joinClassRoom();
               break;
               case 2: $scope.joinClassRoom();
               break;
               case 3: $scope.claseEnCurso = true;
                       $scope.joinClassRoom();
               break;
               case 4: $scope.claseFinalizada = true;
               break;
               case 5: $scope.claseCancelada = true;
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
