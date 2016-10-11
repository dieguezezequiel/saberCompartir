/**
 * Created by fede on 10/10/16.
 */
angular.module('directives.module',[])
  .directive('customForm', ['$timeout', function ($timeout) {
    //transclude para que dentro de lo que pongamos en el form aparezca en este template
    //replace reemplaza lo escrito.. <div custom-form f-name bla bla bla... por el template de la directiva
    return {
      template:
      '<form novalidate name="{{fName}}" class="form-horizontal" role="form" ng-submit="submitAction()">' +
      '<div ng-transclude></div>'+
      '</form>',
      restrict: 'AE',
      transclude: true,
      require: ['form', 'customForm'],
      replace: true,
      scope: {
        submitAction: '&',
        fName: '@'
      },
      //Esto es para no perder ninguna funcionalidad de la directiva form de angular
      link: function (scope, element, attrs, controllers) {
        var formController = controllers[0],
          customFormController = controllers[1];
        customFormController.formController = formController;
      },
      controller: ['$scope', function ($scope) {

        this.scope = $scope;
        var fName = this.$name = $scope.fName  = $scope.fName || 'form';
        this.showHelpBlock = function (campo) {
          var invalid = false;
          if (typeof $scope[fName][campo] !== 'undefined') {
            //TODO: Ver la mejor forma de validar para contemplar todos los casos, no solo en required
            //invalid = $scope[fName].$submitted && $scope[fName][campo].$invalid;
            invalid = $scope[fName].$submitted && $scope[fName][campo].$error.required;
          }
          return  invalid;
        };
      }]
    };
  }])
  .directive('scInputLabel',function(){
    //require interacuto con mi padre que seria customForm, comunicandome con su controller
    return {
      templateUrl: 'templates/directives/sc-inputLabel.html',
      restrict: 'AE',
      replace: true,
      require: '^customForm',
      scope: {
        model: '=',
        label: '@',
        inputName: '@',
        placeholder: '@',
        type: '@?',
        helpMsg: '@',
        maxlength: '@?',
        minlength: '@?',
        disabled: '=?',
        required: '=',
        pattern: '@?',
        patternMsg: '@?',
        iconText: '@?',
        labelCol: '=?',
        inputCol: '=?',
        notShowLabel:'=?'
      },
      link: function(scope, element, attrs, controllerPadre) {
        scope.showHelpBlock = controllerPadre.showHelpBlock;
      }
    }
  });
