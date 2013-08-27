define([
    'backbone',
    'underscore',
    'app/models/points',
    'app/models/route'], function(
    Backbone,
    _,
    Points,
    Route) {

    var Routes = Backbone.Collection.extend({
        model: Route,
        url : "scripts/apps/route-finder/data/routes.json",

        parse : function(res) {
            var routes = [];
            _.each(res, function(route) {
                if (route.Points) {
                    route.Points = new Points(route.Points);
                }

                routes.push(route);
            });

            return routes;
        }
    });

    return Routes;
});
