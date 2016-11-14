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
    //nuestras
    'directives.module',
    'scService',
    'ConstantsService'
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
      });

      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  }]);
