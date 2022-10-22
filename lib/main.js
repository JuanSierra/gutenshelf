const taskz = require("taskz");
const kleur = require('kleur')
const fetch = require('node-fetch');
const fs = require('fs');
const Eleventy = require("@11ty/eleventy");
const GUTENDEX_URL = 'https://gutendex.com/books?search=';
const DATA_DIR = '_data';
const static = require('node-static');
const http = require('http');
const open = require("open");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callApi(author){
	  const url = GUTENDEX_URL + author;
	  const res = await fetch(url);
	  const json = await res.json();
	  //console.log( json);
      return json;
}

function runTasks(){
	tasks.run();
}

function runProcess(author){
	processTasks.run({author:author});
}

const processTasks =
	taskz([
	{
		text: "Call API",
		task: async (ctx, setText) => {
			ctx.books = await callApi(ctx.author);
		}
	},
	{
		text: "Transform data",
		task: async (ctx, setText) => {
			var data = ctx.books.results;
			
			if (data.length > 0 ){
				var books = data.map((book) => 
				{
					return {
						id: book.id,
						title: book.title,
						author: book.authors[0],
						topics: book.bookshelves,
					cover: book.formats["image/jpeg"]};
				});
				
				ctx.books = books;
			} else {
				ctx.books = null;
			}
		}
    },
	{
		text: "Save file",
		task: async (ctx, setText) => {
            if(!fs.existsSync(DATA_DIR)){
                fs.mkdirSync(DATA_DIR)
            }

			if(ctx.books){
				fs.writeFile('_data/books.json', JSON.stringify(ctx.books), function (err,data) {
				  if (err) {
					return console.log(err);
				  }
				  //console.log(data);
				});
			}
		}
	},
	{
		text: "Generate site",
		task: async (ctx, setText) => {
			(async function() {
			    let elev = new Eleventy();
				await elev.write();
			})();
		}
	},
    {
		text: "Serve site",
		task: async (ctx, setText) => {
            var file = new(static.Server)("./_site");

            http.createServer(function (req, res) {
                file.serve(req, res);
              }).listen(8080);
            
              open("http://localhost:8080");
		}
	}
]);

const tasks = taskz([
  {
    text: "first task",
    task: async () => {
      await sleep(2000);
    }
  },
  {
    text: "this task will fail and continue",
    task: async () => {
      await sleep(2500);
      throw new Error("this task failed");
    }
  },
  {
    text: "start running sub tasks",
    tasks: taskz([
      {
        text: "my subtask 1",
        task: async () => {
          await sleep(1000);
        }
      },
      {
        text: "",
        task: async (ctx, setText) => {
          const frames = ["cyan", "red", "magenta"];
          for (let i in frames) {
            const colour = frames[i]

            setText(kleur[colour](`my subtask 2 now in ${colour}`));
            await sleep(750);
          }
          setText("my subtask 2 done");
        }
      }
    ])
  },
  {
    text: "this task will fail and stop",
    stopOnError: true,
    task: async () => {
      await sleep(2500);
      throw new Error("this task failed and stopped the whole process");
    }
  },
  {
    text: "this one will never be displayed",
    task: async () => {
      await sleep(2000);
    }
  }
]);

//tasks.run();
module.exports = {
  //callApi,
  runTasks,
  runProcess
};