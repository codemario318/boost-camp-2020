const { getTestData } = require('./video_file'),
    videoEditor = require('./video_editor');
readline = require('readline'),
    videos = getTestData(13, 1, 15);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

videoEditor.files = videos;

rl.setPrompt('> ');
rl.prompt();
rl.on('line', (input) => {
    if (input === 'quit') rl.close();
    const cmd = input.split(' ');

    videoEditor.readCmd(cmd);
    rl.prompt();
})
rl.on('close', () => {
    process.exit();
});