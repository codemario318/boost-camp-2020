class HashTrie{

    constructor(){
        this.children = {};
        this.len = 0;
    }
    // 현재 Trie의 모든 key, value 값을 탐색한다.
    fullSearch(){
        let str = [];
        let node = this;
        function dfs(node){
            if(node.value != undefined){
                str.push(node.value.k);
                return;
            }
            for(let i in node.children){
                dfs(node.children[i]);
            }
        }
        dfs(this);
        return str;
    }
    // Trie에 key값을 삽입한다.
    insert(key, value){
        let node = this;
        for(let i = 0; i < key.length; i++){
            if(!(key[i] in node.children)){
                node.children[key[i]] = { children: {}, count: 0, value: undefined };
            }
            node.children[key[i]].count +=1;
            node = node.children[key[i]];
        }
        this.len +=1;
        node.value = {k: key, v: value};
    }
    // 해당 Key값이 존재하지 않는다면 True, 존재한다면 false를 리턴
    searchKey(key){
        let node = this;
        for(let i = 0; i < key.length; i++){
            if(node == undefined || !(key[i] in node.children)){
                return true;
            }
            node = node.children[key[i]];
        }
        return false;
    }
    //Trie에서 key값을 제거한다.
    keyRemove(key){
        let node = this; 
        this.len -=1;
        for(let i = 0; i < key.length; i++){
            node.children[key[i]].count -= 1;
            if(node.children[key[i]].count == 0){
                node.children[key[i]] = undefined;
                return;
            }
            node = node.children[key[i]];
        }
    }
    // Trie에서 key값을 찾는다.
    FindValue(key){
        let node = this;
        for(let i = 0; i < key.length; i++){
            node = node.children[key[i]];
        }
        return node.value.v;
    }
    
}

class HashMap{

    constructor(modeValue = 1e9 + 7){
        this.arr = new Array();
        this.mod = modeValue;
        this.len = 0;
    }

    // MOD 연산
    excutemod(key){
        if(key >= 0)return key % this.mod;
        return (((-key)/ this.mod + 1) * this.mod + key) % this.mod;
    }

    // 해시값 구현
    getHashKey(key){
        let hashKey = 0;
        let power = 1;
        for(let i = 0; i < key.length; i++){
            let value = key.charCodeAt(i);
            hashKey = this.excutemod(hashKey + value * power);
            power *= 2;
        }
        return hashKey;
    }

    clear(){
        this.arr = new Array();
        this.len = 0;
    }

    contains(key){
        let hashCode = this.getHashKey(key);
        if(this.arr[hashCode] != undefined && !this.arr[hashCode].searchKey(key))return true;
        else return false;
    }

    getValue(key){
        let hashCode = this.getHashKey(key);
        if(this.arr[hashCode] != undefined && !this.arr[hashCode].searchKey(key)){
            return this.arr[hashCode].FindValue(key);
        }
        else return undefined;
    }

    isEmpty(){
        if(this.len == 0)return true;
        else return false;
    }

    keys(){
        let tmp = [];
        for(let i in this.arr){
            if(this.arr[i] == undefined)continue;
            tmp += this.arr[i].fullSearch();
        }
        return tmp;
    }

    put(key, value){
        let hashCode = this.getHashKey(key);

        if(this.arr[hashCode] == undefined){
            this.arr[hashCode] = new HashTrie();
        }

        if(this.arr[hashCode].searchKey(key)){
            this.arr[hashCode].insert(key,value);
            this.len +=1;
        }
    }

    remove(key){
        let hashCode = this.getHashKey(key);
        // 값이 있는 경우
        if(this.arr[hashCode] != undefined && !this.arr[hashCode].searchKey(key)){
            this.arr[hashCode].keyRemove(key);
            // 만약 hashCode안에 있는 key들이 다 없어지면 hashCode값을 없애준다.
            if(this.arr[hashCode].len == 0){
                //this.arr.splice(hashCode , 1);
                this.arr[hashCode] = undefined; 
            }
            this.len -=1;
        }
    }

    replace(key, value){
        let hashCode = this.getHashKey(key);
        if(this.arr[hashCode] == undefined){
            this.put(key,value);
        }else{
            if(!this.arr[hashCode].searchKey(key)){
                this.remove(key);
            }
            this.put(key,value);
        }
    }

    size(){
        return this.len;
    }
}

module.exports = HashMap;