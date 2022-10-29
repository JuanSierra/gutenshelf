const GUTENDEX_URL = 'https://gutendex.com/books?search=';
const fetch = require('node-fetch');
const Task = require('../task');

class ApiTask extends Task {
    constructor(text){
        super("Call API");
    }

    async body(ctx){
        ctx.books = await this.callApi(ctx.author);
    }

    async callApi(author){
        const url = GUTENDEX_URL + author;
        const res = await fetch(url);
        const json = await res.json();
        
        return json;
    }
}

module.exports = new ApiTask();