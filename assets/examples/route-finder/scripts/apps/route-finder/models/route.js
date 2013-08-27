
define([
    "leaflet",
    "app/models/points",
    "backbone"
], function(
    leaflet,
    Points,
    Backbone) {
    var Route = Backbone.Model.extend({
        defaults: {
            Id: 0,
            Name: "New Route",
            Points : new Points()
        },

        distance : function() {
            var distance = 0,
                last;

            this.get("Points")
                .each(function(point) {
                    var latLng = new leaflet.LatLng(point.get("Latitude"), point.get("Longitude"));
                    if (last) {
                        distance += latLng.distanceTo(last);
                    }
                    last = latLng;

                });

            var milesDistance = distance * 0.000621371,
                roundedMilesDistance = Math.round(milesDistance * 100) / 100;

            return roundedMilesDistance;
        },

        initialize: function() {}
    });
    return Route;
});