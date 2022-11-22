const GUTENDEX_URL = 'https://gutendex.com/books?';
const fetch = require('node-fetch');
const Task = require('../task');

class ApiTask extends Task {
    constructor(text){
        super(text || "Call API");
    }

    async body(ctx){
        ctx.books = await this.callApi(ctx.term);
    }

    async callApi(term){
        const url = `${GUTENDEX_URL}search=${term}`;
        const res = await fetch(url);
        const json = await res.json();
        
        return json;
    }
}

module.exports = ApiTask;