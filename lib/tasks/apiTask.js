const GUTENDEX_URL = 'https://gutendex.com/books?';
const fetch = require('node-fetch');
const Task = require('../task');

class ApiTask extends Task {
    constructor(text){
        super(text || "Call API");
    }

    async body(ctx){
        ctx.books = await this.callApi(ctx.term, ctx.topic);
    }

    async callApi(term, topic){
        let path = term != '' ? "search=" : "topic=";
        const url = `${GUTENDEX_URL}${path}${term || topic}`;
        const res = await fetch(url);
        const json = await res.json();
        
        return json;
    }
}

module.exports = ApiTask;