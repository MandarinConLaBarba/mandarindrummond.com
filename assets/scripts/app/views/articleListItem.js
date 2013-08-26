define([
    "jquery",
    "underscore",
    "app/views/base",
    "text!app/templates/articleListItem.tpl"], function(
    $,
    _,
    BaseView,
    theTemplate) {

    return BaseView.extend({

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate, this.model));

        }

    });



});