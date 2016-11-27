'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:dictadoCtrl
 * @description
 * # dictadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('DictadoCtrl', ['$scope','$scService', '$q', 'Constants', '_', '$stateParams', 'notificationService', '$location',
    function ($scope, $scService, $q, Constants, _, $stateParams, notificationService, $location) {

      //TODO: MEJORAR ESTO, QUE NO SE LLAME AL TOQUE, SINO CUANDO LA CLASE ES VÁLIDA
      var webrtc = new SimpleWebRTC({
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
        //PUT SOME SOCKET.IO MAGIC HERE
      };

      $scope.enviarMensajeAUsuario = function(){
        //PUT SOME SOCKET.IO MAGIC HERE
      };

      $scope.comenzarClase = function(){
        webrtc.createRoom($scope.clase.id.toString(), function(err, name){
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
        webrtc.stopScreenShare();
        webrtc.stopLocalVideo();
        webrtc.leaveRoom();
        webrtc.disconnect();
        $scope.estadoClaseMensaje = Constants.EstadosClase['FINALIZADA'];
        $scope.clase.state = $scope.findObject($scope.estadosDeClase, 'FINALIZADA');
        $scService.updateClase($scope.clase);
        $scope.stopTimer();
      };

      $scope.mutearMicrofono = function(){
        if($scope.microfonoMuteado){
          $scope.desmutearMicrofono();
        }else{
          webrtc.mute();
          $scope.microfonoMuteado = true;
        }
      };

      $scope.desmutearMicrofono = function(){
        webrtc.unmute();
        $scope.microfonoMuteado = false;
      };

      $scope.estadoClaseChange = function(){
      };


      webrtc.on('readyToCall', function (data) {
        console.log(data);
        $scope.estadoClaseMensaje = Constants.EstadosClase['EN_ESPERA'];
        $scope.readyToCall = true;
        $scope.$apply();
      });

      webrtc.on('localMediaError', function(data){
        $scope.estadoClaseMensaje = Constants.EstadosClase['LOCAL_MEDIA_ERROR'];
      });

      webrtc.on('createdPeer', function (peer) {
        var usuario = {id: peer.id, nombre: peer.nick};
        $scope.usuariosConectados.push(usuario);
        $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados + 1;
        $scope.$apply();
      });


      webrtc.connection.on('remove', function(peer){
        $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados - 1;
        //TODO: Encontrar el usuario por ID y eliminarlo
        $scope.usuariosConectados.pop();
        $scope.$apply();
      });

      webrtc.on('leftRoom', function (room) {
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
