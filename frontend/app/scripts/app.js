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
    //nuestras
    'directives.module',
    'scService',
    'ConstantsService',
    'Authentication'
  ])
  .config(['$stateProvider','$urlRouterProvider', '$httpProvider',
    function($stateProvider,$urlRouterProvider,$httpProvider){
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('inicio',{
        url:'/',
        templateUrl: 'views/inicio.html',
        controller: 'InicioCtrl'
      })
      .state('registro',{
        url:'/registro',
        templateUrl: 'views/registro.html',
        controller: 'RegistroCtrl'
      })
      .state('login',{
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dictado',{
        url:'/dictado',
        templateUrl: 'views/dictado.html',
        controller: 'DictadoCtrl'
      })
      .state('presenciado',{
        url:'/presenciado/:id',
        templateUrl: 'views/presenciado.html',
        controller: 'PresenciadoCtrl'
      })
      .state('solicitudC',{
        url:'/solicitud/:id',
        templateUrl: 'views/solicitud.consulta.html',
        controller: 'SolicitudConsultaCtrl'
      })
      .state('solicitud',{
        url:'/solicitud',
        templateUrl: 'views/solicitud.crear.html',
        controller: 'SolicitudCrearCtrl'
      })
      .state('solicitudes',{
        url:'/solicitudes',
        templateUrl: 'views/solicitudes.html',
        controller: 'SolicitudesCtrl'
      })
      .state('clases',{
        url:'/clases',
        templateUrl: 'views/solicitudes.html',
        controller: 'ClasesCtrl'
      })
      .state('panel',{
        url:'/panel',
        templateUrl: 'views/usuario.panel.html',
        controller: 'UsuarioPanelCtrl'
      });

      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  }])
  .run(['$rootScope', '$state', '$location', '$cookieStore', '$http',
    function ($rootScope, $state, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // Si no esta logeado redireccionar
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
         $state.go('login');
        }
      });
    }]);
