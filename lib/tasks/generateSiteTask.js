const Task = require('../task');
const Eleventy = require("@11ty/eleventy");
const Static = require('node-static');
const http = require('http');
const open = require("open");

class GenerateSiteTask extends Task {
    constructor(text){
        super(text || "Generate site");
    }

    async body(ctx){
        if(!ctx.options.noserve)
        {
            let port = ctx.options.port || 8080;

            (async function() {
                let elev = new Eleventy();
                await elev.write();
            })();

            var file = new(Static.Server)("./_site");

            http.createServer(function (req, res) {
                file.serve(req, res);
              }).listen(port);
            
            open(`http://localhost:${port}`);
        }
    }
}

module.exports = GenerateSiteTask;