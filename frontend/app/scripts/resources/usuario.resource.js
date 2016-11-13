'use strict';

angular.module('frontendApp')
  .factory('UsuarioResource', ['$resource', function UsuarioResource($resource) {
    var backUsuarioUrl = 'api/usuarios/';
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
