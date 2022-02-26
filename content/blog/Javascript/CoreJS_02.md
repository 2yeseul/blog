---
title: '[코어자바스크립트] 02.실행 컨텍스트'
date: 2022-02-26 00:00:00
description: ""
tags: [Javascript, 코어자바스크립트]
thumbnail: 
---   
# 실행 컨텍스트란?
> 실행할 code에 제공할 환경 정보를 모아놓은 객체

-> 동적 언어로서의 성격 잘 파악할 수 있다.

Execution Context가 활성화 되는 시점
1. 호이스팅: 선언된 변수를 끌어 올림
2. 외부 환경 정보 구성
3. this 값 설정...

동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보를 모아 컨텍스트를 구성하고, 이를 `콜 스택`에 쌓아올린다.

일반적으로 실행 컨텍스트가 구성되는 방법은 **함수 실행**이다.

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--q_xmB2U9--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/01ksqw5twx22ilo4pibc.jpg)

(출처 - https://dev.to/ahmedtahir/what-is-the-execution-context-execution-stack-scope-chain-in-js-26nc)

## 무엇이 담길까?
![image](https://user-images.githubusercontent.com/43533905/155837117-3e713daa-8512-4e75-b2cd-7830078fb14a.png)

### Variable Environment
- 현재 컨텍스트 내의 **식별자**에 대한 정보
- 외부 환경 정보
- 선언 시점의 `Lexical Environment`의 스냅샷(최초 실행시의) => 변경사항은 반영되지 않음
  - 실행 context 생성 시, variable environment에 정보를 우선적으로 담는다. 그대로 복사 후 Lexical Environment 생성 뒤, 이후엔 Lexical Environment 를 주로 활용한다.

### Lexical Environment
> 현재 context 내부에는 a, b, c와 같은 식별자가 있고, 그 외부 정보는 D를 참조하게 되어있다

 같이, 사전적인 느낌의 정보가 담겨있다.

 ## environment record와 호이스팅
 현재 context와 관련된 code의 식별자(매개변수 이름 / 함수 선언 / 변수명) 내용 저장.
 - 컨텍스트 내부를 처음부터 끝까지 쭉 훑으며 순서대로 수집한다. 

 ``` javascript
 function beforeHoisting (x) {
  console.log(`1) ${x}`);

  var x;
  console.log(`2) ${x}`)

  var x = 2;
  console.log(`3) ${x}`)
}

beforeHoisting(1);
console.log('=========')
// 예상? 1) x = 1, 2) x = undefined, 3) x = 2
// 실제? 1) x = 1, 2) x = 1, 3) x = 2

// 매개변수를 변수 선언/할당과 같다고 간주해서 변환
function doingHoisting(x) {
  var x = 1;
  console.log(`1) ${x}`);

  var x;
  console.log(`2) ${x}`)

  var x = 2;
  console.log(`3) ${x}`)
}

doingHoisting(1);
console.log('=========')
function afterHoisting(x) {
  var x; // 변수 x 선언과 저장할 공간 미리 확보. 확보한 공간의 주솟값을 변수 x에 연결
  var x; // 이미 선언된 변수가 있으므로 무시
  var x;

  x = 1;
  console.log(`1) ${x}`);
  console.log(`2) ${x}`)
  x = 2;
  console.log(`3) ${x}`)
}
afterHoisting(1);

```
 
``` javascript
function beforeHoisting() {
  console.log(b);

  var b = 'bbb'; // 수집 대상 => 변수 선언
  console.log(b);
  function b () {} // 수집 대상 => 함수 선언
}

beforeHoisting();
// 함수 실행 순간 해당 함수의 실행 컨텍스트가 생성되고 변수명과 함수 선언의 정보를 위로 끌어 올린다.
// 변수는 선언부와 할당부를 나누어 선언부만 끌어올리지만, 함수 선언은 함수 전체를 끌어올린다.

function doingHoisting() {
  var b;
  function b() {}

  console.log(b);
  b = 'bbb';
  console.log(b);
  console.log(b); 
}

doingHoisting();

function afterHoisting() {
  var b; // 변수 선언
  var b = function b() {} // 이미 선언된 변수가 있으므로 선언은 무시함. 함수는 별도의 메모리에 담길 것이고, 해당 함수가 저장된 주솟값을 b와 연결된 공간에 저장. b는 함수를 가리킨다

  console.log(b); // 함수 b 출력
  b = 'bbb';
  console.log(b); // bbb 출력
  console.log(b); 
}
afterHoisting();
```
### 함수 선언문과 함수 표현식
- 함수 선언문 : function 정의부만 존재하고 별도의 할당 명령이 없음 / 반드시 함수명이 정의되어 있어야 한다
- 함수 표현식 : 정의한 function을 별도의 변수에 할당.  / 함수명이 없어도 된다.

``` javascript
// 함수 선언문
function a() { /* */ }
a(); // OK!

var b = function() { /* */ }
b(); // OK!

var c = function d() { /* */ }
c(); // ERROR!
d(); // ERROR!
``` 

## 스코프, 스코프 체인, outerEnvironmentReference
### 스코프
- 식별자에 대한 유효범위
### 스코프 체인
- 식별자의 유효범위(스코프)를 안에서부터 바깥으로 차례로 검색해나가는 것
- `outerEnvironmentReference` 가 가능하게 한다. 