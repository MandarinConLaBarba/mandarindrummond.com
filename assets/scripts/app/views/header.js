define([
    "jquery",
    "underscore",
    "app/views/base",
    "text!app/templates/header.html"], function(
    $,
    _,
    BaseView,
    theTemplate) {

    return BaseView.extend({

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate));

        }

    });



});