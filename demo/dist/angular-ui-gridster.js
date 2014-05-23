/**
 * @license Angular UI Gridster v0.4.1
 * (c) 2010-2014. https://github.com/JimLiu/angular-ui-gridster
 * License: MIT
 */

(function () {
  'use strict';

  angular.module('ui.gridster', [])
    .constant('uiGridsterConfig', {
      widget_margins: [10, 10],
      widget_base_dimensions: [100, 100],
      widget_selector: '.ui-gridster-item',
      resize: {
        enabled: false
      }
    });

})();
(function() {
  'use strict';

  angular.module('ui.gridster')

  .controller('GridsterController', ['$scope', '$element', '$attrs',
    function($scope, $element, $attrs) {
      this.scope = $scope;
      this.element = $element;
      $scope.$dragEnabled = true;
      $scope.$modelValue = null;
      var gridster = null;
      $scope.init = function(element, options) {
        gridster = element.gridster(options).data('gridster');
        return gridster;
      };

      this.addItem = function(element, sizeX, sizeY, col, row) {
        if (gridster) {
          return gridster.add_widget(element, sizeX, sizeY, col, row);
        }
        return null;
      };

      this.removeItem = function(element) {
        if (gridster) {
          gridster.remove_widget(element, function() {
            $scope.$apply();
          });
        }
      };

      this.resizeItem = function(widget, sizeX, sizeY) {
        if (gridster && widget) {
          gridster.resize_widget(widget, sizeX, sizeY);
        }
      };

      $scope.serializeToJson = function() {
        var s = gridster.serialize();
        return JSON.stringify(s);
      };

      $scope.applyChanges = function() {
        var items = gridster.serialize();
        angular.forEach(items, function(item, index) {
          var widget = $scope.$modelValue[index];
          widget.sizeX = item.size_x;
          widget.sizeY = item.size_y;
          widget.row = item.row;
          widget.col = item.col;
        });
      };

    }
  ]);
})();

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
              }
            });

            scope.$watch(function() {
              return scope.$eval(attrs.gridsterDragEnabled);
            }, function(val) {
              if((typeof val) == "boolean") {
                scope.$dragEnabled = val;
                if (!gridster) {
                  return;
                }
                if (val) {
                  gridster.enable();
                }
                else {
                  gridster.disable();
                }
              }
            });
          }
        };
      }
    ]);



})();
(function() {
  'use strict';

  angular.module('ui.gridster')
    .directive('uiGridsterItem', ['$compile',

      function($compile) {
        return {
          restrict: 'A',
          require: '^uiGridster',
          link: function(scope, element, attrs, controller) {
            var gridsterItem = null;
            var widget = element;
            element.addClass('ui-gridster-item');
            scope.gridsterItem = null;
            attrs.$observe('uiGridsterItem', function(val) {
              var ival = scope.$eval(val);
              if((typeof ival) == 'object') {
                gridsterItem = ival;
                scope.gridsterItem = gridsterItem;
                var placeHolder = $('<li></li>');
                element.replaceWith(placeHolder);
                var widget = controller.addItem(element, gridsterItem.sizeX, gridsterItem.sizeY,
                    gridsterItem.col, gridsterItem.row);
                $compile(widget.contents())(scope);
                placeHolder.replaceWith(widget);
                widget.bind('$destroy', function() {
                  controller.removeItem(widget);
                });

                scope.$watch(function() {
                  return widget.attr('data-col');
                }, function(val) {
                  gridsterItem.col = parseInt(val);
                });
                scope.$watch(function() {
                  return widget.attr('data-row');
                }, function(val) {
                  gridsterItem.row = parseInt(val);
                });
                scope.$watch(function() {
                  return widget.attr('data-sizex');
                }, function(val) {
                  gridsterItem.sizeX = parseInt(val);
                });
                scope.$watch(function() {
                  return widget.attr('data-sizey');
                }, function(val) {
                  gridsterItem.sizeY = parseInt(val);
                });
              }
            });

            scope.$watchCollection('[gridsterItem.sizeX, gridsterItem.sizeY]', function(newValues) {
              if (newValues[0] && newValues[1]) {
                controller.resizeItem(widget, newValues[0], newValues[1]);
              }
            });

          }
        };
      }
    ]);



})();