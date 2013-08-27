

define([
    "jquery",
    "leaflet",
    "core/views/baseEventHandler"
], function(
    $,
    leaflet,
    baseEventHandler
    ) {

    var theView = leaflet.Control.extend(baseEventHandler);

    return theView;

});