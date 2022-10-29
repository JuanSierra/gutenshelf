const Task = require('../task');
const Eleventy = require("@11ty/eleventy");
const http = require('http');
const open = require("open");
const Static = require('node-static');

class GenerateSiteTask extends Task {
    constructor(text){
        super("Generate site");
    }

    async body(){
        (async function() {
            let elev = new Eleventy();
            await elev.write();
        })();

        var file = new(Static.Server)("./_site");

        http.createServer(function (req, res) {
            file.serve(req, res);
          }).listen(8080);
        
          open("http://localhost:8080");
    }
}

module.exports = new GenerateSiteTask();