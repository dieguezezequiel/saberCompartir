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
      url: 'http://localhost:8888'
    });
    $scope.cantidadUsuariosConectados = 0;
    $scope.readyToCall = false;
    $scope.claseEnCurso = false;
    $scope.tiempoDeClase = 0;
    $scope.estadoClase = Constants.EstadosClase['CONECTANDO'];

    $scope.enviarMensaje = function(){
      //PUT SOME SOCKET.IO MAGIC HERE
    };

    $scope.mutear = function(){
      webrtc.mute();
    };

    $scope.desmutear = function(){
      webrtc.unmute();
    };

    $scope.empezarClase = function(){
      //Esto es muy feo e inseguro
      webrtc.createRoom('matidg', function(callback){
        console.log(callback);
        $scope.estadoClase = Constants.EstadosClase['EN_CURSO'];
        $scope.claseEnCurso = true;
      });
    };

    $scope.terminarClase = function(){
      webrtc.stopScreenShare();
      webrtc.stopLocalVideo();
      webrtc.leaveRoom();
      webrtc.disconnect();
      $scope.estadoClase = Constants.EstadosClase['FINALIZADA'];
    };

    $scope.estadoClaseChange = function(){

    };


    /*EVENTOS*/

    webrtc.on('readyToCall', function () {
      $scope.estadoClase = Constants.EstadosClase['EN_ESPERA'];
      $scope.readyToCall = true;
    });

    // emitted three times:
    //when joining a room with existing peers, once for each peer
    //when a new peer joins a joined room
    //when sharing screen, once for each peer
    webrtc.on('createdPeer', function (peer) {
      console.log("Se unio un flaquito", peer);
      $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados++;
    });

/*    webrtc.on('RemovedPeer', function (peer) {
      console.log("Se fue un flaquito", peer);
      $scope.cantidadUsuariosConectados = $scope.cantidadUsuariosConectados--;
    });*/

    webrtc.on('leftRoom', function (room) {
      console.log("Terminaste la clase ", room);
      $scope.cantidadUsuariosConectados = 0;
    });

  }]);
