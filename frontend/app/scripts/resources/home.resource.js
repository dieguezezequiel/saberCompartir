'use strict';

angular.module('frontendApp')
  .factory('HomeResource', ['$resource', function HomeResource($resource) {
    var backUsuarioUrl = 'api/home/';
    return $resource(backUsuarioUrl, {}, {
      getSolicitudesMasSolicitadas: {
        method: 'GET',
        isArray: true
      },
      getSolicitudesAllSolicitadas: {
        method: 'GET',
        isArray: true
      }
    })
  }]);
