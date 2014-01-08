var fs = require('fs'),
    _ = require('underscore'),
    moment = require('moment'),
    tasks = require('../../util/tasks'),
    generateOneArticleFlow = require("./generate-article"),
    renderPageFlow = require("./render-page"),
    copyAssetsFlow = require("./copy-assets"),
    $ = require('jquery-deferred'),
    deferredUtil = require('../../util/deferred'),
    sebastian = require('sebastian');

module.exports = sebastian.flow("generator.generate-site")
    .step("create-content-output-dirs", function() {

        return $.when(
            tasks.mkdirp(this.baseDir + "generated/articles"),
            tasks.mkdirp(this.baseDir + "generated/pages"));

    })
    .step("create-page-output-dir", function() {

        return tasks.mkdirp(this.baseDir + "generated/pages");
    })
    .step("copy-assets", copyAssetsFlow)
    .step("read-articles", function() {
        var deferred = $.Deferred();

        fs.readdir(this.baseDir + "content/articles", deferredUtil.getBasicResolver(deferred));

        return deferred;

    })
    .step("generate-article-list", function(files) {

        var self = this,
            flowDeferreds = [],
            baseDir = this.baseDir,
            stepDeferred = $.Deferred();
        var articles = [];

        _.each(files, function(article) {

            var execution = generateOneArticleFlow.create().context({
                    articleName : article,
                    articleSourceDir : baseDir + "content/articles/",
                    articleOutputDir : baseDir + "generated/articles/",
                    templateDir : baseDir + "templates/",
                    template : "article.tpl"

                }),
                processArticleDeferred = execution.execute();

            $.when(processArticleDeferred)
                .done(function(article) {
                    articles.push(article)
                });

            flowDeferreds.push(processArticleDeferred);
        });

        $.when.apply(null, flowDeferreds)
            .done(function() {
                //should be all done.
                articles = _.sortBy(articles, function(article) {
                    return moment(article.date).unix() * -1;
                });
                self.articles = articles;
                stepDeferred.resolve(articles);
            });

        return stepDeferred;

    })
    .step("get-shortened-article-list", function() {

        return _.chain(this.articles).first(4).value();

    })
    .step("compile-index-page", function(firstArticles) {

        var execution = renderPageFlow.create().context({
                view : {
                    title : "MandarinDrummond - dot - com",
                    articles : firstArticles
                },
            templateDir : this.baseDir + "templates/",
            template : "index.tpl"
        });
        return execution.execute();

    })
    .step("write-index-page", function(rendered) {
        var deferred = $.Deferred();

        fs.writeFile(this.baseDir + "generated/index.html", rendered, deferredUtil.getBasicResolver(deferred));

        return deferred;

    })
    .step("compile-archive-page", function() {

        var self = this,
            execution = renderPageFlow.create().context({
                view : {
                    title : "Article Archive",
                    articles : self.articles
                },
                templateDir : this.baseDir + "templates/",
                template : "article-archive.tpl"
            });
        return execution.execute();

    })
    .step("write-article-archive-page", function(rendered) {
        var deferred = $.Deferred();

        fs.writeFile(this.baseDir + "generated/articles/archive.html", rendered, deferredUtil.getBasicResolver(deferred));

        return deferred;

    })
    .step("generate-about-page", function() {

        var execution = generateOneArticleFlow.create().context({
                articleName : "about",
                articleSourceDir : this.baseDir + "content/pages/",
                articleOutputDir : this.baseDir + "generated/pages/",
                templateDir : this.baseDir + "templates/",
                template : "page.tpl"

            });
        return execution.execute();

    });
