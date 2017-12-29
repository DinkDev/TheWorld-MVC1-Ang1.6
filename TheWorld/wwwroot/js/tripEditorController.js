// tripEditorController.js
(function() {
    "use strict";

    angular.module("app-trips")
        .controller("tripEditorController", tripEditorController);

    function tripEditorController($routeParams, $http) {
        var vm = this;

        vm.tripName = $routeParams.tripName;
        vm.stops = [];
        vm.errorMessage = "";
        vm.isBusy = true;
        vm.newStop = {};

        var url = "/api/trips/" + vm.tripName + "/stops";
        var mapdataUrl = "/api/mapdata";

        $http.get(url)
            .then(function(response) {
                    // success
                    angular.copy(response.data, vm.stops);
                    //_showMap(vm.stops);

                    $http.get(mapdataUrl)
                        .then(function (response) {
                                _showMap(vm.stops, response.data);

                            },
                            function (err) {
                                vm.errorMessage = "Failed to get mapdata " + err.statusText;
                            });

                },
                function(err) {
                    vm.errorMessage = "Failed to load stops";
                })
            .finally(function() {
                vm.isBusy = false;
            });

        vm.addStop = function() {
            vm.isBust = true;

            $http.post(url, vm.newStop)
                .then(function(response) {
                        // success
                        vm.stops.push(response.data);
                        //_showMap(vm.stops, response.data);
                        vm.newStop = {};

                        $http.get(mapdataUrl)
                          .then(function(response) {
                        _showMap(vm.stops, response.data);
                                    
                                },
                          function(err) {
                              vm.errorMessage = "Failed to get mapdata " + err.statusText;
                          });

                    },
                    function() {
                        // failed
                        vm.errorMessage = "Failed to add new stop";
                    })
                .finally(function() {
                    vm.isBusy = false;
                });

        }
    }

    function _showMap(stops, apiKey) { // _ as indicator this is private, not enforced

        if (stops && stops.length > 0) {

            // was needed to use travelMap.createMap
            //var mapStops = _.map(stops,
            //    function(item) {
            //        return {
            //            lat: item.latitude,
            //            long: item.longitude,
            //            info: item.name
            //        }
            //    });

            createMap({
                stops: stops,
                selector: "#map",
                currentStop: 1,
                initialZoom: 5,
                apiKey: apiKey
            });
        }
    }

    var map = null;

    function createMap(options) {
        map = new Microsoft.Maps.Map(options.selector, { credentials: options.apiKey });

        var locations = [];
        var pins = [];

        for (var i = 0; i < options.stops.length; ++i) {
            var stop = options.stops[i];
            var location = {
                longitude: stop.longitude,
                latitude: stop.latitude
            };
            locations.push(location);

            var pin = new Microsoft.Maps.Pushpin(location,
                {
                    title: stop.name,
                    text: (i + 1).toString()
                });

            pins.push(pin);
        }

        // TODO: add line width and color
        var line = new Microsoft.Maps.Polyline(locations, { strokeColor: 'red' });

        var currentStop = options.currentStop ? options.currentStop - 1 : 0;

        map.setView({
            center: locations[currentStop],
            zoom: options.initialZoom
        });

        map.entities.push(line);
        for (var j = 0; j < pins.length; ++j) {
            map.entities.push(pins[j]);
        }
    }

})();