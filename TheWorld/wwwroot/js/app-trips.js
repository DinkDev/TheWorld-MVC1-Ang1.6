// app-trips.js
(function() {

    "use strict";

    // creating the module
    angular.module("app-trips", ["simpleControls", "ngRoute"])
      .config(function ($routeProvider) {

            $routeProvider.when("/", {
                    controller: "tripsController",  // which controller
                    controllerAs: "vm",             // what to name it
                    templateUrl: "/views/TripsView.html"
                });

            $routeProvider.when("/editor/:tripName", {  // :tripName is specifying a variable to be parsed out
                    controller: "tripEditorController",  // which controller
                    controllerAs: "vm",             // what to name it
                    templateUrl: "/views/TripEditorView.html"
                });

            $routeProvider.otherwise({
                redirectTo: "/"
            });

        });

})();