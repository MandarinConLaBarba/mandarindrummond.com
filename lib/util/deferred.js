$ = require('jquery-deferred');


    exports.getBasicResolver = function(deferred) {
    return function (err, firstArg) {
        if (err) {
            console.warn("Basic resolver: " + err);
            deferred.reject(err);
        } else {
            deferred.resolve(firstArg);
        }
    }
};

exports.getCarelessResolver = function(deferred) {
    return function (err, firstArg) {
        if (err) {
            console.warn("Careless resolver: " + err);
            deferred.resolve(err);
        } else {
            deferred.resolve(firstArg);
        }
    }
};

exports.defer = function(func) {

    var deferred = $.Deferred();

    func(deferred);

    return deferred;
};