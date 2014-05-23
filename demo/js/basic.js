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
          sizeX: 2, sizeY: 2, row: 1, col: 1
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
        item.gridsterItem.sizeX++;
        item.gridsterItem.sizeY++;
      };

      $scope.decreaseSize = function(item) {
        console.log('sizeDecrease', item);
        if (item.gridsterItem.sizeX > 1) {
          item.gridsterItem.sizeX--;
        }
        if (item.gridsterItem.sizeY > 1) {
          item.gridsterItem.sizeY--;
        }
      };

      $scope.items = [
  {
    "id": 1,
    "sizeX": 2,
    "sizeY": 1,
    "row": 1,
    "col": 1
  },
  {
    "id": 2,
    "sizeX": 1,
    "sizeY": 1,
    "row": 1,
    "col": 3
  },
  {
    "id": 3,
    "sizeX": 2,
    "sizeY": 1,
    "row": 1,
    "col": 4
  },
  {
    "id": 4,
    "sizeX": 2,
    "sizeY": 2,
    "row": 2,
    "col": 1
  },
  {
    "id": 5,
    "sizeX": 1,
    "sizeY": 1,
    "row": 1,
    "col": 6
  },
  {
    "id": 6,
    "sizeX": 2,
    "sizeY": 1,
    "row": 2,
    "col": 3
  },
  {
    "id": 7,
    "sizeX": 1,
    "sizeY": 1,
    "row": 2,
    "col": 5
  },
  {
    "id": 8,
    "sizeX": 1,
    "sizeY": 1,
    "row": 3,
    "col": 3
  },
  {
    "id": 9,
    "sizeX": 1,
    "sizeY": 1,
    "row": 3,
    "col": 4
  },
  {
    "id": 10,
    "sizeX": 1,
    "sizeY": 1,
    "row": 3,
    "col": 5
  },
  {
    "id": 11,
    "sizeX": 1,
    "sizeY": 2,
    "row": 2,
    "col": 6
  }
];
    });