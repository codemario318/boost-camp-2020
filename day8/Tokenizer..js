const Tokenizer = require('./Tokenizer');
const strs = [
    "[1, [2,[3]],'hello', 'world', null,'hello,world']",
    "[11234]",
    "[2,[3],]",
    "['hello,', '[world]']",
    "['null']",
    "[hihi,]]"
];
const res = [
    ['1',],
] ;
let testRes;

beforeEach(() => {
    testRes = strs.map((str) => Tokenizer(str));
    console.log(testRes);
})

test("Tokenizer test",() => {
    expect(0).toBe(0)
})


strs.forEach((v) => console.dir(ArrParser(Tokenizer(v)),{depth:null}));