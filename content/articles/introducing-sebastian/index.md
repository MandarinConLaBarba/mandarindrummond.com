title: Sebastian - Simple Flow Control
date: 2013-02-15 8:31

Over the last few days I've been working on a new flow control library called
**[Sebastian](https://github.com/MandarinConLaBarba/sebastian)** that builds on jQuery's awesome
[Deferred API](http://api.jquery.com/category/deferred-object/). With jQuery 1.8 Deferred.then changed
from a simple callback attachment mechanism to a filtering mechanism. This simple change was a great one as it allows
the developer to flatten previously painful nested structures.

###A quick review

Consider a nested Deferred structure:

```

var stepOne = function() {

        //some async call (returns a promise or Deferred)

    },
    stepTwo = function() {

        //some async call (returns a promise or Deferred)

    };

$.when(stepOne())
    .then(function() {

        $.when(stepTwo())
            .then(function() {

                //do something

            })
            .fail(function() {

                //error

            });

    }).fail(function() {

        //error

    });

```
<br/>
This can now be written as:

```
var promise = $.when(stepOne()),

filtered = promise.then(stepTwo());

filtered.then(function() {

    //do something..

});

promise.fail(function() {

    //error

});

```
<br/>
This is much better, but when you do several of these in a row, say you filter a three or more times, you have code that
becomes difficult to test.

Tests for the above code might look like:

```
        describe("someMethod", function(){


            describe("stepOne function", function() {

                it("should do something...", function() {

                    //assert

                });

            });

            describe("stepTwo function", function() {

                it("should do something...", function() {

                    //assert

                });

            });

            it("should call stepOne", function() {

                //assert

            });

            describe("when stepOne fails", function() {

                it("should render the error message", function() {

                    //assert

                });

            });

            describe("when stepOne succeeds", function() {

                it("should call stepTwo", function() {

                    //assert

                });

                describe("when stepTwo fails", function() {

                    it("should render the error message", function() {

                        //assert

                    });

                });

            });

        });

```
<br/>
This can quickly get out of hand...there are things you can do to isolate code for testing, but those often get messy
and leave developers to their own devices.

###Enter Sebastian

Sebastian aims to address the process of defining flows like the examples above, but with a little bit of structure so
that individual chunks of application logic are isolated and independent of one another. With Sebastian, you can define
application logic using a simple API, and then easily retrieve discrete pieces of logic for unit testing.

Here's the above example using Sebastian:

```
    var deferred =
        flow("my.namespace.flow")
            .step("one", function() {

                 //some async call (returns a promise or Deferred)

            })
            .step("two", function() {

                //some async call (returns a promise or Deferred)

            })
            .begin();

    $.when(deferred)
        .fail(function() {

            //error

        });

```
<br/>
And now when you want to test:

```
    describe("my.namespace.flow", function() {

        beforeEach(function() {

            this.flow = flow("my.namespace.flow");

        });

        describe("step one", function() {

            it("should do something...", function() {

                var step = this.flow.step("one").callback;

                var result = step();

                //assert

            });

        });

        describe("step two", function() {

            it("should do something...", function() {

                var step = this.flow.step("one").callback;

                var result = step();

                //assert

            });
        });
    });

```
<br/>
What I find useful here is that I no longer need to write tests around whether steps succeed or fail. I can write tests
against one step at a time, without regard for upstream or downstream logic.

###More

Sebastian also allows you to skip one or more steps in a flow:

```

    flow("my.namespace.flow")
        .skip("one")
        .skip("two")
        .begin();

```
<br/>
You can also delegate flow to another flow conditionally:

```
    //jump to a flow if any failure occurs in any steps
    flow("my.namespace.flow")
        .onFailure()
        .jumpTo("my.namespace.someOtherFlow")
        .begin();

    //jump to a flow if any step returns a rejected deferred with response "someErrorCode"
    flow("my.namespace.flow")
        .onFailure("someErrorCode")
        .jumpTo("my.namespace.someOtherFlow")
        .begin();

```
<br/>
And there's more, but I won't go into the nitty-gritty here.

###How to install

NPM:

```
npm install sebastian

```
<br/>

Or with Bower:

```
bower install sebastian

```
<br/>

That's enough for today. For more info on Sebastian, **[check it out on GitHub](https://github.com/MandarinConLaBarba/sebastian)**.