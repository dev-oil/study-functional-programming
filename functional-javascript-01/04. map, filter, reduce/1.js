const products = [
  { name: '반팔티', price: 10000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// map 함수
// - "이터러블을 어떻게 순회할지"는 map이 담당
// - "어떤 값을 뽑을지"는 보조함수(f)에게 완전히 위임
// → 순회 로직과 수집 로직을 분리하는 것이 핵심
const map = (f, iter) => {
  let res = [];

  for (const p of iter) {
    res.push(f(p)); // 무엇을 수집할지를 f에게 위임 (하드코딩 X)
  }

  return res;
};

// 보조함수(콜백)를 바꾸는 것만으로 수집하는 값을 자유롭게 결정할 수 있다.
// map 자체는 손대지 않고, 보조함수만 교체 → 높은 재사용성
const names = map((p) => p.name, products); // 이름 수집
const prices = map((p) => p.price, products); // 가격 수집

console.log(names);
console.log(prices);

console.clear(); // ======================================================

// 이터러블 프로토콜을 따른 map의 다형성
// e.g.
// console.log(map((el) => el.nodeName, document.querySelectorAll('*')));

// 이렇게 만든 map 함수는 이터러블 프로토콜을 따른 다형성을 가지고 있어서, 다양한 이터러블에 대해 재사용할 수 있습니다.

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

console.log(map((el) => el * 2, gen())); // 2 4 6

console.clear(); // ======================================================

// Key value 쌍을 나타내는 Map
let m = new Map();

m.set('a', 10);
m.set('b', 20);

// const it = m[Symbol.iterator]();

// console.log(it.next()); // { value: [ 'a', 10 ], done: false }
// console.log(it.next()); // { value: [ 'b', 20 ], done: false }
// console.log(it.next()); // { value: undefined, done: true }

const result = map(([key, value]) => [key, value * 2], m);
console.log(result); // [ [ 'a', 20 ], [ 'b', 40 ] ]
