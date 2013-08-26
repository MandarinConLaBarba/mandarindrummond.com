define([
    "jquery",
    "backbone",
    "mustache"], function(
    $,
    Backbone,
    mustache) {

    return Backbone.View.extend({

        renderTemplate : function(template, view) {
            return mustache.render(template, view);
        }

    });



});