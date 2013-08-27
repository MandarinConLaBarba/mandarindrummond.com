

define([
    "jquery",
    "backbone",
    "underscore",
    "core/views/base",
    "app/views/route",
    "app/models/routes",
    "text!app/templates/routeList.html"
], function(
    $,
    Backbone,
    _,
    BaseView,
    RouteView,
    Routes,
    theTemplate
    ) {

    var theView = BaseView.extend({

        template: _.template(theTemplate),

        initialize : function() {},

        render : function()  {

            this.$el.append(this.template({}));

            var ul = this.$el.find('ul');

            var routes = new Routes();

            $.when(routes.fetch())
                .done(function() {
                    routes.each(function(model) {
                        var routeView = new RouteView({
                            model : model
                        });

                        routeView.render();

                        ul.append(routeView.$el);


                    })

                });
        }


    });

    return theView;

});