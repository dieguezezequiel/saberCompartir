'use strict';

angular.module('frontendApp')
  .service('notificationService', function () {
    return {
      showMessage: function (value) {
        return new PNotify({
          title: value.title,
          text: value.text,
          type: value.type
        })
      }
    }
  });
