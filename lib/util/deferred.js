


exports.getBasicResolver = function(deferred) {
    return function (err, firstArg) {
        if (err) {
            console.warn("Basic resolver: " + err);
            deferred.reject(err);
        } else {
            deferred.resolve(firstArg);
        }
    }
}