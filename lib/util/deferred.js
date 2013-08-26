


exports.getBasicResolver = function(deferred) {
    return function (err) {
        if (err) {
            console.warn("Basic resolver: " + err);
            deferred.reject(err);
        } else {
            deferred.resolve();
        }
    }
}