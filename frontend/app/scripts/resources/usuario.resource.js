'use strict';

angular.module('frontendApp')
  .factory('UsuarioResource', ['$resource', function UsuarioResource($resource) {
    return $resource('http://localhost:8080/api/usuarios/', {}, {
      create: {
        method: 'POST'
      }
    })
  }]);
