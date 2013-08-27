

define([
    "jquery",
    "core/util/eventManager"
], function(
    $,
    eventManager) {

    return {

        $el : $('.deckardApp'),

        broadcast : function(eventName, args) {
            new eventManager(this).trigger(eventName, args);
        },

        onBroadcast : function(eventName, handler) {
            new eventManager(this).bind(eventName, handler);
        }

    }

});