/**
 * @license Angular UI Gridster v0.1.0
 * (c) 2010-2014. https://github.com/JimLiu/angular-ui-gridster
 * License: MIT
 */

(function () {
  'use strict';

  angular.module('ui.gridster', [])
    .constant('uiGridsterConfig', {
      widget_margins: [5, 5],
      widget_base_dimensions: [100, 55],
      widget_selector: 'ui-gridster-item',
      resize: {
        enabled: true
      }
    });

})();
(function() {
  'use strict';

  angular.module('ui.gridster')

  .controller('GridsterController', ['$scope', '$element', '$attrs',
    function($scope, $element, $attrs) {
      this.scope = $scope;
      var gridster = null;
      $scope.init = function(element, options) {
        gridster = element.gridster(options).data('gridster');
        return gridster;
      };

      this.addItem = function(element, width, height, col, row) {
        if (gridster) {
          return gridster.add_widget(element, width, height, col, row);
        }
        return null;
      };

      this.removeItem = function(element) {
        if (gridster) {
          gridster.remove_widget(element);
        }
      };

      this.resizeItem = function(widget, width, height) {
        if (gridster && widget) {
          gridster.resize_widget(widget, width, height);
        }
      };

    }
  ]);
})();

(function() {
  'use strict';

  angular.module('ui.gridster')
    .directive('uiGridster', ['uiGridsterConfig',
      function(uiGridsterConfig) {
        return {
          restrict: 'A',
          scope: true,
          controller: 'GridsterController',
          link: function(scope, element, attrs) {
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
              var itemscope = angular.element(ui.$helper).scope();
              if (itemscope) {
                var item = itemscope.gridsterItem;
                var grid = ui.$helper.coords().grid;
                if (item.col != grid.col || item.row != grid.row) {
                  itemscope.$apply(function() {
                    item.col = grid.col;
                    item.row = grid.row;
                  });
                }
              }
            };

            options.resize.stop = function(event, ui, $widget) {
              var itemscope = angular.element(ui.$helper).scope();
              if (itemscope) {
                var item = itemscope.gridsterItem;
                var grid = $widget.coords().grid;
                if (item.width != grid.size_x || item.height != grid.size_y) {
                  itemscope.$apply(function () {
                    item.width = grid.size_x;
                    item.height = grid.size_y;
                  });
                }
              }
            };

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
              }
              gridster = scope.init(element, options);
            });
          }
        };
      }
    ]);



})();
(function() {
  'use strict';

  angular.module('ui.gridster')
    .directive('uiGridsterItem', [

      function() {
        return {
          restrict: 'A',
          require: '^uiGridster',
          link: function(scope, element, attrs, controller) {
            var gridsterItem = null;
            element.addClass('ui-gridster-item');
            attrs.$observe('uiGridsterItem', function(val) {
              var ival = scope.$eval(val);
              if((typeof ival) == 'object') {
                gridsterItem = ival;
                scope.gridsterItem = gridsterItem;
                scope.widget = controller.addItem(element, ival.width, ival.height, ival.col, ival.row);
              }
            });

            element.bind('$destroy', function() {
              controller.removeItem(element);
            });

            scope.$watchCollection('[gridsterItem.width, gridsterItem.height]', function(newValues) {
              controller.resizeItem(scope.widget, newValues[0], newValues[1]);
            });
          }
        };
      }
    ]);



})();