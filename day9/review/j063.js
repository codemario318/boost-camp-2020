const stack = /\[/;
    const add = /,/;    
    const pop = /\]/;
    const spce = /\s/;
    
    //tokenizer
    tokenizer = function(str){  
        let counter = 0;
        let token = [];
        console.log(str);
        while (!!str){
            let tmp = 0;        
            if(spce.exec(str[0])){
                tmp = 1;
            }else if(stack.exec(str[0])){
                token.push(str[0]);     
                tmp = 1;
                counter++;                   
            }else if (pop.exec(str[0])){
                token.push(str[0]);  
                tmp = 1;
                counter--;      
            }else if(add.exec(str[0])){            
                tmp = 1;  
            }else if(pop.exec(str)&&add.exec(str)){
                if(pop.exec(str).index < add.exec(str).index){
                    token.push(str.slice(0, pop.exec(str).index));                        
                    tmp = pop.exec(str).index + 0;
                }else{
                    token.push(str.slice(0, add.exec(str).index));                        
                    tmp = add.exec(str).index + 0;
                }
            }else if(pop.exec(str)){
                token.push(str.slice(0, pop.exec(str).index));                    
                tmp = pop.exec(str).index + 1;
                counter--;
                token.push(str.slice(pop.exec(str).index, pop.exec(str).index + 1)); 
            }    
            if(counter<0){
                throw new Error("올바른 배열 형태가 아니네요");
            }                        
            str = str.slice(tmp,)        
        }    
        if(counter!=0){        
            throw new Error("배열이 제대로 닫히지 않았습니다!");                
        }   
        return token;        
    }
    
    //lexer
    lexer = function(token){
        const lexertoken = [];
        for(i of token){
            if(i === '['){
                lexertoken.push({type:"array", child:[]})
            }else if(/^'{1}.*'{1}$/.test(i)){
                lexertoken.push({ type : "string" , value : i, child : [] } )
            }else if(Number.isInteger(i*1)){
                lexertoken.push({ type : "number" , value : i, child : [] } )
            }else if(i === 'null'){
                lexertoken.push({ type : "NULL", value : i, child : [] } )            
            }else if(i === ']'){
                lexertoken.push({ type : "arrayEnd" , value : i, child : [] } )
            }else{
                throw new Error("받을 수 없는 형식입니다.");
            }
        }
        return lexertoken;
    }
    
    
    //parser
    function parser(lexer){
    
        const result = {type:'array', child:[]};
        const stack = [];
        for (i of lexer){
            //array type이면 array만 push
            if(i.type === "array") {
                stack.push(i);
                //console.log(`array할때의 값들 ${stack}`);
            }
            if(i.type === "number" || i.type === "string" || i.type === "NULL"){
                stack[stack.length-1].child.push(i);
            }
    
            if(i.type === "arrayEnd"){
                const currentStack = stack.pop();   //괄호 닫을때 해당 깊이 child에 전부 넣어주기위한 대기소
                const stackLength = stack.length;   //현재 깊이를 알기위해 최대 길이를 측정.
                if(stackLength === 0) result.child.push(currentStack)   //마지막 괄호닫기
                else stack[stack.length-1].child.push(currentStack);    //괄호를 닫으면 해당 깊이에 current를 전부 넣어줘서 마무리
            }
        }
        return result;
    }
    
    try {    
        const str1 = "[1,[2,[3]],'hello','world',null]";            //기본에제
        const str2 = "[[1,[2,[3],'hello']]";                        //틀린예제    
        const str3 = "[1, [2,[3,[4,[5]]]],'hello', 'world', null]"; //옳은에제
        const str4 = "['1a'3',[22,23,[11,[112233],112],55],33]";
    
        const result = tokenizer(str4);
        
        const lexResult = lexer(result);
        
        const resultTree = parser(lexResult);
    
        console.log(JSON.stringify(resultTree,null,3));
    
    }catch(err){
        console.log("ERROR : ", err.meesage);
    }