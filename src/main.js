/**
 * @license Angular UI Gridster v0.1.0
 * (c) 2010-2014. https://github.com/JimLiu/angular-ui-gridster
 * License: MIT
 */

(function () {
  'use strict';

  angular.module('ui.gridster', [])
    .constant('uiGridsterConfig', {
      widget_margins: [10, 10],
      widget_base_dimensions: [100, 100],
      widget_selector: '.ui-gridster-item',
      resize: {
        enabled: false
      }
    });

})();