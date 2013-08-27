var fs = require('fs'),
    _ = require('underscore'),
    ncp = require('ncp'),
    $ = require('jquery-deferred'),
    deferredUtil = require('../../util/deferred'),
    sebastian = require('sebastian');

module.exports = sebastian.flow("generator.copy-assets")
    .step("copy-images", function() {

        var self = this,
            deferred = $.Deferred(),
            innerDeferreds = [];

        _.each(["images", "examples"], function(folder) {

            var innerDeferred = $.Deferred();

            ncp(self.baseDir + "assets/" + folder,
                self.baseDir + "generated/" + folder,
                deferredUtil.getBasicResolver(innerDeferred));

            innerDeferreds.push(innerDeferred);

        });

        $.when.apply(null, innerDeferreds)
            .done(deferred.resolve);

        return deferred;

    });