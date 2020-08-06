// 짝수 검사
function check_bracket_available(str){
    try {
        return str.match(/\[/g).length === str.match(/\]/g).length ? true : false;
    } catch (error) {
        return false;
    }
}

function tokenizer(str){
    let tokenized = null;
    tokenized = str.replace(/\[/g, '[,');
    tokenized = tokenized.replace(/\]/g, ',]');
    tokenized = tokenized.replace(/ /g, '');
    return tokenized.split(',');
}

function lexer(tokenized){
    return tokenized.reduce((pre, value) => {
        let obj = {};
        switch(value){
            case '[':
                obj.type = 'LBracket';
                obj.value = value;
                break;
            case ']':
                obj.type = 'RBracket';
                obj.value = value;
                break;
            case 'null':
            case 'Null':
            case 'NULL':
                obj.type = 'NULL';
                obj.value = 'null';
                break;
            default:
                obj.type = typeof eval(value); // 예외처리
                obj.value = eval(value);
                break;
        }
        
        pre.push(obj)
        return pre
    }, []);
}
function parser(lexered){
    return recursive(lexered, 0)[0];
}

function recursive(lexered, idx){
    let arr = [];
    for(let i=idx; i < lexered.length; i++){
        // console.log(lexered[i]);
        let obj = {};
        switch(lexered[i].type){
            case 'LBracket':
                const sub_obj = recursive(lexered, i+1);
                
                obj.type='array';
                obj.child=sub_obj.sub_arr;
                arr.push(obj);
                i = sub_obj.curr_idx; // jump를 잘 해야 함
                break;
            case 'RBracket':
                return {sub_arr:arr, curr_idx:i};
                // break;
            default:
                obj.type = lexered[i].type;
                obj.value = lexered[i].value;
                obj.child = [];
                arr.push(obj);
                break;
        }
    }
    return arr;
}

function ArrayParser(str){
    let _type = ''
    
    if(!check_bracket_available(str)) return "ERROR : 올바른 배열 형태가 아닙니다.";
    
    const tokenized = tokenizer(str);
    const lexered = lexer(tokenized);
    const parsed = parser(lexered);
    return parsed;
}

// const str = '[1]';
// const str = '[1, 2, 3]';
// const str = "[1, [2,[3]],'hello', 'world', null]";
// const str = "[1, [2,3],'hello', ['world', null]]";
// const str = "[1, [[]], ['asd', [['QWE'], 'ㄱㄴㄷ'], '가나다'], [['가123']], null]";

// const str = "[[1,[2,[3],'hello']]"; // 올바른 배열 형태가 아님
// const str = "1"; // 올바른 배열 형태가 아님
// const str = "[1"; // 올바른 배열 형태가 아님

const result = ArrayParser("[[1,[2,[3],'hello']] "); 
console.dir(result, { depth: null });