// 기존과 달라진 ES6에서의 리스트 순회
// for i++
// for of

// es5
const list = [1, 2, 3];

for (var i = 0; i < list.length; i++) {
  console.log(list[i]);
}

const str = 'abc';
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// es6
// 보다 선언적으로 순회하는 방식으로 좀 더 간결하게 변경됨 (for of)
for (const item of list) {
  console.log(item);
}

for (const e of str) {
  console.log(e);
}

// Array를 통해 알아보기
console.log('Arr ------- ');

const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // [Function: values] 함수가 들어있음
// arr[Symbol.iterator] = null; // TypeError: arr is not iterable

for (const a of arr) console.log(a); // key로 접근해서 조회 (e.g. arr[0])

// Set을 통해 알아보기
console.log('Set ------- ');

const set = new Set([1, 2, 3]);
console.log(set[Symbol.iterator]); // [Function: values] 함수가 들어있음

for (const s of set) console.log(s); // key로 접근해서 조회 불가

// Map을 통해 알아보기
console.log('Map ------- ');

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
console.log(map[Symbol.iterator]); // [Function: entries] 함수가 들어있음

for (const m of map) console.log(m); // key로 접근해서 조회 불가

console.clear(); // ===============================================

// Symbol.iterator
// 어떤 객체의 키로 사용될 수 있음

// 이터러블/이터레이터 프로토콜
// - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
// - 이터레이터: { value, done } 객체를 리턴하는 next()를 가진 값
// - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자(스프레드) 등과 함께 동작하도록한 규약. 프로토콜.

// array는 이터러블이므로 Symbol.iterator를 통해 이터레이터 객체를 리턴할 수 있음
// Set, Map이 키 접근이 불가능함에도 for of로 순회할 수 있는 이유는 이터러블/이터레이터 프로토콜을 따르고 있기 때문

const iterator = arr[Symbol.iterator](); // 이터레이터 객체를 리턴

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 이터러블/이터레이터 프로토콜을 따른다 라고 말할 수 있음

const iter1 = arr[Symbol.iterator]();
iter1.next(); // { value: 1, done: false }

for (const a of iter1) console.log(a); // 2, 3 (1은 이미 next()로 조회했기 때문에)

const iter2 = set[Symbol.iterator]();
iter2.next(); // { value: 1, done: false }
iter2.next(); // { value: 2, done: false }

for (const s of iter2) console.log(s); // 3 (1, 2는 이미 next()로 조회했기 때문에)

const iter3 = map[Symbol.iterator]();
iter3.next(); // { value: [ 'a', 1 ], done: false }

for (const m of iter3) console.log(m); // [ 'b', 2 ], [ 'c', 3 ] (['a', 1]은 이미 next()로 조회했기 때문에)

// Map의 여러가지 순회 방법

for (const m of map.keys()) console.log(m); // 'a', 'b', 'c'  이런식으로 key만 순회할 수 있음
for (const m of map.values()) console.log(m); // 1, 2, 3 이런식으로 value만 순회할 수 있음
for (const m of map.entries()) console.log(m); // [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] 이런식으로 key, value 모두 순회할 수 있음

const it = map.values();

console.log(it); // Object [Map Iterator] { 1, 2, 3 } 이터레이터 객체
console.log(it[Symbol.iterator]); // [Function: values] 이터레이터 객체도 이터러블이므로 Symbol.iterator를 통해 이터레이터 객체를 리턴할 수 있음

const it2 = it[Symbol.iterator]();
console.log(it2.next()); // 자기 자신을 return하도록 되어있어서, 바로 next()로 조회할 수 있음

const it3 = it2[Symbol.iterator]();
console.log(it3); // 자기 자신을 return하도록 되어있어서, it2와 it3는 같은 객체임 고로 값은 [Map Iterator] { 2, 3 } 가 나옴 한번 next()로 조회했기 때문에 1은 빠짐

// 핵심 포인트는 이터레이터는 자기 자신도 이터러블이라는 것

// const it = map.values();
// const it2 = it[Symbol.iterator]();
// const it3 = it2[Symbol.iterator]();

// it === it2; // true
// it2 === it3; // true
