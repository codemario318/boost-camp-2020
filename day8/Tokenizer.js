const separator = new Set(["[","]"]);
const strSeparator = new Set(['\'','\"','\`']);

const Tokenizer = (str) => {
    const toVal = (token) => {
        if (token === 'null') return null;
        else if (token === '') return undefined;
        else return Number(token);
    }

    const text = str.replace( /(\s*)/g, "");
    const tokens = [];
    let temp = [];

    for (const char of text) {
        if(strSeparator.has(temp[0])) {
            if (temp[0] == char) {
                tokens.push(temp.slice(1).join(''));
                temp = [];
            }
            else temp.push(char);
        } else {
            if(char === ',') {
                tokens.push(toVal(temp.join('')));
                temp = [];
            } else if(separator.has(char)) {
                tokens.push(toVal(temp.join('')));
                tokens.push(char);
                temp = [];
            } else temp.push(char);
        }
    }

    return tokens.filter((c) => c !== undefined);
};

module.exports = Tokenizer;

console.log(`''''""""`);