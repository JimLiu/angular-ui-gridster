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