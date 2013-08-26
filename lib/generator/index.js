var generateSiteFlow = require("./flows/generate-site");

exports.generate = function(baseDir) {

    baseDir = baseDir ? baseDir : __dirname + "/../../";

    return generateSiteFlow
        .context({"baseDir" : baseDir})
        .onFailure().handleWith(function(err) {
            console.warn("Site generation failed: " + err);
        })
        .begin();

};

//Read all articles (markdown)

//Generate json with identifier (based on article dir) mapping to markdown file location, date created