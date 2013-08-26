title: "RequireJS: Shim Configuration - You Must Require!"
date: 2013-01-23 6:26

[Shim configuration](http://requirejs.org/docs/api.html#config-shim) allows you to integrate your AMD code with traditional
non-AMD libraries like jQuery & Underscore. Now, James Burke has been good enough to publish AMD-friendly versions of
the underscore and others, but there are tons of libraries out there that are not AMD-ready. If you don't use any
non-AMD libraries that depend on other non-AMD libraries, you may not need shim config at all. Plenty will be glad to
refer to browser globals within [RequireJS](http://requirejs.org/docs/api.html) modules - but if you're trying
to do things consistently, you'll be happy to know that shim configuration allows you to treat your
favorite non-AMD modules as if they're just like everything else.

First you must define relationships in shim config, with the dependencies on the right side of shim object:

```
requirejs.config({
    "shim" : {
        "module-1": ["backbone"],
        "backbone" : ["jquery", "underscore"]
    }
});
```
<br/>
Next, load the main module. It's important to note **you must require** all of the modules you need. Shim config
defines relationships, but it does not load anything:

```
require([
    "core/amd/util/logger",
    "module-1",
    "backbone", //You still have to load backbone + dependencies, but don't have to worry about order!
    "jquery",
    "underscore"
], function(logger) {


    logger.log("Hello From Main Module!")

});

```

<br/>
And if you want to have a locally-scoped version of globally-scope libraries, you can use the exports property:


```
require.config({
    "shim" : {
        "jquery" : {
            "exports" : "$"
        }
    });

```

<br/>
Without this, if you try to provide an argument it will overwrite the local version:

```
require([
    "core/amd/util/logger",
    "module-1",
    "backbone", //You still have to load backbone + dependencies, but don't have to worry about order!
    "jquery",
    "underscore"
], function(logger, moduleOne, backbone, jquery, _) {


    //Without the 'exports' property, jquery will be undefined, and this will yield an error!
    $.('body').append("Hello From Main Module!")l

});
```
