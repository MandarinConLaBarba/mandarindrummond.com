

define([
    "jquery",
    "backbone",
    "underscore",
    "core/views/base",
    "app/views/leaflet-controls/buttonPanel",
    "app/models/route",
    "app/models/point",
    "app/models/points",
    "leaflet"
], function(
    $,
    Backbone,
    _,
    BaseView,
    TestButtonControl,
    Route,
    Point,
    Points,
    leaflet) {


    /**
     * Note: this is an odd view because it has no template. Basically leaflet finds the container using the .map(#id) function
     * TODO: look to remove this abnormality later..
     * @type {*}
     */

    var theView = BaseView.extend({

        currentRoute : new Route(),

        initialize : function() {

            var initialCoord = new L.LatLng(28.2527228, -80.702004);

            this.map = leaflet.map('mapContainer',
                {
                    zoomControl : false
                })
                .setView(initialCoord, 15);


            this.map.addControl(new TestButtonControl());
            this.map.addControl(new leaflet.Control.Zoom());

            this.onBroadcast("test-event:test", function(e) {
                console.log("broadcast event captured...");
            });

            //set up route loader
            var self = this;

            this.onBroadcast("route:route-selected", function(evnt, model) {
                self.drawRoute(model);
            });

            $('#getPointsJSON')
                .click(function() {
                    console.log(self.currentRoute.toJSON());
                    var jsonStrings = [];
                    self.currentRoute.get("Points").each(function(point) {
                        jsonStrings.push(self.latLonToString.call(point));
                    });
                    $('#pointsJSONOutput').append(jsonStrings.join(","))
                })

        },

        render : function()  {

            //set up route builder...
            this.setupRouteBuilder();

            //add tile layer
            leaflet.tileLayer('http://{s}.tile.cloudmade.com/53f66388a65b4123a9ea6ad4a87be5a8/{styleId}/256/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18,
                styleId : 997
            }).addTo(this.map);

        },

        drawRoute : function(route) {

            var points = route.get("Points");

            if (this.polyLayer) {
                this.map.removeLayer(this.polyLayer);
            }

            var startPoint = points.toLeaflet()[0];

            if (this.markerLayer) {
                this.map.removeLayer(this.markerLayer);
            }

            //add a marker
            this.markerLayer = leaflet.marker(startPoint).addTo(this.map);

            var popupMessage = "<p>" + route.get("Name") + "</p> This run is " + route.distance() + " miles long";
            //add to route layer..
            this.polyLayer = L.polyline(points.toLeaflet()).addTo(this.map);

            this.polyLayer.bindPopup(popupMessage).openPopup();

            this.map.fitBounds(this.polyLayer.getBounds());

        },

        latLonToString : function() {

            return '{"Latitude" : ' + this.get("Latitude") + ', "Longitude" : ' + this.get("Longitude") + '}'

        },

        setupRouteBuilder : function() {

            var self = this;

            //set up click handler..
            this.map.on('click', function(e) {

                var points = self.currentRoute.get('Points');
                points.add({
                    Latitude : e.latlng.lat,
                    Longitude : e.latlng.lng
                });

                if (self.polyLayer) {
                    self.map.removeLayer(self.polyLayer);
                }

                //add to route layer..
                self.polyLayer = L.polyline(points.toLeaflet()).addTo(self.map);

                var dist = 0,
                    lastPoint;

                _.each(points, function(point) {
                    if (lastPoint) {
                        dist += point.distanceTo(lastPoint);

                    }
                    lastPoint = point;

                });

            });

        }


    });

    return theView;

});
