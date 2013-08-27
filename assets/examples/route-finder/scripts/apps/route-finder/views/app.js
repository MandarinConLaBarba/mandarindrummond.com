

define([
    "jquery",
    "backbone",
    "underscore",
    "core/views/base",
    "app/models/route",
    "app/models/routes",
    "app/models/points",
    "app/views/map",
    "app/views/routeList",
    "text!app/templates/app.html"
], function(
    $,
    Backbone,
    _,
    BaseView,
    Route,
    Routes,
    Points,
    MapView,
    RouteListView,
    theTemplate
    ) {

    var theView = BaseView.extend({

        template: _.template(theTemplate),

        initialize : function() {},

        render : function()  {

            this.$el.append(this.template({}));

            var mapView = new MapView({
                el : this.$el.find('#mapContainer')
            });
            mapView.render();

            var routeListView = new RouteListView({
                el : this.$el.find('#routeListContainer')
            });

            routeListView.render();

        }


    });

    return theView;

});