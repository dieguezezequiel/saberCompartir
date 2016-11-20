
'use strict';

angular.module('frontendApp')
  .factory('AuthResource', ['$resource', function AuthResource($resource) {
    return $resource('/user',{}, {
      login: {
        method: 'POST'
      }
    })
  }]);
