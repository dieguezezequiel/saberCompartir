'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('Authentication', []);
angular
  .module('frontendApp', [
    'underscore',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui-rangeSlider',
    'timer',
    'duScroll',
    'ui.bootstrap',
    'jlareau.pnotify',
    //nuestras
    'directives.module',
    'scService',
    'ConstantsService',
    'Authentication'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state('inicio', {
          url: '/',
          templateUrl: 'views/inicio.html',
          controller: 'InicioCtrl'
        })
        .state('registro', {
          url: '/registro',
          templateUrl: 'views/registro.html',
          controller: 'RegistroCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dictado', {
          url: '/dictado',
          templateUrl: 'views/dictado.html',
          controller: 'DictadoCtrl'
        })
        .state('presenciado', {
          url: '/presenciado/:id',
          templateUrl: 'views/presenciado.html',
          controller: 'PresenciadoCtrl'
        })
        .state('solicitudC', {
          url: '/solicitud/:id',
          templateUrl: 'views/solicitud.consulta.html',
          controller: 'SolicitudConsultaCtrl'
        })
        .state('solicitud', {
          url: '/solicitud',
          templateUrl: 'views/solicitud.crear.html',
          controller: 'SolicitudCrearCtrl'
        })
        .state('solicitudes', {
          url: '/solicitudes',
          templateUrl: 'views/solicitudes.html',
          controller: 'SolicitudesCtrl'
        })
        .state('clases', {
          url: '/clases',
          templateUrl: 'views/clases.html',
          controller: 'ClasesCtrl'
        })
        .state('clasesKesesto', {
          url: '/clases/:id',
          templateUrl: 'views/clase.consulta.html',
          controller: 'ClaseConsultaCtrl'
        })
        .state('panel', {
          url: '/panel',
          templateUrl: 'views/usuario.panel.html',
          controller: 'UsuarioPanelCtrl'
        })
        .state('busquedaAll', {
          url: '/busquedaAll',
          templateUrl: 'views/busquedaAll.html',
          controller: 'BusquedaAllCtrl'
        });

      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    }])
  .controller('IndexCtrl', ['$rootScope', '$scope', '$state', 'AuthenticationService','$scService', 'notificationService',
    function ($rootScope, $scope, $state, AuthenticationService, $scService, notificationService) {

/*
      $scope.usuarioLogeado = $rootScope.globals.currentUser;
*/
      $scope.searcher = '';
      $scope.options = [
        {value: 'busquedaAll', descripcion: 'Buscar por...'},
        {value: 'clases', descripcion: 'Clases'},
        {value: 'solicitudes', descripcion: 'Solicitudes'}
      ];

      $scope.buscar = function (filtro) {
        switch(filtro.value) {
          case "busquedaAll":
            $scope.paginado = "page=0&size=3";
            $scService.getSearchClases($scope.paginado,$scope.searcher).then(function (response) {
              $scope.clases = response.data;
              $state.go('busquedaAll',{},{reload: true});
            });
            $scService.getSearchSolicitudes($scope.paginado,$scope.searcher).then(function (response) {
              $scope.solicitudes = response.data
            });
          break;
          case "clases":
            $scope.paginado = "page=0&size=6";
            $scService.getSearchClases($scope.paginado,$scope.searcher).then(function (response) {
              $scope.clases = response.data;
              $state.go('clases',{},{reload: true});
            });
          break;
          case "solicitudes":
            $scope.paginado = "page=0&size=6";
            $scService.getSearchSolicitudes($scope.paginado,$scope.searcher).then(function (response) {
              $scope.solicitudes = response.data;
              $state.go('solicitudes',{},{reload: true});
            });
          break;
          default:
            $state.go('busquedaAll',{},{reload: true});
        }
      };

      $scope.messagesBuilder= function (obj) {
        var jsonNotify = {
          text: obj.text,
          type: obj.type
        };
        if(obj.title){
          jsonNotify.title = obj.data.title;
        }
        notificationService.notify(jsonNotify);
      };

      $scope.authenticated = function () {
        return $rootScope.globals.currentUser != undefined;
      };


      $scope.logout = function () {
        AuthenticationService.ClearCredentials();
        notificationService.notify({
          title: 'Has cerrado sesion!',
          title_escape: false,
          text: 'Hasta la próxima',
          text_escape: false,
          type: "success",
          icon: true,
          delay: 2000
        });
        $state.go('inicio');
      };
    }])
  .run(['$rootScope', '$state', '$location', '$cookieStore', '$http', '$scService',
    function ($rootScope, $state, $location, $cookieStore, $http, $scService) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // Si no esta logeado redireccionar

        if($rootScope.globals.currentUser){
          $rootScope.usuarioLogeado = $rootScope.globals.currentUser.username;
        }


        if($rootScope.globals.currentUser){
          $scService.contarNotificaciones($rootScope.globals.currentUser.id).then(function (response) {
            $rootScope.notificaciones = response.data;
          })
        }

        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          /*$state.go('login');*/
        }
      });
    }]);
