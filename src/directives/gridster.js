
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