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
            scope.gridsterItem = null;
            attrs.$observe('uiGridsterItem', function(val) {
              var ival = scope.$eval(val);
              if((typeof ival) == 'object') {
                gridsterItem = ival;
                scope.gridsterItem = gridsterItem;
                controller.addItem(element, gridsterItem.width, gridsterItem.height,
                    gridsterItem.col, gridsterItem.row);
              }
            });

            scope.$remove = function() {
              element.remove();
            };

            element.bind('$destroy', function() {
              controller.removeItem(element, scope.$index);
            });

            scope.$watchCollection('[gridsterItem.width, gridsterItem.height]', function(newValues) {
              if (newValues[0] && newValues[1]) {
                controller.resizeItem(element, newValues[0], newValues[1]);
              }
            });

          }
        };
      }
    ]);



})();