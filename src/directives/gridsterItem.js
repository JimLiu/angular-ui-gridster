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