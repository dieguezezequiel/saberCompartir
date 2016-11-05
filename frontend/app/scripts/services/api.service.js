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

    scService.setEstadoClase = function(name, estadoClase){
      var url = "api/sarasa/";
      //return $http.get(url);
    };

    scService.getClaseById = function(id){
      var url = "api/clases/"+id;
      return $http.get(url);
    };

    return scService;
  }]);
