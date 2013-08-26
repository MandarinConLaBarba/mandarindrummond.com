
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/generated'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var port = process.env.PORT ? process.env.PORT : 3020;
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);
