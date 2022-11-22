const Task = require('../task');

class TransformTask extends Task {
    constructor(text){
        super(text || "Transform data");
    }

    async body(ctx){
        var data = ctx.books.results;
        
        if (data.length > 0 ){
            var books = data.map((book) => 
            {
                return {
                    id: book.id,
                    title: book.title,
                    author: book.authors[0],
                    topics: book.bookshelves,
                    cover: book.formats["image/jpeg"]
                };
            });
            
            ctx.books = books;
        } else {
            ctx.books = null;
            
            throw new Error("Empty result");
        }
    }
}

module.exports = TransformTask;