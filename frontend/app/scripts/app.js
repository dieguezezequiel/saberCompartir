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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    //nuestras
    'directives.module'
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
      });

  }]);
