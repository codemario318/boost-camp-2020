const HashMap = require('./HashMap');

const SIZE = 10,
    testData = [
        ['John Smith', '521-8976'],
        ['Lisa Smith', '521-1234'],
        ['sdfasdf', 'asdfasdf']
    ],
    testResData = [
        'John Smith',
        'Lisa Smith',
        'sdfasdf',
    ],
    testFalsyData = [
        '이동현',
        '안녕하세요',
        '반갑습니다.'
    ];

const hashInit = (hashMap, data) => {
    data.forEach(v => {
        hashMap.put(v[0], v[1])
    });
}

test("clear() test", () => {
    const hashMap = new HashMap(SIZE);

    hashInit(hashMap, testData);

    hashMap.clear();
    expect(hashMap.size()).toBe(0);
    expect(hashMap.keys()).toHaveLength(0);

})

test("contains() test", () => {
    const hashMap = new HashMap(SIZE);

    hashInit(hashMap, testData);

    testResData.forEach((id) => {
        expect(hashMap.contains(id)).toBeTruthy();
    })

    testFalsyData.forEach((id) => {
        expect(hashMap.contains(id)).toBeFalsy();
    })

    testResData.forEach(id => {
        hashMap.remove(id);
        expect(hashMap.contains(id)).toBeFalsy();
    });

})

test("getValue() test", () => {
    const hashMap = new HashMap(SIZE);

    hashInit(hashMap, testData);

    testResData.forEach((id, i) => {
        const res = hashMap.getValue(id);
        expect(res).toBe(testData[i][1]);
    })

    testFalsyData.forEach((v, i) => {
        const key = testResData[i];
        hashMap.replace(key, v);
        expect(hashMap.getValue(key)).toBe(v);
    });

    testResData.forEach((key, i) => {
        hashMap.remove(key);
        expect(hashMap.getValue(key)).toEqual(undefined);
    })
})

test("put() test", () => {
    const hashMap = new HashMap(SIZE);
    hashInit(hashMap, testData);

    testResData.forEach((id, i) => {
        const res = hashMap.getValue(id);
        expect(res).toBe(testData[i][1]);
    })

    testRes = hashMap.keys().sort();

    expect(testRes).toEqual(testResData);
});

test("remove() test", () => {
    const hashMap = new HashMap(SIZE);
    let removeResLen;

    hashInit(hashMap, testData);

    removeResLen = hashMap.keys().length

    testFalsyData.forEach(v => {
        hashMap.remove(v);
    });

    expect(removeResLen).toBe(testData.length);

    testResData.forEach(key => {
        hashMap.remove(key);
        const removeRes = hashMap.keys().length;
        removeResLen--;
        expect(removeResLen).toBe(removeRes);
    })
})

test("replace() test", () => {
    const hashMap = new HashMap(SIZE);

    hashInit(hashMap, testData);

    removeResLen = hashMap.keys().length

    testFalsyData.forEach((v, i) => {
        hashMap.replace(testResData[i], v);
        const res = hashMap.getValue(testResData[i]);
        expect(res).toBe(v);
    });

})

test("size() test", () => {
    const hashMap = new HashMap(SIZE);

    hashInit(hashMap, testData);

    testFalsyData.forEach((v, i) => {
        hashMap.replace(testResData[i], v);
        expect(hashMap.size()).toBe(testResData.length);
    });

    testResData.forEach((v, i) => {
        hashMap.remove(v);
        expect(hashMap.size()).toBe(testResData.length - (i + 1));
    });
})

