

define([
    "jquery",
    "backbone",
    "underscore",
    "leaflet",
    "core/views/baseLeafletControl",
    "text!app/templates/leaflet-controls/buttonPanel.html"
], function(
    $,
    Backbone,
    _,
    leaflet,
    BaseView,
    theTemplate
    ) {

    return BaseView.extend({

        template: _.template(theTemplate),

        initialize: function (label, options) {
            this.title = label;
            leaflet.Util.setOptions(this, options);

        },

        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            // create the control container with a particular class name
            var container = leaflet.DomUtil.create('div', 'my-custom-control');

            // ... initialize other DOM elements, add listeners, etc.
            $(container).append(this.template({
                Label : this.label
            }));

            var self = this;

            $(container).find('#btnOne').click(function(e) {
                self.broadcast("test-event:test");
                leaflet.DomEvent.stopPropagation(e);
            });


            return container;
        }
    });
});

