
define([
    "jquery",
    "app/views/app"
], function(
    $,
    AppView) {


    var appView = new AppView({
        el : $('#appContainer')
    });

    appView.render();

});