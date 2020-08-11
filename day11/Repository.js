const File = require('./File');
const Commit = require("./Commit");

class Repository {
    constructor(name) {
        this.repoName = name;
        this.workingDir = new Map();
        this.stagingArea = new Map();
        this.gitDir = new Map();
        this.logs = [];
    }

    getRepoInfo = () => `${this._workingDirInfo()}${this._stagingAreaInfo()}${this._commitFilesInfo()}`;
    _workingDirInfo = () => this._makeInfo('Working Directory', this.workingDir);
    _stagingAreaInfo = () => this._makeInfo('Staging Area', this.stagingArea);
    _commitFilesInfo = () => this._makeInfo('Commit Files', this.gitDir);
    _makeInfo = (title, map) => `---${title}/\n` + Array(...map.values()).reduce((prev, cur) => `${prev}${cur.getInfo()}\n`, '');

    newFile = (name) => {
        if (this.workingDir.has(name)) return false
        const file = new File(name);
        this.workingDir.set(name, file);
        return true;
    }

    updateFile = (name) => {
        if (!this.workingDir.has(name)) return false;
        this.workingDir.get(name).update();
        return true;
    }

    addFile = (name) => {
        if (!this.workingDir.has(name)) return false;
        const file = this.workingDir.get(name);
        file.add();
        this.stagingArea.set(name, file);
        this.workingDir.delete(name);
        this.newFile(name);
        console.log(this._stagingAreaInfo());
        return true;
    }

    commitFile = (msg) => {
        if (this.stagingArea.size === 0) return false;
        Array(...this.stagingArea.keys()).forEach((name, _) => {
            console.log(name);
            const commitLog = new Commit(name, msg);
            this.workingDir.get(name).commit();
            this.gitDir.set(name, commitLog);
            this.logs.unshift(commitLog.getLog());
            this.stagingArea.delete(name);
        })
        console.log(this._commitFilesInfo());
        return true;
    }

    getLogs = () => this.logs.join('\n');
}
module.exports = Repository;