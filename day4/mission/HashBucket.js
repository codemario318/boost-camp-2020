class ArrayBucket {
    constructor(bucketSize) {
        this.buckets = new Array(bucketSize);
        
        for (let i = 0; i < bucketSize; i++) this.buckets[i] = new Array();
    }

    add(code, key, value) {
        this.buckets[code].push([key, value]);
    }

    delete(code, key) {
        const bucket = this.buckets[code];
        let pos;
        for (pos = 0; pos < bucket.length; pos++) {
            if (bucket[pos][0] === key) {
                break;
            };
        }
        bucket.splice(pos,1);
    }

    getKeys() {
        const keys = Array();

        for (const bucket of this.buckets) {
            for (const item of bucket) {
                keys.push(item[0]);
            }
        }

        return keys;
    }

    print() {
        console.log(this.buckets);
    }

}
module.exports = ArrayBucket;

// const bucket = new ArrayBucket(10);
// bucket.print();
// // bucket.add(0,0,0);
// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 2; j++) {
//         const key = `${i}${j}`;
//         bucket.add(i,key,j);
//     }
// }
// bucket.print();
// console.log(bucket.getKeys());
// for (let i = 0; i < 10; i++) {
//     (i%2) ? bucket.delete(i,`${i}1`) : bucket.delete(i,`${i}0`);
// }
// bucket.print();
// console.log(bucket.getKeys());
