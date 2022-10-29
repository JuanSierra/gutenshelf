class Task {
    constructor(text) {
      this._text = text || "Unnamed task";
    }

    get text() {
        return this._text;
    }

    set text(val) {
        this._text = val;
    }

    async call(ctx) {
        await this.body(ctx);
    }

    async body(ctx){
        throw new Error('Unimplemented!');
    }
}

module.exports = Task;