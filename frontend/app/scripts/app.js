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
    'ConstantsService'
  ])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
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
      });

  }]);
