    <script type="text/javascript">

        var mainPath = "app/main" + (window.location.host.indexOf("localhost") > -1 ? "" : ".built");
        var require = {
            baseUrl : "/scripts",
            shim : {},
            paths : {
                "jquery" : "vendor/jquery/jquery.min",
                "backbone" : "vendor/backbone-amd/backbone",
                "mocha" : "vendor/mocha/mocha",
                "expect" : "vendor/expect/expect",
                "sinon" : "vendor/sinon/sinon",
                "mustache" : "vendor/mustache/mustache",
                "underscore" : "vendor/underscore-amd/underscore",
                "json" : "vendor/requirejs-plugins/src/json",
                "text" : "vendor/requirejs-text/text",
                "app/main" : mainPath
            }

        };

    </script>

    <script type="text/javascript" src="/scripts/vendor/requirejs/require.js"></script>

