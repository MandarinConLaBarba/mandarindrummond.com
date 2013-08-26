define([
    "jquery",
    "underscore",
    "app/views/base",
    "app/views/articleListItem",
    "text!app/templates/articleList.html"], function(
    $,
    _,
    BaseView,
    ArticleListItemView,
    theTemplate) {

    return BaseView.extend({

        initialize : function() {},

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate));

            var self = this;

            _.each(this.options.articles, function(article) {
                new ArticleListItemView({
                    model : article,
                    el : self.$el.find('.articleListItemContainer')
                }).render();
            });

        }

    });



});