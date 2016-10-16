'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:dictadoCtrl
 * @description
 * # dictadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('DictadoCtrl', ['$scope','$scService', '$q', 'Constants',
    function ($scope, $scService, $q, Constants) {

    var webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      autoRequestMedia: true,
      url: Constants.URL_SIGNALING_SERVER
    });
    $scope.cantidadUsuariosConectados = 0;
    $scope.readyToCall = false;
    $scope.claseEnCurso = false;
    $scope.tiempoDeClase = 0;
    $scope.estadoClase = Constants.EstadosClase['CONECTANDO'];
    $scope.cantidadMensajes = 0;
    $scope.usuariosConectados = {};

    $scope.enviarMensaje = function(){
      //PUT SOME SOCKET.IO MAGIC HERE
    };

    $scope.enviarMensajeAUsuario = function(){
      //PUT SOME SOCKET.IO MAGIC HERE
    };

    $scope.mutear = function(){
      webrtc.mute();
    };

    $scope.desmutear = function(){
      webrtc.unmute();
    };

    $scope.comenzarClase = function(){
      //Esto es muy feo e inseguro
      webrtc.createRoom('matidg', function(err, name){
        if(!err){
          console.log(name);
          $scope.estadoClase = Constants.EstadosClase['EN_CURSO'];
          $scope.claseEnCurso = true;
          $scService.setEstadoClase(name, $scope.estadoClase);
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
      $scope.estadoClase = Constants.EstadosClase['FINALIZADA'];
      $scService.setEstadoClase(name, $scope.estadoClase);
    };

    $scope.estadoClaseChange = function(){
    };


    /*EVENTOS*/

    webrtc.on('readyToCall', function (data) {
      console.log(data);
      $scope.estadoClase = Constants.EstadosClase['EN_ESPERA'];
      $scService.setEstadoClase(name, $scope.estadoClase);
      $scope.readyToCall = true;
      $scope.$apply();
    });

    // emitted three times:
    //when joining a room with existing peers, once for each peer
    //when a new peer joins a joined room
    //when sharing screen, once for each peer
    webrtc.on('createdPeer', function (peer) {
      console.log("Se unio un flaquito", peer);
      $scope.usuariosConectados.push(peer);
      $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados + 1;
      console.log($scope.cantidadUsuariosConectados);
      $scope.$apply();
    });

/*    webrtc.on('removedPeer', function (peer) {
      console.log("Se fue un flaquito", peer);
      $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados--;
      $scope.usuariosConectados.pop(peer);
 });*/

    webrtc.on('leftRoom', function (room) {
      console.log("Terminaste la clase ", room);
      $scope.cantidadUsuariosConectados = 0;
    });

    $scope.$on('$destroy', function () {
      //TODO: Alertar al usuario que se va a cerrar la clase
      $scope.terminarClase();
    });

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

    $scope.abrirChat();
}]);
