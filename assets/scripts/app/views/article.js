define([
    "jquery",
    "underscore",
    "app/views/base",
    "text!app/templates/article.html"], function(
    $,
    _,
    BaseView,
    theTemplate) {

    return BaseView.extend({

        initialize : function() {},

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate));

        }

    });



});