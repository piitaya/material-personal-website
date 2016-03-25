'use strict';
angular.module('nouislider', []).directive('uiSlider', function ($timeout) {
  return {
    restrict: 'A',
    scope: {
      start: '@',
      step: '@',
      end: '@',
      connect: '@',
      callback: '@',
      margin: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var callback, fromParsed, parsedValue, slider, toParsed;
      slider = $(element);
      callback = scope.callback ? scope.callback : 'slide';
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;

        noUiSlider.create(slider[0], {
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          step: parseFloat(scope.step || 1),
          connect: scope.connect || true,
          margin: parseFloat(scope.margin || 0),
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          },
          format: wNumb({
            decimals: 0
          })
        });
        slider[0].noUiSlider.on('slide', function () {
          var from, to, _ref;
          _ref = slider[0].noUiSlider.get(), from = _ref[0], to = _ref[1];
          fromParsed = parseFloat(from);
          toParsed = parseFloat(to);
          return scope.$apply(function () {
            scope.ngFrom = fromParsed;
            return scope.ngTo = toParsed;
          });
        });
        scope.$watch('ngFrom', function (newVal, oldVal) {
          if (newVal !== fromParsed) {
            return slider.val([
              newVal,
              null
            ]);
          }
        });
        return scope.$watch('ngTo', function (newVal, oldVal) {
          if (newVal !== toParsed) {
            return slider.val([
              null,
              newVal
            ]);
          }
        });
      } else {
        parsedValue = null;

        noUiSlider.create(slider[0], {
          start: [scope.ngModel || scope.start],
          step: parseFloat(scope.step || 1),
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          },
          format: wNumb({
            decimals: 0
          }),
          connect: scope.connect || undefined,
        });

        slider[0].noUiSlider.on('slide', function () {
          $timeout(function() {
            parsedValue = parseFloat(slider[0].noUiSlider.get());
            return scope.$apply(function () {
              return scope.ngModel = parsedValue;
            });
          });
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider[0].noUiSlider.set(newVal);
          }
        });
      }
    }
  };
});