({
    inlineText: true,
    name : "app/main",
    out : "main.built.js",
    baseUrl : "../../scripts",
    shim : {
        "jquery-scrollspy" : {
            deps : ['jquery']
        },
        "chai" : {
            "exports" : "chai"
        },
        "sinon" : {
            "exports" : "sinon"
        },
        "sebastian-tests" : {
            deps : ['mocha']
        },
        "mocha" : {
            "exports" : "mocha",
            "init" : function() {
                mocha.setup("bdd");
            }
        }
    },
    paths: {
                "jquery" : "vendor/jquery/jquery.min",
                "backbone" : "vendor/backbone-amd/backbone",
                "mocha" : "vendor/mocha/mocha",
                "expect" : "vendor/expect/expect",
                "sinon" : "vendor/sinon/sinon",
                "underscore" : "vendor/underscore-amd/underscore",
                "text" : "vendor/requirejs-text/text"
            }
})