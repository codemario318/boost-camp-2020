const readline = require('readline');
const Local = require('./Local');
const Remote = require('./Remote');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const setGitPrompt = (name) => rl.setPrompt(`${name}/> `);

const local = new Local();
const remote = new Remote();

let curRepo = '';
setGitPrompt(curRepo);

rl.prompt();
rl.on('line', (read) => {
    const input = read.split(' ');
    let res;
    if (input === 'quit') rl.close();

    switch (input[0]) {
        case 'init':
            res = local.setRepo(input[1]);

            if (res) console.log(`created ${input[1]} repository.`);
            else console.error('input error.');
            break;

        case 'status':
            if (input[1] === 'remote') {
                if (input[2] === undefined) console.error('저장소 미지정.');
                else {
                    res = remote.getRepo(input[2]);
                    res === undefined ? console.error('리모트에 존재하지 않는 저장소.') : console.log(res.getRepoInfo());
                }
            }
            else if (curRepo === '') {
                res = (input[1] === undefined) ? local.getLocalInfo() : local.getRepo(input[1]).getRepoInfo();

                if (res === undefined) console.error('존재하지 않는 저장소');
                else console.log(res);

            } else console.log(curRepo.getRepoInfo());
            break;

        case 'checkout':
            res = (input[1] === undefined) ? '' : local.getRepo(input[1]);

            if (res === undefined) console.error('존재하지 않는 저장소');
            else {
                curRepo = res;
                setGitPrompt(res === '' ? '' : res.repoName);
            }
            break;

        case 'new':
            if (curRepo === '') console.error('선택된 저장소 없음.');
            else if (input[1] === undefined) console.error('파일 이름 미입력.');
            else if (!curRepo.newFile(input[1])) console.error('파일이 이미 존재함.');
            break;

        case 'update':
            if (curRepo === '') console.error('선택된 저장소 없음.');
            else if (input[1] === undefined) console.error('파일 이름 미입력.');
            else if (!curRepo.updateFile(input[1])) console.error('같은 이름의 파일 없음.');
            break;

        case 'add':
            if (curRepo === '') console.error('선택된 저장소 없음.');
            else if (input[1] === undefined) console.error('파일 이름 미입력.');
            else if (!curRepo.addFile(input[1])) console.error('Working directory에 해당 파일 없음.');
            break;

        case 'commit':
            if (curRepo === '') console.error('선택된 저장소 없음.');
            else if (input[1] === undefined) console.error('커밋 메시지 미입력.');
            else if (!curRepo.commitFile(input.slice(1,).join(' '))) console.error('Staging Area 비었음.');
            break;

        case 'log':
            if (curRepo === '') console.error('선택된 저장소 없음.');
            console.log(curRepo.getLogs());
            break;

        case 'push':
            if (curRepo === '') console.error('선택된 저장소 없음.');
            remote.push(curRepo);
            break;

        default:
            console.error("존재하지 않는 명령.");
            break;
    }

    rl.prompt();
})
rl.on('close', () => {
    process.exit();
});