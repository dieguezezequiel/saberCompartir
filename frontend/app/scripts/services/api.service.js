/**
 * Created by matias on 11/10/16.
 */
'use strict';
angular.module('scService', [])
  .factory('$scService', ['$http','HomeResource', function($http,HomeResource) {

    var scService = {};

    scService.getStreamingActuales = function() {
      var url = "api/sarasa/";
      //return $http.get(url);
      return [1,2,3,4,5,6,7,8];
    };

    scService.getStreamingProgramados = function() {
      var url = "api/sarasa/";
      //return $http.get(url);
      return [1,2,3,4,5,6,7,8];
    };

    scService.getRankingUsuarios = function() {
      var url = "api/sarasa/";
      //return $http.get(url);
      return [1,2,3,4,5,6,7,8];
    };

    scService.getRankingSolicitudes = function() {
      return HomeResource.getSolicitudesMasSolicitadas();
    };

    scService.updateClase = function(clase){
      var url = "api/classroom/"+clase.id;
      return $http.put(url, clase);
    };

    scService.getClaseById = function(id){
      var url = "api/classroom/"+id;

      return $http.get(url);
    };


    scService.getClassroomsByState = function(stateId){
      var url = "api/classroom?state="+stateId;
      return $http.get(url);
    };

    scService.getEstablishedClassroom = function(){
      var url = "api/classroom/established";
      return $http.get(url);
    };

    return scService;
  }]);
