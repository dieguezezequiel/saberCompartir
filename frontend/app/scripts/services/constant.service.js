/**
 * Created by matias on 14/10/16.
 */
'use strict';
angular.module('ConstantsService', [])
  .constant('Constants', {
    //add all the constants here
    //Esto igual creo que tiene que venir del back mejor

    EstadosClase: {
      EN_ESPERA : 'Todo listo! Ya puedes empezar tu clase.' , //2 ESTABLECIDA
      EN_CURSO: 'Clase en curso.' , //3
      FINALIZADA: 'Clase finalizada.' , //4
      ERRONEA: 'Ha ocurrido un error :( Inténtelo de nuevo :)' ,
      LOCAL_MEDIA_ERROR: 'Parece que has olvidado permitir el acceso de tu cámara web y micrófono, ¿no?' ,
      CONECTANDO: 'Estamos conectándote al mundo, espere un momento.'
    },
    //TODO: Que este valor venga del environment
    URL_SIGNALING_SERVER: 'https://52.67.139.75:8888'
});
