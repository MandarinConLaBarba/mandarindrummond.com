var fs = require('fs'),
    _ = require('underscore'),
    mustache = require('mustache'),
    marked = require('marked'),
    lineReader = require('line-reader'),
    renderPageFlow = require("./render-page"),
    $ = require('jquery-deferred'),
    sebastian = require('sebastian');


module.exports = sebastian.flow("generator.process-article")
    .step("create-generated-article-dir", function() {
        var self = this;
        var deferred = $.Deferred();
        fs.mkdir(this.articleOutputDir + this.articleName, function(err) {
            if (err) {
                console.warn("Unable to create article dir for article " + self.articleName);
            }
            deferred.resolve();
        });
        return deferred;
    })
    .step("read-configuration-header", function() {

        var deferred = $.Deferred();

        var self = this,
            allowed = [
                "title",
                "date"
            ],
            article = {
                key : this.articleName
            },
            articlePath = this.articleSourceDir + this.articleName + "/index.md";

        lineReader.eachLine(articlePath, function(line, last) {
            var splitter = ":",
                parts = line.split(splitter);
            if (allowed.indexOf(parts[0]) > -1) {
                var key = parts.shift().replace(/^\s+/,''),
                    value = parts.join(splitter).replace(/^\s+/,'');
                article[key] = value;
            } else {
                self.article = article;
                deferred.resolve();
            }
        });

        return deferred;

    })
    .step("prepare-article-markdown", function() {

        var self = this,
            deferred = $.Deferred();

        fs.readFile(this.articleSourceDir + this.articleName + "/index.md", function(err, data) {

            data = data.toString();

            _.each(self.article, function(value, key) {
                var matcher = new RegExp(key + '\\s*:\\s*' + value );
                data = data.replace(matcher, '');
            });

            self.article.html = marked(data);

            deferred.resolve(self.article.html);

        });

        return deferred;

    })
    .step("compile-article-page", function(html) {

        var execution = renderPageFlow.create().context({
            view : this.article,
            templateDir : this.templateDir,
            template : this.template
        });
        return execution.execute();

    })
    .step("write-generated-article-page", function(rendered) {

        var deferred = $.Deferred();

        fs.writeFile(this.articleOutputDir + this.articleName + "/index.html", rendered, function(err) {
            if (err) {
                console.warn(err);
                return deferred.reject(err);
            }
            deferred.resolve();
        });

        return deferred;

    })
    .step("return-article-object", function() {
        return this.article;
    });
