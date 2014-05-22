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
                var widget = controller.addItem(element, gridsterItem.width, gridsterItem.height,
                    gridsterItem.col, gridsterItem.row);
                placeHolder.replaceWith(widget);
                widget.bind('$destroy', function() {
                  controller.removeItem(widget);
                });
              }
            });

            scope.$watchCollection('[gridsterItem.width, gridsterItem.height]', function(newValues) {
              if (newValues[0] && newValues[1]) {
                controller.resizeItem(widget, newValues[0], newValues[1]);
              }
            });

          }
        };
      }
    ]);



})();