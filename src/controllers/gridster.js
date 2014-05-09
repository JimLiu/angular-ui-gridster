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