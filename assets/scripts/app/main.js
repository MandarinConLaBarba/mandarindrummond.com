define([
    "jquery",
    "backbone",
    "app/views/app"], function(
    $,
    backbone,
    AppView) {

    new AppView({
        el : $('body')
    }).render();


});