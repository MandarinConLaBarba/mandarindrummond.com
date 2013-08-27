define(['jquery', 'underscore'], function($, _) {


    var stocks = [
        {
            "symbol" : "VCI",
            "price" : "27.68",
            "addlProp1" : "blah"
        },
        {
            "symbol" : "MSFT",
            "price" : "20.40",
            "addlProp1" : "blah2"
        },
        {
            "symbol" : "YHOO",
            "price" : "12.43",
            "addlProp1" : "blah3"
        }
    ];

    /**
     * This is a contrived stocks API simulating an async service..
     *
     */

    return {

        hairy : {

            getStocks : function(callback) {

                setTimeout(function() {

                    var abridged = _.map(stocks, function(stock) {
                        return _.pick(stock, ["symbol", "price"])
                    });

                    callback(null, abridged);
                }, 1000);

            },

            getStockDetail : function(symbol, callback) {

                setTimeout(function() {

                    var theStock = _.find(stocks, function(stock) {
                        return stock.symbol = symbol;
                    });

                    if (!theStock) {
                        callback("No stock w/ that symbol!");
                    } else {
                        callback(null, theStock);
                    }

                }, 1000);

            }

        },

            deferified : {

            getStocks : function(throwError) {

                var deferred = $.Deferred();

                setTimeout(function() {

                    var abridged = _.map(stocks, function(stock) {
                        return _.pick(stock, ["symbol", "price"])
                    });

                    if (throwError) {
                        deferred.reject("An error occurred fetching stocks!");
                    } else {
                        deferred.resolve(abridged);
                    }

                }, 1000);

                return deferred;

            },

            getStockDetail : function(symbol, throwError) {

                var deferred = $.Deferred();

                setTimeout(function() {

                    var theStock = _.find(stocks, function(stock) {
                        return stock.symbol = symbol;
                    });

                    if (!theStock || throwError) {
                        deferred.reject("No stock w/ that symbol!");
                    } else {
                        deferred.resolve(theStock);
                    }

                }, 1000);

                return deferred;

            }

        }

    };


});