
define(["backbone"], function(Backbone) {
    var Route = Backbone.Model.extend({
        defaults: {
            Latitude: 0,
            Longitude : 0
        },

        initialize: function() {}
    });
    return Route;
});