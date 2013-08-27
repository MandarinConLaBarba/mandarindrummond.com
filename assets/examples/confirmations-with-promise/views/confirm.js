define([
    "jquery",
    "backbone",
    "underscore",
    "q",
    "text!templates/confirm.html"], function(
    $,
    Backbone,
    _,
    Q,
    template) {

    return Backbone.View.extend({

        template :_.template(template),

        initialize : function() {},

        events : {
            "click .cancelButton" : "cancel",
            "click .confirmButton" : "confirm"
        },

        render : function() {

            var templateData = {
                message : this.options.message
            };


            this.$el.show()
                .empty()
                .append(this.template(templateData));

            this.deferred = Q.defer();

            return this.deferred;

        },

        cancel : function() {

            this.$el.hide();
            this.deferred.reject();

        },

        confirm : function() {

            this.$el.hide();
            this.deferred.resolve();

        }


    });

});