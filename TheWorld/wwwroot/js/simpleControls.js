// sinpleControls.js
(function() {
  "use strict";

    angular.module("simpleControls", [])
        .directive("waitCursor", waitCursor);

    function waitCursor() {
        return {
            //     <div ng-show="vm.isBusy" class="text-center"><i class="fa fa-spinner fa-spin"></i> Loading...</div>
            scope: {
                show: "=displayWhen" // leading '=' means get from an attribute
            },
            restrict: "E", // only use as an element
            templateUrl: "/views/waitCursor.html"
        };
    }

})();