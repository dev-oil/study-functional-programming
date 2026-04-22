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

console.clear(); // ===============================================

// 사용자 정의 이터러블을 통해 알아보기
// 조건 1. 이터러블은 [Symbol.iterator]() 메서드를 구현하고 있어야함 (가지고 있는 객체)
// 조건 2. [Symbol.iterator]()는 이터레이터를 리턴해야 함
// 조건 3. 리턴하는 이터레이터는 next() 메서드를 구현하고 있어야 함
// 조건 4. next() 메서드는 { value, done } 객체를 리턴해야함
// 조건 5. done이 true가 될 때까지 (i > 0) value--를 리턴해야함

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      }, // 자기 자신을 return 하도록 해서, well-formed 이터레이터가 되도록 함 (이터레이터도 이터러블이 될 수 있도록) => for of 문으로 순회할 수 있도록
    };
  },
};

const myIterator = iterable[Symbol.iterator]();

// console.log(myIterator.next()); // { value: 3, done: false }
// console.log(myIterator.next()); // { value: 2, done: false }
// console.log(myIterator.next()); // { value: 1, done: false }
// console.log(myIterator.next()); // { done: true }

// for (const a of iterable) console.log(a);
for (const i of myIterator) console.log(i); // [Symbol.iterator]() 메서드가 잘 구현된 이터러블이므로, 이터레이터를 만들어서 순회할 수 있음

const arr2 = [1, 2, 3];
const iter4 = arr2[Symbol.iterator]();

iter4.next();

for (const a of iter4) console.log(a);

// 잘 구현된 이터러블은, 이터레이터를 만들었을 때. 이 이터레이터를 진행하다가 순회할 수도 있고, 이터레이터를 그대로 for of 문으로 넣었을 때 모든 값으로 순회할 수 있도록 되어있음.

console.log(iter4[Symbol.iterator]() === iter4); // iter4 역시 Symbol.iterator를 가지고 있고, 그것을 실행한 값은, 자기 자신이다.

// 이렇게 이터레이터가 자기 자신을 반환하는 Symbol.iterator 메서드를 가지고 있을 때 well-formed 이터레이터라고 부를 수 있음

console.clear(); // ===============================================

// 여러가지 이터러블/이터레이터 프로토콜 예시
// (e.g. DOM API, NodeList, arguments, String 등)
// for (const a of document.querySelectorAll('*')) console.log(a); // <html>, <head>, <meta charset="UTF-8">, <title>Document</title>, <body>...</body>  이런식으로 모든 요소를 순회할 수 있음

// const all = document.querySelectorAll('*');
// console.log(all[Symbol.iterator]()); // [Object: NodeList] { ... } NodeList도 이터러블이므로 Symbol.iterator를 통해 이터레이터 객체를 리턴할 수 있음

// const documentIterator = all[Symbol.iterator]();
// console.log(documentIterator.next()); // { value: <html>, done: false } NodeList의 이터레이터 객체를 통해 순회할 수 있음

// NodeList(이터러블이므로 for of로 순회할 수 있음)

console.clear(); // ===============================================

// 전개 연산자
// 전개 연산자도 마찬가지로 이터러블, 이터레이터 프로토콜을 따른다.
const a = [1, 2];

// 만약 Symbol.iterator를 null로 변경하면, 전개 연산자 시도 시, TypeError: a is not iterable 오류가 발생함
// a[Symbol.iterator] = null;

console.log([...a, ...[3, 4]]); // [ 1, 2, 3, 4 ] 전개 연산자를 통해 이터러블을 펼칠 수 있음
console.log([...a, ...arr, ...set, ...map.keys()]); // [ 1, 2, 1, 2, 3, 1, 2, 3 ] 이터러블을 펼칠 수 있음
