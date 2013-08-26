define([
    "jquery",
    "underscore",
    "app/views/base",
    "app/views/articleListItem",
    "text!app/templates/articleList.tpl"], function(
    $,
    _,
    BaseView,
    ArticleListItemView,
    theTemplate) {

    return BaseView.extend({

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate));

            var self = this;

            _.each(this.collection, function(article) {
                new ArticleListItemView({
                    model : article,
                    el : self.$el.find('.articleListItemContainer')
                }).render();
            });

        }

    });



});