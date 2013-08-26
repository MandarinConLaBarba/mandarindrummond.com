var fs = require('fs'),
    _ = require('underscore'),
    ncp = require('ncp'),
    mkdirp = require('mkdirp'),
    mustache = require('mustache'),
    marked = require('marked'),
    lineReader = require('line-reader'),
    processArticleFlow = require("./process-article"),
    renderPageFlow = require("./render-page"),
    $ = require('jquery-deferred'),
    deferredUtil = require('../../util/deferred'),
    sebastian = require('sebastian');

module.exports = sebastian.flow("generator.generate-site")
    .step("create-article-output-dir", function() {
        var deferred = $.Deferred();

        mkdirp(this.baseDir + "generated/articles", deferredUtil.getBasicResolver(deferred));

        return deferred;
    })
    .step("create-page-output-dir", function() {
        var deferred = $.Deferred();

        mkdirp(this.baseDir + "generated/pages", deferredUtil.getBasicResolver(deferred));

        return deferred;
    })
    .step("copy-assets", function() {

        var deferred = $.Deferred();

        ncp(this.baseDir + "assets", this.baseDir + "generated", deferredUtil.getBasicResolver(deferred));

        return deferred;

    })
    .step("read-articles", function() {

        var deferred = $.Deferred();

        fs.readdir(this.baseDir + "content/articles", function(err, files) {
            if (err) {
                return deferred.reject(err);
            }
            deferred.resolve(files);
        });

        return deferred;

    })
    .step("generate-article-list", function(files) {

        var self = this,
            flowDeferreds = [],
            baseDir = this.baseDir,
            stepDeferred = $.Deferred();
        var articles = [];

        _.each(files, function(article) {

            var execution = processArticleFlow.create().context({
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
                self.articles = articles;
                stepDeferred.resolve(articles);
            });

        return stepDeferred;

    })
    .step("get-shortened-article-list", function() {

        return _.chain(this.articles).sortBy(function(article) {
            var frags = article.date.split('-');
            return new Date(frags[0], frags[1]-1, frags[2]).getTime()*-1;
        }).first(4).value();


    })
    .step("compile-index-page", function(smallerList) {

        var execution = renderPageFlow.create().context({
            view : {
                title : "MandarinDrummond - dot - com",
                articlesJson : JSON.stringify(smallerList)
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
                    articlesJson : JSON.stringify(self.articles)
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

        var execution = processArticleFlow.create().context({
                articleName : "about",
                articleSourceDir : this.baseDir + "content/pages/",
                articleOutputDir : this.baseDir + "generated/pages/",
                templateDir : this.baseDir + "templates/",
                template : "article.tpl"

            });
        return execution.execute();

    });
