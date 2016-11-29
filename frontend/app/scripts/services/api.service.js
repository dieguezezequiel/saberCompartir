/**
 * Created by matias on 11/10/16.
 */
'use strict';
angular.module('scService', [])
  .factory('$scService', ['$http', function($http) {

    //TODO: VER QUE HACEMOS CON TODO ESTO, PASARLO A SERVICES SEPARADOS O A RESOURCE

    var scService = {};

    /*GLOBAL*/

    scService.getCategorias = function(){
      var url = "api/categories";
      return $http.get(url);
    };


    /*CLASES*/

    scService.getSearchClases = function(pagination,input){
      var url = "api/classrooms?" + pagination + "&searchValue=" + input;
      return $http.get(url);
    };

    scService.getEstadosDeClase = function(){
      var url = "api/classrooms/states";
      return $http.get(url);
    };

    scService.getclasesPorEstadoOrdenadas = function(state, orderBy, pagination){
      var url = "api/classrooms?" + "state=" + state + "&" + pagination + "&sort=" + orderBy;
      return $http.get(url);
    };

    scService.getclases = function(pagination){
      var url = "api/classrooms?" + pagination;
      return $http.get(url);
    };

    scService.getRankingSolicitudes = function() {
      var url = "api/classrooms/Ranking";
      return $http.get(url);
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

    scService.getClasesPorEstadoYUsuario = function(state, user, pagination){
      var url = "api/classrooms?" + "state=" + state + "&user=" + user + "&page=" + pagination.page + "&size=" + pagination.size;
      return $http.get(url);
    };

    scService.getClasesPresenciadasPorUsuario = function(user, pagination){
      var url = "api/classrooms?" + "guestUserHistory=" + user + "&page=" + pagination.page + "&size=" + pagination.size;
      return $http.get(url);
    };

    scService.getClasesFavoritasPorUsuario = function(user, pagination){
      var url = "api/classrooms?" + "user=" + user + "&page=" + pagination.page + "&size=" + pagination.size;
      return $http.get(url);
    };

    scService.streamClaseById = function(id){
      var url = "api/classrooms/" + id + "/stream";
      return $http.get(url);
    };

    scService.joinClassRoom = function(id){
      var url = "api/classrooms/" + id + "/join";
      return $http.get(url);
    };

    scService.unjoinClassRoom = function(id){
      var url = "api/classrooms/" + id + "/unjoin";
      return $http.get(url);
    };

    scService.calificarClase = function(id, calificacion){
      var url = "api/classrooms/" + id + "/qualify";
      return $http.post(url, calificacion);
    };

    /*SOLICITUDES*/

    scService.saveSolicitud = function(request){
      var url = "api/requests";
      return $http.post(url, request);
    };

    scService.getEstadosDeSolicitud = function(){
      var url = "api/requests/states";
      return $http.get(url);
    };

    //CUIDADO! NO FILTRA POR ESTADO ELIMINADO
    scService.getSolicitudes = function(pagination){
      var url = "api/requests?" + pagination;
      return $http.get(url);
    };

    scService.getSolicitudesValidas = function(pagination){
      var url = "api/requests/validas?" + pagination;
      return $http.get(url);
    };

    scService.sumarseASolicitud = function(solicitudId,usuarioLoggeadoId){
      var url = "api/requests?solicitudId=" + solicitudId + "&userId=" + usuarioLoggeadoId;
      return $http.get(url);
    };

    scService.getSolicitudesTopNStatePendiente = function(pagination,orderBy,state){
      var url = "api/requests?" + pagination + "&sort=" + orderBy + ",desc" + "&state="+ state;
      return $http.get(url);
    };

    scService.getSearchSolicitudes = function(pagination,input){
      var url = "api/requests?" + pagination + "&searchValue=" + input;
      return $http.get(url);
    };

    scService.getSolicitudById = function(id){
      var url = "api/requests/" + id;
      return $http.get(url);
    };

    scService.tomarSolicitudAndCrearClase = function(id, solicitud){
      var url = "api/requests/" + id + "/take";
      return $http.post(url, solicitud);
    };

    scService.getSolicitudesPorEstadoYUsuario = function(state, user, pagination){
      var url = "api/requests?" + "state=" + state + "&user=" + user + "&page=" + pagination.page + "&size=" + pagination.size;
      return $http.get(url);
    };

    /*USUARIOS*/

    scService.getUsuariosRankingOrdenados = function(orderBy, pagination){
      var url = "api/usuarios?" + pagination + "&order=" + orderBy;
      return $http.get(url);
    };

    return scService;
  }]);
