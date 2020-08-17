var mysql = require('mysql');
const words = [
    'remind', 'phenomenon', 'tune', 'meanwhile',
    'decorate', 'sculpture', 'import', 'take',
    'course', 'costume', 'stream', 'merge',
    'current', 'interaction', 'likewise', 'herdsman',
    'graze', 'cattle', 'crop', 'logger',
    'manufacture', 'timber', 'dump', 'toxic',
    'away', 'with', 'independently', 'maximize',
    'ultimately', 'renewable', 'yield', 'diminish',
    'vanish', 'trap', 'Medieval', 'stable',
    'urban', 'expel', 'altigether', 'barn',
    'English', 'despise', 'encyclopedia', 'adopt',
    'volume', 'physical', 'content', 'access',
    'subscription', 'extend', 'thus', 'transition',
    'prime', 'minister', 'aware', 'ingredient',
    'gaze', 'single', 'fraction', 'momentary',
    'regular', 'leak', 'minimize', 'revolving',
    'airtight', 'spin', 'state', 'anazing',
    'transformation', 'blossom', 'stem', 'shade',
    'container', 'bouquet', 'arrange', 'boarding',
    'reason', 'aircraft', 'reduce', 'fuel',
    'initially', 'intend', 'lasting', 'expand',
    'positive', 'carbon', 'dioxide', 'emission',
    'measure', 'output', 'official', 'mainly',
    'date', 'back', 'conference', 'transport',
    'vehicle', 'specialist', 'visible', 'once'
]
const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];

const startDay = new Date(2020,6,15,9,0,0,0).getTime();
const endDay = new Date(2020,7,16,8,59,59,999).getTime();

const randWord = () => words[randNum(0,99)];
const randNum = (min, max) => Math.round((Math.random() * (max - min)) + min);
const randStr = (n, arr) => Array(n).fill(0).map(c_=> arr[randNum(0,arr.length-1)]).join('');

const randDateTime = () => (new Date(randNum(startDay, endDay))).toISOString().slice(0, 19).replace('T', ' ');
const randNickname = () => `${randWord()}${randStr(3,alpha)}${randStr(4,numbers)}`;

const table = 'USER_LOG';

const insertQeury = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'boostcamp',
        database: 'PC_CAFE_DB',
        dateStrings: 'datetime'
    });
    
    connection.connect();
    for (let i = 0; i < 10000; i++) {
        connection.query(
            `INSERT INTO ${table} (nickname, money, last_visit) value ("${randNickname()}", ${randNum(1,1000)}, "${randDateTime()}")`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });
    }
    connection.end();
}

let counter = 0;

const timerQuery = () => setTimeout(() => {
    counter++;
    insertQeury();
    if (counter < 100) timerQuery();
    else console.log('finish');
    console.log(counter);
}, 1000);

timerQuery();
