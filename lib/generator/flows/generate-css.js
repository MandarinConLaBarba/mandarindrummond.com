var fs = require('fs'),
    _ = require('underscore'),
    mkdirp = require('mkdirp'),
    $ = require('jquery-deferred'),
    deferredUtil = require('../../util/deferred'),
    sass = require('node-sass'),
    sebastian = require('sebastian');

module.exports = sebastian.flow("generator.generate-css")
    .step("create-css-dir", function() {
        var deferred = $.Deferred();
        mkdirp(this.baseDir + "generated/css", deferredUtil.getBasicResolver(deferred));
        return deferred;
    })
    .step("generate-css", function() {
        var deferred = $.Deferred();
        sass.render({
            file: this.baseDir + "assets/style/foundation/foundation.scss",
            success: deferred.resolve,
            error : deferred.reject
        });

        return deferred;
    })
    .step("write-css", function(css) {
        var deferred = $.Deferred();
        fs.writeFile(this.baseDir + "generated/css/foundation.min.css", css, deferredUtil.getBasicResolver(deferred));
        return deferred;
    });
