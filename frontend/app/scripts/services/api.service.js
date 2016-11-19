/**
 * Created by matias on 11/10/16.
 */
'use strict';
angular.module('scService', [])
  .factory('$scService', ['$http','HomeResource', function($http,HomeResource) {

    var scService = {};

    /*CLASES*/

    scService.getEstadosDeClase = function(){
      var url = "api/classrooms/states";
      return $http.get(url);
    };

    scService.getclasesPorEstadoOrdenadas = function(state, orderBy, pagination){
      var url = "api/classrooms?" + "state=" + state + "&" + pagination + "&sort=" + orderBy;
      return $http.get(url);
    };


    scService.getRankingSolicitudes = function() {
      return HomeResource.getSolicitudesMasSolicitadas();
    };

    scService.updateClase = function(clase){
      var url = "api/classrooms/"+clase.id;
      return $http.put(url, clase);
    };

    scService.getClaseById = function(id){
      var url = "api/classrooms/"+id;

      return $http.get(url);
    };


    scService.getClassroomsByState = function(stateId){
      var url = "api/classrooms?state="+stateId;
      return $http.get(url);
    };

    scService.getEstablishedClassroom = function(){
      var url = "api/classrooms/established";
      return $http.get(url);
    };

    /*SOLICITUDES*/
    scService.getSolicitudById = function(id){
      var url = "api/requests/" + id;
      return $http.get(url);
    };

    scService.tomarSolicitudAndCrearClase = function(id, solicitud){
      var url = "api/requests/" + id + "/take";
      return $http.post(url, solicitud);
    };

    /*USUARIOS*/

    scService.getUsuariosRanking = function(orderBy, pagination){
      var url = "api/usuarios?" + pagination + "&order=" + orderBy;
      return $http.get(url);
    };

    return scService;
  }]);
