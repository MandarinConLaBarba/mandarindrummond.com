define([
    "jquery",
    "underscore",
    "app/views/base",
    "app/views/articleArchiveListItem",
    "text!app/templates/articleArchiveList.tpl"], function(
    $,
    _,
    BaseView,
    ArticleArchiveListItemView,
    theTemplate) {

    return BaseView.extend({

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate));

            var self = this;
            _.each(this.collection, function(article) {
                new ArticleArchiveListItemView({
                    model : article,
                    el : self.$el.find('.articleListItemContainer')
                }).render();
            });

        }

    });



});