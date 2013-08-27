

define([
    "jquery",
    "backbone",
    "underscore",
    "core/views/base",
    "text!app/templates/routeListItem.html"
], function(
    $,
    Backbone,
    _,
    BaseView,
    theTemplate
    ) {

    var theView = BaseView.extend({

        template: _.template(theTemplate),

        initialize : function() {},

        events : {
            "click .selectRouteButton" : "handleRouteClick"
        },

        render : function()  {

            var json = this.model.toJSON();

            json = _.extend(json, {
                Distance : this.model.distance()
            });

            this.$el.append(this.template(json));

        },

        handleRouteClick : function(e) {
            this.broadcast("route:route-selected", this.model);
        }


    });

    return theView;

});