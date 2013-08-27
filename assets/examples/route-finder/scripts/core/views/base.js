

define([
    "jquery",
    "backbone",
    "core/views/baseEventHandler"
], function(
    $,
    Backbone,
    baseEventHandler) {

    var theView = Backbone.View.extend(baseEventHandler);

    return theView;

});