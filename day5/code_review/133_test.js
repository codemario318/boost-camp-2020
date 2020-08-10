// const HashMap = require('./HashMap.js');
// //들어갈 entry의 갯수를 설정, 짝수로 설정하시오
// const entryCount = 50;
// const keyList = [];
// const valueList = [];


// //random key, value 문자열을 생성
// for (let i = 0; i < entryCount; i++) {
//     let randomKey = Math.random().toString().substr(2,12);
//     keyList.push(randomKey);
    
//     let randomValue =  Math.random().toString().substr(2,6);
//     valueList.push(randomValue)
// }

// //hashMap을 초기화 해준다
// function init(startIndex, endIndex){
//     const tempHash = new HashMap(entryCount);

//     for (let i = startIndex; i < endIndex; i++){
//         tempHash.put(valueList[i], keyList[i]);
//     }

//     return tempHash;
// }


// //clear()메소드 테스트
// test('clear() 메소드 검사', () => {
//     const tempHash = init(0, entryCount);

//     expect(tempHash.clear()).toBe(undefined)
//   })

// // contain 메소드 테스트
// // 모든 key값은 다르다고 가정
// describe('contain() 메소드 검사', () => {
//     const tempHash = init(0, entryCount);
     
//     for (let i = 0; i < entryCount; i++){
//         it('존재해야함', () => {
//             expect(tempHash.contains(keyList[i])).toBeTruthy();
//         });
//     }
// })

// // getValue 메소드 테스트
// // 모든 key값은 다르다고 가정
// describe('getValue() 메소드 검사', () => {
//     const tempHash = init(0, entryCount);
    
//     //지정한 value와 같은지 확인
//     for (let i = 0; i < entryCount; i++){
//         it('value비교', () => {
//             expect(tempHash.getValue(keyList[i])).toBe(valueList[i]);
//         });
//     }
// })


// //keys() 메소드 검사
// describe('keys() 메소드 검사', () => {
//     const tempHash = init(0, entryCount);

//     const tempKeyList = tempHash.keys();

//     //저장한 key값들이 존재하는지를 확인
//     for (let i = 0; i < entryCount; i++){
//         it('key 존재 비교', () => {
//             expect(tempKeyList).toContain(keyList[i]);
//         });
//     }
// })

// //remove() 메소드 검사
// //홀수번째 키들을 삭제
// describe('keys() 메소드 검사', () => {
//     const tempHash = init(0, entryCount);

//     //홀수번째 key들을 삭제하고 존재여부를 확인
//     for (let i = 0; i < entryCount; i++){

//         if(i % 2 == 1){
//             tempHash.remove(keyList[i]);
//             it('삭제된 key 존재 비교', () => {
//                 expect(tempHash.contains(keyList[i])).toBeFalsy();
//             });

//         }else{
//             it('존재하는 key 존재 비교', () => {
//                 expect(tempHash.contains(keyList[i])).toBeTruthy();
//             });
//         }
//     }
// })

// //size()메소드 테스트
// test('size() 메소드 검사', () => {
//     const tempHash = init(0, entryCount);

//     expect(tempHash.size()).toBe(entryCount);

//     //10개를 삭제
//     for (let i = 0; i < 10; i++)
//         tempHash.remove(keyList[i]);
//     expect(tempHash.size()).toBe(entryCount - 10);
// })

// // put() 메소드 검사
// test('put() 메소드 검사', () => {
//     const tempHash = init(0, entryCount/2);
//     expect(tempHash.size()).toBe(entryCount/2);
    
//     //같은 요소들은 한번 더 집어넣음
//     for (let i = 0; i < entryCount/2; i++){
//         tempHash.put(valueList[i], keyList[i]);
//      }
//      expect(tempHash.size()).toBe(entryCount/2);

//      //새로운 요소들을 넣음
//      for (let i = entryCount/2; i < entryCount; i++){
//         tempHash.put(valueList[i], keyList[i]);
//      }
//      expect(tempHash.size()).toBe(entryCount);
// })

// // replace() 메소드 검사
// test('replace() 메소드 검사', () => {
//     const tempHash = init(0, entryCount/2);

//     //이미 존재하는 key들에 대해 replace를 진행 개수에 변동이 없어야함
//     for (let i = 0; i < entryCount/2; i++) {
//         tempHash.replace('replaced', keyList[i]);
//     }
      
//     expect(tempHash.size()).toBe(entryCount/2)

//     //새로운 요소들을 replace로 추가
//     for (let i = entryCount/2; i < entryCount; i++){
//         tempHash.replace(valueList[i], keyList[i]);
//     }

//     expect(tempHash.size()).toBe(entryCount);

// })