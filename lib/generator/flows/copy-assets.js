var fs = require('fs'),
    _ = require('underscore'),
    wrench = require('wrench'),
    $ = require('jquery-deferred'),
    tasks = require('../../util/tasks'),
    deferredUtil = require('../../util/deferred')
    sebastian = require('sebastian');

function copyStuff(srcDir, destDir, list, includePattern) {

    var options = {
        forceDelete: false
    };

    if (includePattern) {
        options.filter = includePattern
        options.whitelist = true;
    }

    _.each(list, function(folder) {
        console.log(srcDir);

        wrench.copyDirSyncRecursive(
            srcDir + folder,
            destDir + folder,
            options);

    });

}

function copyScript(srcDir, destDir, matcher) {

    return deferredUtil.defer(function(deferred) {
        tasks.mkdirp(destDir)
            .done(function() {
                wrench.copyDirSyncRecursive(
                    srcDir,
                    destDir,
                    {
                        forceDelete: true,
                        filter : matcher,
                        whitelist : true
                    });

                deferred.resolve();

            });

    });
}
//TODO: make this configurable...which dirs, paths, etc
module.exports = sebastian.flow("generator.copy-assets")
    .step("copy-non-script", function() {

        return copyStuff(this.baseDir + "assets/",
            this.baseDir + "generated/",
            ["images", "examples", "style"]);

    }).step("copy-jquery", function() {

        var scriptDir = "scripts/vendor/",
            assetDir = this.baseDir + "assets/",
            generatedDir = this.baseDir + "generated/";

        return $.when(
            copyScript(assetDir + "scripts/",
                generatedDir + "/scripts/", /logo\.js/),
            copyScript(assetDir + scriptDir + "jquery/",
                generatedDir + scriptDir + "/jquery/", /jquery\.min\.js/),
            copyScript(assetDir + scriptDir + "d3/",
                generatedDir + scriptDir + "/d3/", /d3\.min\.js/),
            copyScript(assetDir + scriptDir + "sebastian/",
                generatedDir + scriptDir + "/sebastian/", /sebastian\.js/)
        );
    });