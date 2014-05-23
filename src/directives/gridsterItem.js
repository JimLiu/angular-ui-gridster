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