const { ArrParser, Tokenizer } = require('./ArrParser');
const trueCase = [
    "[1, [2,[3]],'hello', 'world', null,'hello,world']",
    "[11234]",
    "[2,[3],]",
    "['hello,', '[world]']",
    "['null']",
];
const falseCase = [
    "[hihi,]]",
    "[['asdf']",
    "['a'][['b']",
    "['a']['b'",
];

const tokenizerRes = [
    ['[', 1, '[', 2, '[', 3, ']', ']', 'hello', 'world', null, 'hello,world', ']'],
    ['[', 11234, ']'],
    ['[', 2, '[', 3, ']', ']'],
    ['[', 'hello,', '[world]', ']'],
    ['[', 'null', ']']
]

test("Tokenizer Test", () => {
    trueCase.forEach((str, i) => {
        expect(Tokenizer(str)).toEqual(tokenizerRes[i]);
    });
})

test("ArrParser 'true' case test", () => {
    trueCase.forEach((v) => ArrParser(Tokenizer(v)));
    expect();
})

test("ArrParser 'false' case test", () => {
    falseCase.forEach((v) => {
        expect(() => {
            ArrParser(Tokenizer(v))
        }).toThrow();
    });
})
