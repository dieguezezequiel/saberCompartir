'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:PresenciadoCtrl
 * @description
 * # PresenciadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PresenciadoCtrl', ['$scope','$scService', '$q', function ($scope, $scService, $q) {

    var webrtc = new SimpleWebRTC({
      //Acá en realidad va el remoteVideo directamente, pero hay que ver por qué no anda
      media: { video: false, audio: false},
      url: 'http://localhost:18888'
    });

    // we have to wait until it's ready
    webrtc.on('connectionReady', function (sessionId) {
      // you can name it anything
      webrtc.joinRoom('matidg', function(callback){
        console.log(callback);
      });
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

  }]);
