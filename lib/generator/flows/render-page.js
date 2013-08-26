var fs = require('fs'),
    _ = require('underscore'),
    mustache = require('mustache'),
    $ = require('jquery-deferred'),
    sebastian = require('sebastian');

function loadPartial(path) {

    var deferred = $.Deferred();

    fs.readFile(path, function(err, partial) {
        if (err) {
            console.log("Failed to load partial: " + err);
            return deferred.reject(err);
        }
        deferred.resolve(partial.toString());

    });

    return deferred;


}

function renderTemplate(templatePath, view, partials) {

    var deferred = $.Deferred();

    fs.readFile(templatePath, function(err, template) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(mustache.render(
            template.toString(),
            view,
            partials));
    });

    return deferred;


}


module.exports = sebastian.flow("generator.render-page")
    .step("get-header-partial", function() {

        var self = this,
            deferred = loadPartial(this.templateDir + "partials/header.tpl")

        self.partials = {};

        deferred.done(function(partial) {
            self.partials["header"] = partial;
        });

        return deferred;
    })
    .step("get-footer-partial", function() {
        var self = this,
            deferred = loadPartial(this.templateDir + "partials/footer.tpl")

        deferred.done(function(partial) {
            self.partials["footer"] = partial;
        });

        return deferred;

    })
    .step("get-require-config-partial", function() {

        var self = this,
            deferred = loadPartial(this.templateDir + "partials/require-setup.tpl")

        deferred.done(function(partial) {
            self.partials["require-setup"] = partial;
        });
        return deferred;


    })
    .step("render-page", function() {

        return renderTemplate(this.templateDir + this.template, this.view, this.partials);


    });
