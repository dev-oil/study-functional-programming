// 제너레이터/이터레이터
// - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수

// 제너레이터는 일반 함수에 *을 붙여서 만들 수 있음
function* gen() {
  yield 1;
  if (false) yield 2; // 조건문을 통해 중간에 값을 반환하지 않을 수 있음
  yield 3;
  return 100; // return 값도 만들 수 있음. return 값은 이터레이터의 done이 true가 될 때 반환됨
}

let iter = gen();

console.log(iter[Symbol.iterator]() === iter); // true - 제너레이터는 well-formed 이터레이터를 반환하는 이터러블이자 함수

console.log(iter); // Object [Generator] { ... }
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false } // 만약 false면 실행 X
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 100, done: true }

for (const a of gen()) console.log(a); // 1 2 3 - 제너레이터의 실행 결과가 이터러블이자 이터레이터이기 때문에, 순회 가능 (여기는 return 값은 순회에 포함되지 않음)

// 제너레이터의 의의?
// 어떠한 상태나, 어떠한 상태의 값이던 사실상 자바스크립트로 어떤 값이든 순회할 수 있는 값을 만들 수 있다.
