const compose = (f, g, h) => x => h(g(f(x)));
const tokkenizer = function(string){
    // 기준으로 잡아야 하는 문자 '[' , ']' ','
    string = string.replace(/(\s*)/g,"");  // 공백 제거
    const array = [];
    let tokken = "";
    for(let i = 0; i < string.length; i++){
        if(string[i] == '[' || string[i] == ']' || string[i] == ',')
        {
            if(tokken != "") array.push(tokken);
            array.push(string[i]);
            tokken = "";
        }
        else tokken += string[i];
    }
    if(tokken != "") array.push(tokken);
    return array;
}
const lexer = function(array){
    for(let i = 0 ; i < array.length; i++){
        switch(array[i]){
            case '[':
                array[i] = {type : '[' , child : []};
            break;
            case ']':
                array[i] = {type : ']' , child : []};
            break;
            case ',':
                array[i] = {type : ',' , value : array[i], child : []};
            break;
            case 'null':
                array[i] = { type : null, value : null , child : []};
            break;
            default:
                let data = array[i].split('');
                if(data.every((num)=>".0123456789".indexOf(num) != -1))
                {
                    array[i] = {type : 'number' , value : array[i], child : []};
                }
                else {
                    if(array[i][0] == "'" && array[i][array[i].length- 1] == "'") 
                        array[i] = {type : 'string' , value : array[i], child : []};
                    else if(array[i][0] == '"' && array[i][array[i].length- 1] == '"') 
                        array[i] = {type : 'string' , value : array[i], child : []};
                    else throw new Error("문자열 형식의 오류")
                }
            break;
        }
    }
    return array.reverse().filter((value) => value.type != ',');
}
const parser = function(array){
    
    let result = [];
        while(array.length != 0){
            if(array[array.length - 1].type == '['){
                array.pop()
                data = array[array.length - 1];
                result.push((checkArray(array)));
                
            } 
            else if(array[array.length - 1].type == ']') throw new Error("배열이 열리지 않앗는데 닫힘")
            else{
                result.push(array[array.length - 1]);
                array.pop();
            }
        }
        return result;
    
    
}

const checkArray = function(array){
    if(array.length == 0) return false;
    let data;
    let type;
    const child={type : 'Array'};
    child.child = [];
    while(array.length != 0){
        type = array[array.length - 1].type;
        data = array[array.length - 1]
        array.pop();
        if(type == ']') return child;
        if(type == '[') child.child.push(checkArray(array));
        else{
            child.child.push(data);
        }
        if(array.length == 0) throw new Error("배열이 안닫힘");
    }
}
const ArrayParser = compose(tokkenizer, lexer, parser);
try{
    a= ArrayParser("[[1,[2,[3],'hello']]");
    // a= JSON.stringify(a, null ,4);
    console.dir(a,{depth:null});
}
catch(a){
    console.log(a.message);
}