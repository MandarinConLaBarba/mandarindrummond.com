var mkdirp = require('mkdirp'),
    deferredUtil = require('./deferred');

exports.mkdirp = function(path) {
    return deferredUtil.defer(function(deferred) {
        mkdirp(path, deferredUtil.getBasicResolver(deferred));
    });
};