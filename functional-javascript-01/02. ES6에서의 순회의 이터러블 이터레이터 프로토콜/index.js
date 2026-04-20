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

for (const a of arr) console.log(a); // key로 접근해서 조회 (e.g. arr[0])

// Set을 통해 알아보기
console.log('Set ------- ');

const set = new Set([1, 2, 3]);

for (const s of set) console.log(s); // key로 접근해서 조회 불가

// Map을 통해 알아보기
console.log('Map ------- ');

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

for (const m of map) console.log(m); // key로 접근해서 조회 불가

console.clear(); // ===============================================
