---
title: '[Node.js 교과서] - 3장 노드 기능 정리 '
date: 2021-11-04 00:00:00
description: "Node.js 교과서 3장을 정리합니다."
tags: [Node.js, Javascript]
thumbnail: 
---   

# REPL
자바스크립트는 스크립트 언어이므로 미리 컴파일하지 않아도 즉석에서 코드를 실행할 수 있다. 

> `REPL` = Read(읽고) + Eval(해석하고) + Print(결과를 반환하고) + Loop (종료할 때 까지 반복)

# JS 파일 실행하기 
콘솔에서 
> node [자바스크립트 파일 경로]

# 모듈로 만들기
노드는 코드를 모듈로 만들 수 있다는 점에서 브라우저의 자바스크립트와 다르다. 

## 모듈이란?
모듈이란 특정한 기능을 하는 함수나 변수들의 집합이다. 모듈은 자체로도 하나의 프로그램이면서 다른 프로그램의 부품으로 사용할 수 있다. 모듈로 만들어놓으면 다른 프로그램에서 재사용할 수 있다. 

보통 파일 하나하나가 모듈이 된다. 

## ES2015 모듈
``` javascript
import { odd, even } from './var';

function checkOddOrEven(num) {
    if (num % 2) {
      return odd;
    }
    return even;
}

export default checkOddOrEven;
``` 

`require` 가 `import`, `from` 으로, `module.exports`가 `export default`로 바꼈다. 

# 내장 객체 
## 1. global 
브라우저의 window 와 같은 전역 객체이다. 전역 객체 이므로 모든 파일에서 접근할 수 있다. `window.open`을 그냥 `open`으로 사용하듯,
`global`도 생략할 수 있다. 

노드엔 DOM이나 BOM이 없으므로 window와 document 객체는 노드에서 사용할 수 없다. 

## 2. __filename, __dirname
`__filename`, `__dirname` 을 통해 경로에 대한 정보를 제공한다.

``` javascript
console.log(__filename);
console.log(__dirname);
```

## 3. module, exports, require 
`exports` 를 통해서도 모듈을 생성할 수 있다. 

- `require`가 파일 최상단에 위치하지 않아도 되고, `module.exports` 역시 최하단에 위치할 필요가 없다.
  - 아무 곳에서나 사용할 수 있다.

`require.main`은 노드 실행 시 첫 모듈을 가리킨다. 

- 순환참조 발생 시, 빈 객체가 된다. 

## 4. process 
`process` 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다. 
### 4.1 process.nextTick(콜백) 
이벤트 루프가 다른 콜백 함수들 보다 `nextTick` 콜백 함수를 우선으로 처리하게 한다. 

### 4.2 process.exit(); 
실행중인 노드 프로세스를 종료한다.

# 내장 모듈
## querystring 
### querystring.parse(쿼리)
url의 query 부분을 자바스크립트 객체로 분할 
### querystring.stringify(객체)
분해된 query 객체를 문자열로 다시 조립 