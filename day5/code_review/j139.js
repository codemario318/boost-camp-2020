function getHash(string, bucket_size){
    let hash = 17; //prime number
    for (let i=0; i<string.length; i++){
        hash = (13 * hash * string.charCodeAt(i)) % bucket_size;
    }
    return hash;
 }

 module.exports = getHash;

class HashMap{
    constructor (BUCKET_SIZE) {
        this.BUCKET_SIZE = BUCKET_SIZE;
        this.table = new Array(this.BUCKET_SIZE);
        this.numItems = 0;
        this.keyList = new Array();

    }
    
    clear = () => {
        this.table = new Array(this.BUCKET_SIZE);
        this.keyList = [];
        this.numItems = 0;
        return this.table;
    };

    contains = (key) => {
        const idx = getHash(key, this.BUCKET_SIZE);
        if (this.table[idx] === undefined){
            return false;
        }
        for (let i=0; i<this.table[idx].length; i++){
            if (this.table[idx][i][1] === key){
                return true;
            }
        }
        return false;
    };

    getValue = (key) => {
        if (!this.contains(key)) return null;
        const idx = getHash(key, this.table.length);
        for (let i=0; i<this.table[idx].length; i++){
            if (this.table[idx][i][1] === key){
                return this.table[idx][i][0];
            }
        }
        return null;
    };

    isEmpty(){
        return this.numItems > 0 ? false : true;
    };

    keys = () =>{
        return this.keyList;
    };

    // 키-값을 추가한다. 기존에 key가 이미 있으면 추가하지 않는다.
    put = (value, key)=> { 
        if (this.contains(key)) return;
        const idx = getHash(key, this.BUCKET_SIZE);
        if (this.table[idx] === undefined){ //비어있는 곳에 추가 
            this.table[idx] = [[value, key]];
        }else{
            this.table[idx].push([value, key]); //table[idx]에 추가 (여러개)
        }
        this.numItems++;
        this.keyList.push(key);
    };

    // 해당 키에 있는 값을 삭제한다. 기존에 key가 없으면 아무것도 하지 않는다.
    remove = (key) => {
        if (!this.contains(key)) return;
        const idx = getHash(key, this.BUCKET_SIZE);
        if (this.table[idx].length ===1 && this.table[idx][0][1]===key){
            delete this.table[idx];
        }else{
            for (let i=0; i<this.table[idx]; i++){
                if (this.table[idx][i][1] === key){
                    delete this.table[idx][i];
                }
            }
        }
        this.keyList.splice(this.keyList.indexOf(key), 1);
        this.numItems--;
    };

    replace = (value, key) => {
        if (!this.contains(key)){ //없으면 추가 
          this.put(value, key);
        }else{
          const idx = getHash(key, this.BUCKET_SIZE);
          for (let i=0; i<this.table[idx].length; i++){ //idx배열을 찾아서 value값 update
            if (this.table[idx][i][1] === key){
                this.table[idx][i][0] = value;
                }
            }
        }
    };

    size=()=>{
        return this.numItems;
    }
}

module.exports = HashMap;