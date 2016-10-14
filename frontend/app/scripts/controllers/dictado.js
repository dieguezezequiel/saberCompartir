'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:dictadoCtrl
 * @description
 * # dictadoCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('DictadoCtrl', ['$scope','$scService', '$q', function ($scope, $scService, $q) {

    var webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // immediately ask for camera access
      autoRequestMedia: true,
      url: 'http://localhost:8888'
    });

  // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
      // you can name it anything
      webrtc.createRoom('matidg', function(callback){
        console.log(callback);
      });
    });


  // emitted three times:
  //when joining a room with existing peers, once for each peer
  //when a new peer joins a joined room
  //when sharing screen, once for each peer

    webrtc.on('createdPeer', function (peer) {
      console.log("Se unio un flaquito", peer);
    });

  }]);
