var generateSiteFlow = require("./flows/generate-site");

exports.generate = function(baseDir) {

    baseDir = baseDir ? baseDir : __dirname + "/../../";

    var execution = generateSiteFlow
        .context({"baseDir" : baseDir})
        .onFailure().handleWith(function(err) {
            console.warn("Site generation failed: " + err);
        })
        .create();

    execution.on('step-succeeded', function(stepName) {
        console.log("step " + stepName + " succeeded...");
    });

    return execution.execute();

};