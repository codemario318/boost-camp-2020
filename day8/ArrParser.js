const separator = new Set(["[", "]"]);
const strSeparator = new Set(['\'', '\"', '\`']);

const ArrParser = (tokens) => {
    const tree = [];
    const inputError = new Error("입력 형식 에러");
    let brkNum = 0;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === ']') {
            const child = [];
            let cur = tree.pop();

            while (cur !== '[') {
                if (tree.length == 0) throw inputError;
                child.push(cur);
                cur = tree.pop();
            }

            tree.push(toArrToken(child));
            brkNum--;
        } else if (token === '[') {
            tree.push(token);
            brkNum++;
        }
        else tree.push(toToken(token));

    }
    if (brkNum !== 0) throw inputError;
    return tree;
}

const toArrToken = (child) => {
    const token = { 'type': 'Array', 'child': child };
    return token;
};

const Lexer = (words) => words.map((word) => (separator.has(word) ? word : toToken(word)));

const toToken = (word) => {
    const type = typeOf(word);
    const token = { 'type': type, value: (type === 'String') ? word.slice(1, word.length - 1) : word };
    return token;
};

const typeOf = (token) => {
    if (token === 'null') return "NULL";
    else if (strSeparator.has(token[0])) return 'String';
    else return 'Number';
};

const Tokenizer = (str) => {
    const text = str.replace(/(\s*)/g, "");
    const tokens = [];
    let temp = [];

    for (const char of text) {
        if (strSeparator.has(temp[0])) {
            if (temp[0] == char) {
                tokens.push(temp.join('') + char);
                temp = [];
            }
            else temp.push(char);
        } else {
            if (char === ',') {
                tokens.push(temp.join(''));
                temp = [];
            } else if (separator.has(char)) {
                tokens.push(temp.join(''));
                tokens.push(char);
                temp = [];
            } else temp.push(char);
        }
    }

    return tokens.filter((c) => c !== '');
};

module.exports = {
    Tokenizer,
    Lexer,
    ArrParser,
}

// test code!
const strs = [
    "[1, [2,[3]],'hello', 'world', null,'hello,world']",
    // "[11234]",
    // "[2,[3],]",
    // "['hello,', '[world]']",
    // "['null']",
    // "[hihi,]]",
    // "[['asdf']",
    // "['a'][['b']",
    // "['a']['b'",
    // "[][]",
    // '[[[[[]]]]]',
    "[[1,[2,[3],'hello']]",
];

strs.forEach(str => {
    try {
        console.dir( ArrParser(Lexer(Tokenizer(str))), { depth: null });
        // console.log(Lexer(Tokenizer(str)))
    } catch (e) {
        console.error(e.message);
    }
})
