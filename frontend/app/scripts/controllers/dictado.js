'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:dictadoCtrl
 * @description
 * # dictadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('DictadoCtrl', ['$scope','$scService', '$q', 'Constants', '_', '$stateParams', 'notificationService', '$location', '$rootScope',
    function ($scope, $scService, $q, Constants, _, $stateParams, notificationService, $location, $rootScope) {

      //TODO: MEJORAR ESTO, QUE NO SE LLAME AL TOQUE, SINO CUANDO LA CLASE ES VÁLIDA
      $scope.webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        autoRequestMedia: true,
        url: Constants.URL_SIGNALING_SERVER
      });
      $scope.isMakingRequest = false;
      $scope.cantidadUsuariosConectados = 0;
      $scope.claseIsValid = false;
      $scope.readyToCall = false;
      $scope.claseEnCurso = false;
      $scope.tiempoDeClase = 0;
      $scope.estadoClaseMensaje = Constants.EstadosClase['CONECTANDO'];
      $scope.cantidadMensajes = 0;
      $scope.usuariosConectados = [];
      $scope.volumen = 8;
      $scope.volumenMin = 0;
      $scope.volumenMax = 10;
      $scope.microfonoMuteado = false;
      $scope.duracionClase = 0;
      $scope.messages = [];
      $scope.myMessage = "";

      $scope.usuario = {username: $rootScope.globals.currentUser.username, id: $rootScope.globals.currentUser.publicId};

      $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      $scope.$on('timer-stopped', function (event, data){
        console.log('Timer Stopped - data = ', data);
      });


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

      $scope.comenzarClase = function(){
        $scope.webrtc.createRoom($scope.clase.id.toString(), function(err, name){
          if(!err){
            console.log(name);
            $scope.estadoClaseMensaje = Constants.EstadosClase['EN_CURSO'];
            $scope.claseEnCurso = true;
            $scope.clase.state = $scope.findObject($scope.estadosDeClase, 'EN_CURSO');
            $scService.updateClase($scope.clase);
            $scope.startTimer();
          }else{
            console.log(err);
          }
          $scope.$apply();
        });
      };

      $scope.terminarClase = function(){
        $scope.webrtc.stopScreenShare();
        $scope.webrtc.stopLocalVideo();
        $scope.webrtc.leaveRoom();
        $scope.webrtc.disconnect();
        $scope.estadoClaseMensaje = Constants.EstadosClase['FINALIZADA'];
        $scope.clase.state = $scope.findObject($scope.estadosDeClase, 'FINALIZADA');
        $scService.updateClase($scope.clase);
        $scope.stopTimer();
      };

      $scope.mutearMicrofono = function(){
        if($scope.microfonoMuteado){
          $scope.desmutearMicrofono();
        }else{
          $scope.webrtc.mute();
          $scope.microfonoMuteado = true;
        }
      };

      $scope.desmutearMicrofono = function(){
        $scope.webrtc.unmute();
        $scope.microfonoMuteado = false;
      };

      $scope.estadoClaseChange = function(){
      };

      $scope.openConnections = function(){

      };

      $scope.webrtc.on('readyToCall', function (data) {
        console.log(data);
        $scope.estadoClaseMensaje = Constants.EstadosClase['EN_ESPERA'];
        $scope.readyToCall = true;
        $scope.$apply();
      });

      $scope.webrtc.on('localMediaError', function(data){
        $scope.estadoClaseMensaje = Constants.EstadosClase['LOCAL_MEDIA_ERROR'];
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
        $scope.$apply();
      });


      $scope.webrtc.connection.on('remove', function(peer){
        $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados - 1;
        //TODO: Encontrar el usuario por ID y eliminarlo
        $scope.usuariosConectados.pop();
        $scope.$apply();
      });

      $scope.webrtc.on('leftRoom', function (room) {
        console.log("Terminaste la clase ", room);
        $scope.cantidadUsuariosConectados = 0;
      });

      $scope.$on('$destroy', function () {
        //TODO: Alertar al usuario que se va a cerrar la clase
        $scope.terminarClase();
      });

      $scope.volumenChange = function(){

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


      $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
          if(fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          this.$apply(fn);
        }
      };

      $scope.findObject = function(list, name){
        return _.find(list, function(obj){
          return obj.name == name;
        });
      };

      $scope.init = function(){
        $scope.isMakingRequest = true;
        $scService.getEstadosDeClase().then(function(response){
            $scope.estadosDeClase = response.data;
            $scService.getEstablishedClassroom().then(function(response){
                $scope.clase = response.data;
                if($scope.clase != ""){
                  $scope.abrirChat();
                  $scope.claseIsValid = true;
                  $scope.isMakingRequest = false;
                  $scope.openConnections;
                }else{
                  //TODO MOSTRAR MENSAJE MAS LINDO DE QUE LA PERSONA NO TIENE NINGUNA CLASE ESTABLECIDA
                  notificationService.error('No tienes ninguna clase establecida o programada');
                  $location.path("/#");
                }
              },
              function(response){
                console.log(response.data);
                $scope.claseIsValid = false;
                notificationService.error("Error inesperado. Lo sentimos.");
                $location.path("/#");
              });
          },
        function(response){
          $scope.claseIsValid = false;
          notificationService.error("Error inesperado. Lo sentimos.");
          $location.path("/#");
        });


      };

      $scope.init();
    }]);
