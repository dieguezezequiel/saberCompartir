/**
 * Created by fede on 15/10/16.
 */

var LETRAS_REGEXP = /^[a-zA-Z ñÑ]*$/;
var NUMEROS_REGEXP = /^[0-9]*$/;

angular.module('directives.module')
  .directive('soloNumeros', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ngModelCtrl) {
        var ultimoValorValido = '',
          miScope = scope;
        ngModelCtrl.$formatters.unshift(function(viewValue) {

          if (viewValue != undefined) {

            var esNumero = viewValue === '' || (viewValue && NUMEROS_REGEXP.test(viewValue));

            ultimoValorValido = esNumero ? viewValue : ultimoValorValido;
            miScope.model = ultimoValorValido;

            ngModelCtrl.$setValidity('soloNumeros', esNumero);
          }

          return esNumero ? ultimoValorValido : '';
        })
      }
    };
  })
  .directive('soloLetras', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModelCtrl) {
        var ultimoValorValido = '',
          miScope = scope;
        ngModelCtrl.$formatters.unshift(function(viewValue) {

          if (viewValue != undefined) {

            var esLetra = viewValue === '' || (viewValue && LETRAS_REGEXP.test(viewValue));

            ultimoValorValido = esLetra ? viewValue : ultimoValorValido;
            miScope.model = ultimoValorValido;

            ngModelCtrl.$setValidity('soloLetras', esLetra);
          }

          return esLetra ? viewValue : ultimoValorValido;
        })
      }
    };
  })
  .directive('sinEspacios', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModelCtrl) {
        //BLOQUEO EL ESPACIO 32 = espacio http://www.elcodigoascii.com.ar/
        elm.bind("keypress", function (event) {
          //capturo la entrada del teclado
          var key = event.keyCode || event.which;
          if(key == 32) {
            return false;
          }
        });
      }
    };
  });
