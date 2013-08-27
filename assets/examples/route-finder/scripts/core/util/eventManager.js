

define(["jquery"], function($) {

    return function(context) {

        if (!context || (!context.selector && !context.$el)) {
            throw "Event manager requires a context object. Please pass a Backbone view or a jquery element object.";
        }
        var jqueryObj = context.$el ? context.$el : context,
            handle = jqueryObj.hasClass('deckardApp') ? jqueryObj : jqueryObj.parents(".deckardApp");

        this.trigger = function(eventName, eventArgs) {
            return handle.trigger(eventName, eventArgs);

        };

        this.bind = function(eventName, eventHandler) {
            return handle.bind(eventName, eventHandler);

        };
    };
});
