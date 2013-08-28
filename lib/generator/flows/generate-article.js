var fs = require('fs'),
    _ = require('underscore'),
    mustache = require('mustache'),
    deferredUtil = require('../../util/deferred'),
    marked = require('marked'),
    wrench = require('wrench'),
    renderPageFlow = require("./render-page"),
    $ = require('jquery-deferred'),
    sebastian = require('sebastian');


module.exports = sebastian.flow("generator.generate-article")
    //TODO: add step that copies all javascript, images, etc for an article (use wrench npm module)
    .step("copy-javascript-index", function() {

        return wrench.copyDirSyncRecursive(
            this.articleSourceDir + this.articleName,
            this.articleOutputDir + this.articleName,
            {
                forceDelete: false,
                filter : /^.*index\.md/
            });


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

        var lineReader = new wrench.LineReader(articlePath);

        while(lineReader.hasNextLine()) {
            var line = lineReader.getNextLine();
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
        }

        lineReader.close();

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
    .step("compile-article-page", function() {

        var execution = renderPageFlow.create().context({
            view : this.article,
            templateDir : this.templateDir,
            template : this.template
        });
        return execution.execute();

    })
    .step("write-generated-article-page", function(rendered) {

        var deferred = $.Deferred();

        fs.writeFile(this.articleOutputDir + this.articleName + "/index.html",
            rendered, deferredUtil.getBasicResolver(deferred));

        return deferred;

    })
    .step("return-article-object", function() {
        return this.article;
    });
