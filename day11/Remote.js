const Repository = require('./Repository');
const File = require('./File');
const Local = require('./Local');

class Remote extends Local {
    push = (repo) => {
        const copiedRepo = this.copy(repo);
        this.repos.set(copiedRepo.repoName, copiedRepo);
    }

    copy(repo) {
        const newRepo = new Repository(repo.repoName);
        Array(...repo.workingDir.keys()).forEach((key) => {
            const file = repo.workingDir.get(key);
            const newfile = new File(file.name);
            newfile.lastTime = file.lastTime;
            newfile.state = file.state;
            newRepo.workingDir.set(newfile.name, newfile);
        })
        Array(...repo.stagingArea.keys()).forEach((key) => {
            const file = repo.stagingArea.get(key);
            const newfile = new File(file.name);
            newfile.lastTime = file.lastTime;
            newfile.state = file.state;
            newRepo.stagingArea.set(newfile.name, newfile);
        })
        Array(...repo.gitDir.keys()).forEach((key) => {
            const file = repo.gitDir.get(key);
            const newfile = new File(file.name);
            newfile.lastTime = file.lastTime;
            newfile.state = file.state;
            newRepo.stagingArea.set(newfile.name, newfile);
        })
        newRepo.logs = [...repo.logs];
        return newRepo;
    }
}

module.exports = Remote;
