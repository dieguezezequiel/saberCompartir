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
    'ui.router'
  ])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('main',{
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
    //.state('main.inicio',{
    //  url:'/',
    //  templateUrl: 'views/inicio.html',
    //  controller: 'InicioCtrl'
    //})
    //.state('main.registro',{
    //  url:'/',
    //  templateUrl: 'views/registro.html',
    //  controller: 'RegistroCtrl'
    //});

  }]);
