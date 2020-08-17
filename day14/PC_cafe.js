const mysql = require('mysql2/promise');
const readline = require('readline');
const PCNum = 16;
const randUserQuery = `select id from USER_LOG ORDER BY RAND() LIMIT 20`;

const getRandUser = async (connection, query) => {
    let users;
    try {
        [users] = await connection.query(query);
    } catch (err) {
        console.error(new Error('random user error'));
    }
    return users;
}

const clearPc = async (connection) => {
    try {
        await connection.execute(`delete from pc`);
    } catch (err) {
        console.error(new Error('pc 초기화'));
    }

    for (let i = 1; i <= PCNum; i++) {
        await connection.execute('insert into pc(pc, userid) value(?, null)', [i]);
    }
}

const clearUser = async (connection) => {
    await connection.execute('delete from user');
}

const init = async (connection) => {
    await clearPc(connection);
    await clearUser(connection);
}

const printBoard = async (connection) => {
    await printPc(connection);
    await printUser(connection);
}

const printPc = async (connection) => {
    let pcList;
    try {
        [pcList] = await connection.query('select pc from pc where userid is null');
    } catch (err) {
        console.error(err);
    }
    console.log(`[ ${pcList.map(pc => pc.pc).join(', ')} ]`);
}

const printUser = async (connection) => {
    let userList;
    try {
        [userList] = await connection.query('select userid from pc where userid is not null');
    } catch (err) {
        console.error(err);
    }
    console.log(`이용중인 유저\n${userList.map(pc => pc.userid).join(', ')}`);
}

const getEmptyPc = async (connection) => {
    let pc;
    try {
        [[pc]] = await connection.query('select pc from pc where userid is null order by rand() limit 1');
    } catch (err) {
        console.error(new Error(err));
    }
    return pc;
}

const setNewUser = async (connection, user) => {
    try {
        await connection.execute('insert into user(id, start) value(?,?)', [user, getDBtime()]);
    } catch (err) {
        console.error(err);
    }
}

const setPcUser = async (connection, user, pc) => {
    try {
        await connection.execute('update pc set userid=? where pc=?', [user, pc]);
    } catch (err) {
        console.error(new Error('set PC error'));
    }
}

const getDBtime = () => (new Date()).toISOString().slice(0, 19).replace('T', ' ');

const setStopUser = async (connection, userId) => {
    let pc;
    try {
        [[pc]] = await connection.query('select pc from pc where userid=?', [userId]);
    } catch (e) {
        console.error(new Error(e));
    }
    if (pc === undefined) {
        console.log('사용중인 유저가 아닙니다.');
    } else {
        await connection.execute('update pc set userid=null where pc=?', [pc.pc]);
        await connection.execute('update user set end=? where id=?', [getDBtime(), userId])
        console.log(`${userId}님 이용해주셔서 감사합니다. ${pc.pc}번 자리가 비었습니다.`);
    }
}

const main = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'boostcamp',
        database: 'PC_CAFE_DB'
    });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt('> ');
    rl.prompt();

    await init(connection);
    await printBoard(connection);
    const users = await getRandUser(connection, randUserQuery);

    rl.on('line', async line => {
        const [cmd, arg] = line.split(' ');

        switch (cmd) {
            case 'quit':
                process.exit();
                break;

            case 'new':
                const newUser = users.shift().id;
                const emptyPc = await getEmptyPc(connection, newUser);

                if (emptyPc === undefined) console.log('빈자리 없음');
                else {
                    console.log(`${emptyPc.pc} 자리로 가세요! ${newUser}님`);
                    await setNewUser(connection, newUser);
                    await setPcUser(connection, newUser, emptyPc.pc);
                    await printBoard(connection);
                }
                break;

            case 'stop':
                await setStopUser(connection, parseInt(arg));
                await printBoard(connection);
                break;

            default:
                console.error('없는 명령');
        }
    })
}

main();