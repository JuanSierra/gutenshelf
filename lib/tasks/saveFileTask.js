const DATA_DIR = '_data';
const Task = require('../task');
const fs = require('fs');

class SaveFileTask extends Task {
    constructor(text){
        super(text || "Save file");
    }

    async body(ctx){
        if(!fs.existsSync(DATA_DIR)){
            fs.mkdirSync(DATA_DIR)
        }

        if(ctx.books){
            fs.writeFile('_data/books.json', JSON.stringify(ctx.books), function (err,data) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    }
}

module.exports = SaveFileTask;