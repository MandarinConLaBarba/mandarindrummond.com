define([
    "args",
    "jquery",
    "underscore",
    "app/views/article",
    "app/views/articleList",
    "app/views/articleArchiveList"], function(
    args,
    $,
    _,
    ArticleView,
    ArticleListView,
    ArticleArchiveListView) {

    var viewOptions = {
        el : $('#contentContainer')
    };
    _.extend(viewOptions, args);

    if (args.pageType === "article") {
        new ArticleView(viewOptions).render();
    } else if (args.pageType === "article-archive") {
        new ArticleArchiveListView(viewOptions).render();
    } else {
        new ArticleListView(viewOptions).render();
    }

});