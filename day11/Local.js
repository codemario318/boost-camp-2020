const Repository = require('./Repository');

class Local {
    constructor() {
        this.repos = new Map();
    }

    setRepo(name) {
        if (name === undefined || this.repos.has(name)) return false;
        else {
            const repo = new Repository(name);
            this.repos.set(name, repo);
            return true;
        }
    }

    getRepo = (name) => this.repos.get(name);

    getLocalInfo() {
        return Array(...this.repos.keys()).reduce((prev, name) => `${prev}${name}/\n`, '');
    }

}

module.exports = Local;