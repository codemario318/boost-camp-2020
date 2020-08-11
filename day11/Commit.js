const File = require('./File');

class Commit extends File {
    constructor(name, msg) {
        super(name);
        this.log = msg;
        this.state = 'Commit';
    }
    getLog = () => `${this.state} "${this.log}"\n${this.name} ${this.lastTime}`
}

module.exports = Commit;
