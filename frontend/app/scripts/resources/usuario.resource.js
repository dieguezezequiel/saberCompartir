'use strict';

angular.module('frontendApp')
  .factory('UsuarioResource', ['$resource', function UsuarioResource($resource) {
    var backUsuarioUrl = 'http://localhost:8080/api/usuarios/';
    return $resource(backUsuarioUrl, {}, {
      create: {
        method: 'POST'
      },
      login: {
        method: 'POST',
        url: backUsuarioUrl + 'login'
      }
    })
  }]);
