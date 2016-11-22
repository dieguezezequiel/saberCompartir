'use strict';

angular.module('Authentication')

  .factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout', 'UsuarioResource',
      function ($http, $cookieStore, $rootScope, $timeout, UsuarioResource) {
        var service = {};

        service.Login = function (usuario, callback) {
          //$http.post('/api/authenticate', { username: username, password: password })
          //    .success(function (response) {
          //        callback(response);
          //    });
            UsuarioResource.login(usuario, function (response) {
              callback(response)
            })
          };

        service.SetCredentials = function (usuario) {
          var authdata = btoa(usuario.username + ':' + usuario.password);

          $rootScope.globals = {
            currentUser: {
              username: usuario.username,
              authdata: authdata
            }
          };

          $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
          $cookieStore.put('globals', $rootScope.globals);
        };

        service.isAuthenticated = function(){
          return $rootScope.globals.currentUser != undefined;
        };


        service.ClearCredentials = function () {
          $rootScope.globals = {};
          $cookieStore.remove('globals');
          $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
      }]);
