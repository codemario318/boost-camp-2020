const Bucket = require('./HashBucket');
const Hash = require('./Hash');

class HashMap {
    constructor(bucketSize) {
        this.hash = new Hash(bucketSize);
        this.bucket = new Bucket(bucketSize);
    }

    clear() {

    }
    
    contains(key) {

        
    }

    getValue(key) {

    }

    isEmpty() {

    }

    keys() {

    }

    put(key, value) {

    }

    replace(key, value) {

    }
}