class ArrayBucket {
    constructor(bucketSize) {
        this.buckets = new Array(bucketSize);

        for (let i = 0; i < bucketSize; i++) this.buckets[i] = new Array();
    }

    getValue(code, key) {
        const bucket = this.buckets[code];

        for (const item of bucket) {
            if (item[0] === key) return item[1];
        }

        return undefined;
    }

    getPos(code, key) {
        const bucket = this.buckets[code];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) return i;
        }

        return undefined;
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

    add(code, key, value) {
        const pos = this.getPos(code, key);

        if (pos !== undefined) return false;

        this.buckets[code].push([key, value]);
        return true;
    }

    remove(code, key) {
        const bucket = this.buckets[code],
            pos = this.getPos(code, key);

        if (pos === undefined) return false;

        bucket.splice(pos, 1);
        return true;
    }

    replace(code, key, value) {
        const pos = this.getPos(code, key),
            bucket = this.buckets[code];

        if (pos === undefined) {
            this.buckets[code].push([key, value]);
            return true;
        }

        bucket[pos][1] = value;
        return false;
    }

    print() {
        console.log(this.buckets);
    }

}
module.exports = ArrayBucket;

// const bucket = new ArrayBucket(5);
// bucket.print();
// // bucket.add(0,0,0);
// for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 2; j++) {
//         const key = `${i%5}${j}`;
//         bucket.add(i%5,key,j);
//     }
// }
// bucket.print();
// console.log(bucket.getKeys());
// for (let i = 0; i < 10; i++) {
//     (i%2) ? bucket.remove(i%5,`${i%5}1`) : bucket.remove(i%5,`${i%5}0`);
//     console.log(bucket.getPos(i%5,`${i%5}0`),bucket.getPos(i,`${i%5}1`));
//     console.log(bucket.getValue(i%5,`${i%5}0`),bucket.getValue(i%5,`${i%5}1`));
//     bucket.replace(i%5,`${i%5}3`,3);
//     console.log(bucket.getValue(i%5,`${i%5}0`),bucket.getValue(i%5,`${i%5}1`));
//     (!i%2) ? bucket.replace(i%5,`${i%5}1`,3) : bucket.replace(i%5,`${i%5}0`,2);
//     console.log(bucket.getValue(i%5,`${i%5}0`),bucket.getValue(i%5,`${i%5}1`));
// }
// bucket.print();
// console.log(bucket.getKeys());
// bucket.replace(0,'00','change!');
// bucket.print()