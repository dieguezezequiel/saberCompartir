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
      .state('dictado',{
        url:'/dictado',
        templateUrl: 'views/dictado.html',
        controller: 'DictadoCtrl'
      })
      .state('presenciado',{
        url:'/presenciado',
        templateUrl: 'views/presenciado.html',
        controller: 'PresenciadoCtrl'
      });

  }]);
