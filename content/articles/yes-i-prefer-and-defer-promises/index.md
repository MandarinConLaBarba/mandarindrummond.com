title: Yes, I Prefer (and Defer) Promises...
date: 2013-02-01 8:31

I like Node.js a lot. In fact I've been working with it almost exclusively for the past twelve months and I'm not sick of it
yet. But one of the things that annoyed me early on was the callback convention adopted by Node.js authors and the larger
Node community. What I'm talking about is this:


 ```
    var someModule = require('someModule');

     someModule.someFunc("someArg", function(err, result) {

        if (err) {
            //handle error

            return;
        }

        //handle success

     });
 ```
<br/>

 Basically all asynchronous API methods expect a callback that takes an error as the first argument, followed by one to
 many additional arguments. I can't stand this! I know many will disagree, but I just don't think this convention
 encourages folks to write readable code.

 #####Here's an example of code that makes you wish you were dead, the kind I see quite often:

 ```

     var someModule = require('someModule');

      someModule.someFunc("someArg", function(err, result) {

         if (err) {
             //handle error

             return;
         }

         someModule.someOtherFunc("someOtherArg", function(err, result) {

             if (err) {
                //handle err
                return;
             }

            someModule.yetAnotherFunc("yetAnotherArg", function(err, result) {

                if (err) {
                    //handle err
                    return;
                }

                //do what you came for..

            });

         });

      });

 ```
<br/>

 #####The reasons this code is less than ideal:

 * It's just hard to read (click [here](http://howtonode.org/control-flow-part-ii) for more painful cases of this)
 * Scope hell! Your callback vars are all locally scoped, but if you want to keep it straight you often need to name the
 callback args something different for each inner callback
 * You are mixing success condition logic with error condition logic...it's up to you to make sure the execution path stops
 if there's an error!

 Now there are plenty of flow control libraries out there that address some of the above points. [Async](https://github.com/caolan/async),
 [Step](https://github.com/creationix/step) are some of the more popular options. I actually really enjoy Async
 and use it quite often, but the one thing it doesn't do is get away from the convention of passing an error
 in the first position of the callback arguments. What you get is stuff like this:


 ```
    async.waterfall([
        function(doneCallback) {

            var data = [];

            if (data.length === 0) {
                callback("noData");
            } else {
                callback(null, data);
            }

        },
        function(data, doneCallback) {
            //do something else

            callback(null, data);
        }
    ],
    function(err) {
        if (err) {
            console.log("Damn, error occurred..");
            return;
        }
        console.log("we're done!");
    });

 ```
<br/>

 Async helps a lot with nesting, right? Yes, it does..but there are still some things that bother me here:

 * The error/success logic is still mushed together in the same function scope
 * Does it really feel great to expect the developer to pass null as the first argument? Not to me.

 #####The second point may touch a nerve, but it's my opinion that the practice of passing null as the first argument to avoid triggering an error condition (and break in flow) just smells a little.

 This is where I think Promises + Deferreds excel. If you have made up your mind on how you feel about Promises, you've
 probably already stopped reading. For the rest - stick w/ me a moment longer.

 To **skip to a working example, click [here](http://mandarindrummond.com/examples/flow-control-deferreds/)**.

For the purpose of this article, I've written a contrived stock quote API that can be found
[here](http://mandarindrummond.com/examples/flow-control-deferreds/stocks.js). For contrast, this service has a conventional Node-style
API and an API that makes use of [jQuery Deferreds](http://api.jquery.com/category/deferred-object/).

Here's what some application logic looks like with conventional Node-style callbacks:

```
    //traditional node convention, passing callbacks...nested callbacks - Ugh!
    console.log("Getting the stocks..");
    stocks.hairy.getStocks(function (err, data) {

        if (err) {
            console.log("Damn, there was an error: ");
            console.log(err);
            return;
        }


        var firstStock = _.first(data);

        stocks.hairy.getStockDetail(firstStock.symbol, function (err, data) {

            if (err) {
                console.log("Damn, there was an error: ");
                console.log(err);
                return;
            }

            console.log("Got the stock:");
            console.log(data);

        });

    });

```
<br/>

Here's an example with nested Deferreds, showing isolation of error/success logic:

```
    //fluent, but still nested
    console.log("Getting the stocks..");
    $.when(stocks.deferified.getStocks())
            .then(function(data) {
                $.when(stocks.deferified.getStockDetail(_.first(data).symbol))
                        .then(function(data) {
                            console.log("Got the stock:");
                            console.log(data);
                        }).fail(function(err) {
                            console.log("An error occurred getting a stock detail");
                        })
            }).fail(function(err) {
                console.log("An error occurred fetching stocks");
            });

```
<br/>

And finally here's an example with Deferreds using a flat structure:

```
    //nicer example using .then() filter
    console.log("Getting the stocks..");
    var whenStepOneIsDone = stocks.deferified.getStocks();
    var whenStepTwoIsDone = whenStepOneIsDone.then(function (data) {
        return stocks.deferified.getStockDetail(_.first(data).symbol);
    });

    whenStepTwoIsDone.then(function(result) {
            console.log("Got the stock:");
            console.log(result);
        }).fail(function(err) {
            console.log("failed:");
            console.log(err);
        });
```
<br/>

### See a working example [here](http://mandarindrummond.com/examples/flow-control-deferreds/).





