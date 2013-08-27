define([
    'backbone',
    'leaflet',
    'app/models/point'], function(
    Backbone,
    leaflet,
    Point) {

    var Points = Backbone.Collection.extend({

        model: Point,

        toLeaflet : function() {
            var latLngs = []
            this.each(function(model) {
                latLngs.push(new leaflet.LatLng(model.get("Latitude"), model.get("Longitude")))
            });

            return latLngs;
        }

    });

    return Points;
});
