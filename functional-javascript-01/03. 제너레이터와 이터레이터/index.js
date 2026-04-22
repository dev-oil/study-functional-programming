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

console.clear(); // ===============================================
// odds
// 제너레이터를 활용해서 홀수만 순회할 수 있는 이터레이터를 만드는데, 여러가지 제너레이터를 활용해서 여러가지 값을 순회할 수 있는 이터레이터를 만들어보자

// 무한 생성 가능
// 무한히 생성 가능하지만, 내가 next()를 통해 원하는 만큼만 동작할 수 있게 할 수 있기 때문에 프로그램이 멈추거나 하지 않음.
function* infinity(i = 0) {
  while (true) yield i++;
}

// 이터러블을 받아서, 내부 값으로 계속 yield하다가 limit 값에 도달하면 return 함
function* limit(limitNumber, iter) {
  for (const a of iter) {
    yield a;
    if (a === limitNumber) return;
  }
}

// const iterInfinity = infinity();
// console.log(iterInfinity.next()); // { value: 0, done: false }
// console.log(iterInfinity.next()); // { value: 1, done: false } ... 무한 생성 가능

function* odds(limitNumber) {
  for (const a of limit(limitNumber, infinity(1))) {
    if (a % 2) yield a;
  }
}

const iter2 = odds(10);

console.log(iter2.next()); // { value: 1, done: false }
console.log(iter2.next()); // { value: 3, done: false }
console.log(iter2.next()); // { value: 5, done: false }
console.log(iter2.next()); // { value: 7, done: false }
console.log(iter2.next()); // { value: 9, done: false }
console.log(iter2.next()); // { value: undefined, done: true }

for (const a of odds(10)) console.log(a); // 1 3 5 7 9

// ===============================================
// 제너레이터로 이터레이터를 만드는 이유?
// -> 핵심은 "지연 평가(Lazy Evaluation)"와 "메모리 효율"
//
// 1. 값을 필요할 때 하나씩만 계산함 (Lazy)
//    - 배열: 전체를 미리 다 만들어서 메모리에 올려둠 (Eager)
//    - 제너레이터: next() 호출 시점에만 값을 계산/반환 -> 메모리 O(1)
//
// 2. 무한 시퀀스를 표현할 수 있음
//    - infinity() 처럼 끝없는 흐름을 만들어도,
//      필요한 만큼만 뽑아 쓰기 때문에 프로그램이 멈추지 않음
//
// 3. 조합(합성) 가능성이 높음
//    - odds(limit(10, infinity(1))) 처럼 제너레이터를 파이프라인으로 연결 가능
//    - 배열 방식이면 단계마다 중간 배열이 생기지만,
//      제너레이터는 값 하나가 흐르듯 통과하므로 중간 배열이 생기지 않음
//
// 4. 조기 종료(break 등) 시 "값을 만드는 비용" 자체가 절약됨
//    - break 자체는 배열도 물론 가능함 (반복은 멈춤)
//    - 다만 배열은 반복을 돌기 "전에" 이미 모든 값을 다 만들어 둔 상태라
//      break 해도 생성 비용은 이미 지불된 상태 (메모리/연산 낭비)
//    - 제너레이터는 next() 시점에 비로소 값을 만들기 때문에,
//      break 하면 그 뒤의 값은 "아예 생성되지도 않음" -> 생성 비용 자체가 절약
//
// => "필요한 만큼만, 필요할 때만 계산해서 흘려보낸다"
//    이후 map/filter/reduce 를 직접 구현할 때 이 지연 평가가 핵심이 됨
