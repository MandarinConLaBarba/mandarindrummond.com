define([
    "jquery",
    "underscore",
    "app/views/base",
    "text!app/templates/articleListItem.html"], function(
    $,
    _,
    BaseView,
    theTemplate) {

    return BaseView.extend({

        initialize : function() {},

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate, this.model));

        }

    });



});