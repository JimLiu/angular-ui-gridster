
(function() {
  'use strict';

  angular.module('ui.gridster')
    .directive('uiGridster', ['uiGridsterConfig', '$timeout',
      function(uiGridsterConfig, $timeout) {
        return {
          restrict: 'A',
          scope: true,
          controller: 'GridsterController',
          require: 'ngModel',
          link: function(scope, element, attrs, ngModel) {
            var options = {
              draggable: {},
              resize: {}
            };
            var gridster;
            options = angular.extend(options, uiGridsterConfig);

            function combineCallbacks(first,second){
              if(second && (typeof second === 'function')) {
                return function(e, ui) {
                  first(e, ui);
                  second(e, ui);
                };
              }
              return first;
            }

            options.draggable.stop = function(event, ui) {
              scope.$apply();
            };

            options.resize.stop = function(event, ui, $widget) {
              scope.$apply();
            };

            if (ngModel) {
              ngModel.$render = function() {
                if (!ngModel.$modelValue || !angular.isArray(ngModel.$modelValue)) {
                  scope.$modelValue = [];
                }
                scope.$modelValue = ngModel.$modelValue;
              };
            }

            attrs.$observe('uiGridster', function(val) {
              var gval = scope.$eval(val);
              if((typeof gval) != 'undefined') {
                if (gval.draggable) {
                  if (gval.draggable.stop) {
                    gval.draggable.stop = combineCallbacks(options.draggable.stop, gval.draggable.stop);
                  } else {
                    gval.draggable.stop = options.resize.stop;
                  }
                }
                if (gval.resize) {
                  if (gval.resize.stop) {
                    gval.resize.stop = combineCallbacks(options.resize.stop, gval.resize.stop);
                  } else {
                    gval.resize.stop = options.resize.stop;
                  }
                }
                angular.extend(options, gval);
                gridster = scope.init(element, options);

                scope.$watch(function() {
                  var s = gridster.serialize();
                  return JSON.stringify(s);
                }, function(val) {
                  if (val) {
                    var items = JSON.parse(val);
                    angular.forEach(items, function(item, index) {
                      var widget = scope.$modelValue[index];
                      widget.width = item.size_x;
                      widget.height = item.size_y;
                      widget.row = item.row;
                      widget.col = item.col;
                    });
                  }
                });
              }
            });
          }
        };
      }
    ]);



})();