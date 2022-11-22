const taskz = require("taskz");
const kleur = require('kleur');

var ApiTask = new (require('./tasks/apiTask'));
var TransformTask = new (require('./tasks/transformTask'));
var SaveFileTask = new (require('./tasks/saveFileTask'));
var GenerateSiteTask = new (require('./tasks/generateSiteTask'));

function search(term, topic, options){
  processTasks.run( {term: term, topic: topic, options: options} );
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
      task: async (ctx) => { await GenerateSiteTask.call(ctx) }
    }
]);

module.exports = {
  search
};