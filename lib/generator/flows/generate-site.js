var fs = require('fs'),
    _ = require('underscore'),
    ncp = require('ncp'),
    mustache = require('mustache'),
    marked = require('marked'),
    lineReader = require('line-reader'),
    processArticleFlow = require("./process-article"),
    renderPageFlow = require("./render-page"),
    $ = require('jquery-deferred'),
    sebastian = require('sebastian');

module.exports = sebastian.flow("generator.generate-site")
    .step("copy-assets", function() {

        var deferred = $.Deferred();

        ncp(this.baseDir + "assets", this.baseDir + "generated", function(err) {

            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }

        });

        return deferred;


    })
    .step("read-articles", function() {

        var deferred = $.Deferred();

        fs.readdir(this.baseDir + "articles", function(err, files) {
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
                    articleSourceDir : baseDir + "articles/",
                    articleOutputDir : baseDir + "generated/articles/",
                    templateDir : baseDir + "templates/"

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
                this.articles = articles;
                stepDeferred.resolve(articles);
            });

        return stepDeferred;

    })
    .step("write-article-list-json", function(articles) {
        var deferred = $.Deferred(),
            json = JSON.stringify(articles);

        fs.writeFile(this.baseDir + "generated/articles/index.json", json, function(err) {
            if(err) {
                return deferred.reject(err);
            }
            deferred.resolve(articles);
        });

        return deferred;

    })
    .step("get-shortened-article-list", function(articles) {

        return _.chain(articles).sortBy(function(article) {
            var frags = article.date.split('/');
            return new Date(frags[2], frags[0]-1, frags[1]).getTime()*-1;
        }).first(10).value();


    })
    .step("compile-index-page", function(smallerList) {

//        var view = {
//                articlesJson : JSON.stringify(smallerList)
//            };
//        fs.readFile(this.templateDir + "partials/require-setup.tpl", function(err, requireSetup) {
//            if (err) {
//                return deferred.reject(err);
//            }
//            fs.readFile(self.templateDir + "index.tpl", function(err, template) {
//                if (err) {
//                    return deferred.reject(err);
//                }
//
//                deferred.resolve(mustache.render(
//                    template.toString(),
//                    view,
//                    {"require-setup" : requireSetup.toString()}));
//            });
//
//        });


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

        fs.writeFile(this.baseDir + "generated/index.html", rendered, function(err) {
            if (err) {
                return deferred.reject(err);
            }
            deferred.resolve();
        });

        return deferred;

    });
