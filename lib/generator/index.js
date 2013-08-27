var generateSiteFlow = require("./flows/generate-site"),
    generateCssFlow = require("./flows/generate-css"),
    defaultBaseDir = __dirname + "/../../";


function runFlowWithLogging(baseDir, flow) {


    var execution = flow
        .context({"baseDir" : baseDir})
        .onFailure().handleWith(function(err) {
            console.warn("Flow failed: " + err);
        })
        .create();

    execution.on('step-succeeded', function(stepName) {
        console.log("step " + stepName + " succeeded...");
    });

    return execution.execute();

}

exports.generateMarkdown = function(baseDir) {


    baseDir = baseDir ? baseDir : defaultBaseDir;

    return runFlowWithLogging(baseDir,
        generateSiteFlow
            .skip("copy-assets"));

};

exports.generateCss = function(baseDir) {

    baseDir = baseDir ? baseDir : defaultBaseDir;

    return runFlowWithLogging(baseDir, generateCssFlow);

};


exports.generate = function(baseDir) {

    baseDir = baseDir ? baseDir : defaultBaseDir;

    return runFlowWithLogging(baseDir, generateSiteFlow);

};