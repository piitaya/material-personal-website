(function () {
  'use strict';
  angular
    .module('app')
    .directive('dynamicTitle', dynamicTitle);

  dynamicTitle.$inject = ["$transitions", "$timeout"]
  /** @ngInject */
  function dynamicTitle($transitions, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {

        var mainTitle = element.text();

        $transitions.onSuccess({}, function ($state, $transition$) {
          var toState = $transition$.$to();
          var title = mainTitle;
          if (toState.data && toState.data.title) {
            title = toState.data.title + " | " + title;
          }

          $timeout(function () {
            element.text(title);
          }, 0, false);
        });
      }
    };
  }

})();
