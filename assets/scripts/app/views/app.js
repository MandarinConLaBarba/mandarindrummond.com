define([
    "jquery",
    "args",
    "app/views/base",
    "app/views/articleList",
    "text!app/templates/app.html"], function(
    $,
    args,
    BaseView,
    ArticleListView,
    theTemplate) {

    return BaseView.extend({

        render : function() {

            this.$el.append(this.renderTemplate(theTemplate));

            new ArticleListView({
                el : this.$el.find('#articleListContainer'),
                articles : args.articles
            }).render();


        }

    });



});