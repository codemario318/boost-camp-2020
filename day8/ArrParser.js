const separator = new Set(["[", "]"]);
const strSeparator = new Set(['\'', '\"', '\`']);

const ArrParser = (words) => {
    const tree = [];
    const inputError = new Error("입력 형식 에러");
    let brkNum = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (word === ']') {
            const child = [];
            let cur = tree.pop();

            while (cur !== '[') {
                if (tree.length == 0) throw inputError;
                child.push(cur);
                cur = tree.pop();
            }

            tree.push(toArrToken(child));
            brkNum--;
        } else if (word === '[') {
            tree.push(word);
            brkNum++;
        }
        else tree.push(toToken(word));

    }
    if (brkNum !== 0) throw inputError;
    return tree;
}

const toToken = (word) => {
    const token = { 'type': typeOf(word), 'value': word };
    return token;
};

const toArrToken = (child) => {
    const token = { 'type': 'Array', 'child': child };
    return token;
};

const typeOf = (word) => {
    if (word === null) return "NULL";
    else if (Number.isInteger(word)) return 'Number';
    else return 'String';
};

const Tokenizer = (str) => {
    const toVal = (token) => {
        if (token === 'null') return null;
        else if (token === '') return undefined;
        else return Number(token);
    }

    const text = str.replace(/(\s*)/g, "");
    const tokens = [];
    let temp = [];

    for (const char of text) {
        if (strSeparator.has(temp[0])) {
            if (temp[0] == char) {
                tokens.push(temp.slice(1).join(''));
                temp = [];
            }
            else temp.push(char);
        } else {
            if (char === ',') {
                tokens.push(toVal(temp.join('')));
                temp = [];
            } else if (separator.has(char)) {
                tokens.push(toVal(temp.join('')));
                tokens.push(char);
                temp = [];
            } else temp.push(char);
        }
    }

    return tokens.filter((c) => c !== undefined);
};

module.exports = {
    Tokenizer,
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
    '[[[[[]]]]]',
];

strs.forEach(str => {
    try {
        console.dir(ArrParser(Tokenizer(str)), { depth: null });
    } catch (e) {
        console.error(e.message);
    }
})