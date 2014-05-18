(function() {
  'use strict';

  angular.module('ui.gridster')

  .controller('GridsterController', ['$scope', '$element', '$attrs',
    function($scope, $element, $attrs) {
      this.scope = $scope;
      this.element = $element;
      $scope.$modelValue = null;
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

      this.removeItem = function(element, index) {
        if (gridster) {
          gridster.remove_widget(element, function() {
            $scope.$apply();
          });
        }
        $scope.$modelValue.splice(index, 1);
      };

      this.resizeItem = function(widget, width, height) {
        if (gridster && widget) {
          gridster.resize_widget(widget, width, height);
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
          widget.width = item.size_x;
          widget.height = item.size_y;
          widget.row = item.row;
          widget.col = item.col;
        });
      };

    }
  ]);
})();