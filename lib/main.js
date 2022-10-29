const taskz = require("taskz");
const kleur = require('kleur');

var ApiTask = require('./tasks/apiTask');
var TransformTask = require('./tasks/transformTask');
var SaveFileTask = require('./tasks/saveFileTask');
var GenerateSiteTask = require('./tasks/generateSiteTask');

function runProcess(author){
  processTasks.run( {author:author} );
}

const processTasks =
	taskz([
    {
      text: ApiTask.text,
      task: async (ctx) => { await ApiTask.call(ctx) }
    },
    {
      text: TransformTask.text,
      task: async (ctx) => { await TransformTask.call(ctx) },
      stopOnError: true,
    },
    {
      text: SaveFileTask.text,
      task: async (ctx) => { await SaveFileTask.call(ctx) }
    },
    {
      text: GenerateSiteTask.text,
      task: async () => { await GenerateSiteTask.call() }
    }
]);

module.exports = {
  runProcess
};