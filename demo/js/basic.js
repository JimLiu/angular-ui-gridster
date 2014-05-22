  angular.module('app', ['ui.gridster'])
    .controller('DemoCtrl', function($scope) {
      $scope.gridsterOptions = {
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140],
        widget_selector: '.gridster > ul > li',
        min_cols: 6,
        resize: {
          enabled: true
        }
      };

      $scope.dragEnabled = true;

      $scope.toggleDragging = function() {
        $scope.dragEnabled = !$scope.dragEnabled;
      };

      $scope.addWidget = function() {
        var item = $scope.items.slice(-1).pop();
        var newId = item ? item.id + 1 : 1;
        var newItem =
        {
          id: newId,
          width: 2, height: 2, row: 1, col: 1
        };
        $scope.items.push(newItem);
      };

      $scope.serialize = function(scope) {
        console.log(scope);
        var json = scope.serializeToJson();
        $scope.gridsterJson = json;
      };

      $scope.remove = function(item) {
        console.log('before remove', $scope.items);
        var index = $scope.items.indexOf(item);
        if (index > -1) {
          $scope.items.splice(index, 1);
        }
      };

      $scope.increaseSize = function(item) {
        console.log('sizeIncrease', item);
        item.gridsterItem.width++;
        item.gridsterItem.height++;
      };

      $scope.decreaseSize = function(item) {
        console.log('sizeDecrease', item);
        if (item.gridsterItem.width > 1) {
          item.gridsterItem.width--;
        }
        if (item.gridsterItem.height > 1) {
          item.gridsterItem.height--;
        }
      };

      $scope.items = [
  {
    "id": 1,
    "width": 2,
    "height": 1,
    "row": 1,
    "col": 1
  },
  {
    "id": 2,
    "width": 1,
    "height": 1,
    "row": 1,
    "col": 3
  },
  {
    "id": 3,
    "width": 2,
    "height": 1,
    "row": 1,
    "col": 4
  },
  {
    "id": 4,
    "width": 2,
    "height": 2,
    "row": 2,
    "col": 1
  },
  {
    "id": 5,
    "width": 1,
    "height": 1,
    "row": 1,
    "col": 6
  },
  {
    "id": 6,
    "width": 2,
    "height": 1,
    "row": 2,
    "col": 3
  },
  {
    "id": 7,
    "width": 1,
    "height": 1,
    "row": 2,
    "col": 5
  },
  {
    "id": 8,
    "width": 1,
    "height": 1,
    "row": 3,
    "col": 3
  },
  {
    "id": 9,
    "width": 1,
    "height": 1,
    "row": 3,
    "col": 4
  },
  {
    "id": 10,
    "width": 1,
    "height": 1,
    "row": 3,
    "col": 5
  },
  {
    "id": 11,
    "width": 1,
    "height": 2,
    "row": 2,
    "col": 6
  }
];
    });