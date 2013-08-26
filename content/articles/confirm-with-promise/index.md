title: Reusable Confirmations w/ Promises
date: 2013-01-27 7:31

Often in web apps we're asked to create UI functionality that requires confirmation from the user. This confirmation
functionality is often the same except for two things:

* The question you're asking
* What you do once the user has answered the question

This is a nice opportunity to leverage some reusable code. In this post, I'll demonstrate how to create a re-usable
component for user confirmations with the following stack:

* Backbone (For presentation, no models in this demo)
* RequireJS (AMD API)
* Q (Promise API, just to try something other than jQuery Deferred)

To **skip to a working example, click [here](http://mandarindrummond.com/examples/confirmations-with-promise/)**.

So the gist of it is you just want to use Promises to let the caller know when the confirm has been resolved/rejected.
Consider a simple view that presents the user w/ a confirmation screen, and then either resolves or rejects a Deferred
based on the outcome. The confirm control cares not what happens beyond this point, as its only concern is to let callers
know whether the request was confirmed (resolved) or cancelled (rejected).

```
define([
    "jquery",
    "backbone",
    "underscore",
    "q",
    "text!templates/confirm.html"], function(
    $,
    Backbone,
    _,
    Q,
    template) {

    return Backbone.View.extend({

        template :_.template(template),

        initialize : function() {},

        events : {
            "click .cancelButton" : "cancel",
            "click .confirmButton" : "confirm"
        },

        render : function() {

            var templateData = {
                message : this.options.message
            };


            this.$el.show()
                .empty()
                .append(this.template(templateData));

            //Here's perhaps the most important part! The render() method returns a Deferred.
            this.deferred = Q.defer();

            return this.deferred;

        },

        //Then if the user cancels the request, the deferred is rejected
        cancel : function() {

            this.$el.hide();
            this.deferred.reject();

        },

        //If the user confirms the request, the deferred is resolved
        confirm : function() {

            this.$el.hide();
            this.deferred.resolve();

        }


    });

});```


Now take a look at the caller - in this case a simple app View:

```
define([
    "jquery",
    "backbone",
    "underscore",
    "q",
    "views/confirm",
    "text!templates/app.html"], function(
    $,
    Backbone,
    _,
    Q,
    ConfirmView,
    template) {

    return Backbone.View.extend({

        template :_.template(template),

        initialize : function() {

        },

        events : {
            "click #btnDelete" : "removeSomething",
            "click #btnSave" : "saveSomething"
        },

        render : function() {

            this.$el.append(this.template());

            this.subViews = {
                confirm : new ConfirmView({
                    el : this.$el.find('#confirmContainer')
                })
            };


        },

        //When the user clicks the remove button..
        removeSomething : function() {

            //Set a custom message for our Confirm View
            this.subViews.confirm.options.message = "Are you sure you want to remove it?";

            //This is necessary so we can reference this view object within the promise callback scope
            var self = this;

            //Add callbacks to handle resolve/reject conditions
            Q.when(this.subViews.confirm.render().promise)
                .then(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user wants to remove it!");
                }).fail(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user doesn't want to remove it!");
                });

        },

        //When the user clicks the save button..
        saveSomething : function() {

            //Set a custom message for our Confirm View
            this.subViews.confirm.options.message = "Are you sure you want to save it?";

            //This is necessary so we can reference this view object within the promise callback scope
            var self = this;

            //Add callbacks to handle resolve/reject conditions
            Q.when(this.subViews.confirm.render().promise)
                .then(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user wants to save it!");
                }).fail(function() {
                    self.$el.find('#confirmResult')
                        .empty()
                        .append("The user doesn't want to save it!");
                });


        }

    });

});
```
<br/>

And that's pretty much it. Now you have a confirm view you can use anywhere you'd like to make the user is certain about
what they're about to do.

### See a working example [here](http://mandarindrummond.com/examples/confirmations-with-promise/).

