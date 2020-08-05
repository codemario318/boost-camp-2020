const { ArrParser, Tokenizer, Lexer } = require('./ArrParser');
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
    "[[1,[2,[3],'hello']]",
];

const tokenizerRes = [
    ['[', '1', '[', '2', '[', '3', ']', ']', "'hello'", "'world'", 'null', "'hello,world'", ']'],
    ['[', '11234', ']'],
    ['[', '2', '[', '3', ']', ']'],
    ['[', "'hello,'", "'[world]'", ']'],
    ['[', "'null'", ']']
]

// const LexerRes = [
//     ['[', 1, '[', 2, '[', 3, ']', ']', 'hello', 'world', null, 'hello,world', ']'],
//     ['[', 11234, ']'],
//     ['[', 2, '[', 3, ']', ']'],
//     ['[', 'hello,', '[world]', ']'],
//     ['[', 'null', ']']
// ]

test("Tokenizer Test", () => {
    trueCase.forEach((str, i) => {
        expect(Tokenizer(str)).toEqual(tokenizerRes[i]);
    });
})

test("Lexer test", () => {
    trueCase.forEach((str,i) => {
        expect().toEqual();
        console.log(Lexer(Tokenizer(str)));
    })
})

test("ArrParser 'true' case test", () => {
    trueCase.forEach((v) => ArrParser(Lexer(Tokenizer(v))));
    expect();
})

test("ArrParser 'false' case test", () => {
    falseCase.forEach((v) => {
        expect(() => {
            ArrParser(Lexer(Tokenizer(v)));
        }).toThrow();
    });
})
