'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:PresenciadoCtrl
 * @description
 * # PresenciadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PresenciadoCtrl', ['$scope','$scService', '$q', 'Constants',
    function ($scope, $scService, $q, Constants) {

      var webrtc = new SimpleWebRTC({
        //Acá en realidad va el remoteVideo directamente, pero hay que ver por qué no anda
        media: { video: false, audio: false},
        url: Constants.URL_SIGNALING_SERVER,
        nick: 'Ricardo Fort'
      });

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


      // we have to wait until it's ready
      webrtc.on('connectionReady', function (sessionId) {
        // you can name it anything
        webrtc.joinRoom('matidg', function(err, name){
          console.log(err);
          console.log(name);
        });
      });

      webrtc.on('createdPeer', function (peer) {
        console.log(peer);
      });

      // a peer video has been added
      //PARCHE: El video lo tiene que tomar del objeto webrtc, esto es feo.
      webrtc.on('videoAdded', function (video, peer) {
        console.log('video added', peer);
        var videoContainer = document.getElementById('videoContainer');
        if (videoContainer) {
          var container = document.createElement('div');
          container.className = 'video';
          container.id = 'container_' + webrtc.getDomId(peer);
          container.appendChild(video);

          // suppress contextmenu
          video.oncontextmenu = function () { return false; };

          videoContainer.appendChild(container);
        }
      });

      $scope.abrirChat();

    }]);
