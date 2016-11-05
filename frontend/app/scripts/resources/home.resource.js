'use strict';

angular.module('frontendApp')
  .factory('HomeResource', ['$resource', function HomeResource($resource) {
    var backUsuarioUrl = 'http://localhost:8080/api/home/';
    return $resource(backUsuarioUrl, {}, {
      getSolicitudesMasSolicitadas: {
        method: 'GET',
        isArray: true
      }
    })
  }]);
