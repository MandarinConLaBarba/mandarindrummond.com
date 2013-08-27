define([
    "jquery",
    "backbone",
    "underscore",
    "q",
    "views/confirm",
    "text!templates/app.html"], function(
    $,
    Backbone,
    _,
    Q,
    ConfirmView,
    template) {

    return Backbone.View.extend({

        template :_.template(template),

        initialize : function() {

        },

        events : {
            "click #btnDelete" : "removeSomething",
            "click #btnSave" : "saveSomething"
        },

        render : function() {

            this.$el.append(this.template());

            this.subViews = {
                confirm : new ConfirmView({
                    el : this.$el.find('#confirmContainer')
                })
            };


        },

        removeSomething : function() {

            this.subViews.confirm.options.message = "Are you sure you want to remove it?";

            var self = this;

            Q.when(this.subViews.confirm.render().promise)
                .then(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user wants to remove it!");
                }).fail(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user doesn't want to remove it!");
                });

        },

        saveSomething : function() {

            this.subViews.confirm.options.message = "Are you sure you want to save it?";

            var self = this;

            Q.when(this.subViews.confirm.render().promise)
                .then(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user wants to save it!");
                }).fail(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user doesn't want to save it!");
                });


        }

    });

});