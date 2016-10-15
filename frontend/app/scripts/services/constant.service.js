/**
 * Created by matias on 14/10/16.
 */
'use strict';
angular.module('ConstantsService', [])
  .constant('Constants', {
    //add all the constants here
    //Esto igual creo que tiene que venir del back mejor

    EstadosClase: {
      EN_ESPERA : 'Todo listo! Ya puedes empezar tu clase.' ,
      EN_CURSO: 'Clase en curso.' ,
      FINALIZADA: 'Clase finalizada.' ,
      ERRONEA: 'Ha ocurrido un error :( Inténtelo de nuevo :)' ,
      NO_MEDIA: 'Parece que has olvidado permitir el acceso de tu cámara web y micrófono, ¿no?' ,
      CONECTANDO: 'Estamos conectándote al mundo, espere un momento.'
  }
});
