/**
 * Created by matias on 19/11/16.
 */
'use strict';

angular.module('frontendApp')
  .factory('ClaseResource', ['$resource', function ClaseResource($resource) {
    var url = 'api/classrooms/:id';
    return $resource(url, {id:'@id'}, {
      getClasesProgramadasUltimas: {
        method: 'GET',
        isArray: true
      },
      getClasesProgramadasRelevancia: {
        method: 'GET',
        isArray: true
      },
      getClasesEnProgreso: {
        method: 'GET',
        isArray: true
      }
    })
  }]);
