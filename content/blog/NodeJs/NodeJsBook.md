---
title: '[Node.js 교과서] - 2장 자바스크립트 정리'
date: 2021-11-04 00:00:00
description: "Node.js 교과서 2장 자바스크립트를 정리합니다."
tags: [Node.js, Javascript]
thumbnail: 
---   


# Event Driven 
`이벤트 기반`이란 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식인데, 이 이벤트 기반은 노드의 특성 중 하나이다.

이벤트 기반 시스템에서는 `특정 이벤트` 가 `발생`할 때, 무엇을 할 지 미리 등록해두어야 한다. 
> 이벤트 리스너에 콜백 함수를 등록한다.

## 이벤트 루프
- 이벤트 발생 시 호출할 콜백함수를 관리하고, 호출된 콜백 함수의 실행 순서를 결정
- 노드가 종료될 때 까지 이벤트 처리를 위한 작업을 반복 -> loop라고 부름

## 백그라운드
- `setTimeout` 같은 타이머나 이벤트 리스너가 대기하는 곳이다.
- 여러 작업이 동시에 실행 가능

## 태스크 큐
- 이벤트 발생 후, `백그라운드`에서 `태스크 큐`로 이벤트 리스너의 콜백 함수를 보낸다. 

# 논 블로킹 I/O 
이벤트 루프를 잘 활용하면 오래 걸리는 작업을 효율적으로 처리할 수 있다.

작업에는 두 가지 종류가 있는데, 동시에 실행가능한 작업과 그렇지 않은 작업이다.
기본적으로 자바스크립트 코드는 동시에 실행할 수 없지만, I/O 작업은 가능하다.

## 논블로킹
> 이전 작업이 완료될 때 까지 대기하지 않고 다음 작업을 수행
- `논 블로킹`과 `동시` 는 같은 의미가 아니다.
## 블로킹
> 이전 작업이 끝나야만 다음 작업 수행 

# 프로미스
자바스크립트와 노드에서는 주로 비동기를 접하고, 특히 `이벤트 리스너` 를 사용할 때 `콜백 함수` 를 자주 사용한다. 

ES2015 부터는 자바스크립트와 노드의 API들이 `콜백` 대신 `Promise` 기반으로 재구성되었는데, 이는 콜백 지옥을 극복했다는 평가를 받는다.

## 규칙
``` javascript
const condition = true;
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공!');
    } else {
        reject('실패!');
    }
});

// 다른 코드 들어갈 수 있음

promise
  .then((message) => {
    // 성공(resolve)한 경우 실행 
    console.log(message);
  })
  .catch((error) => {
    // 실패(reject) 한 경우 실행 
    console.error(error);
  })
  .finally(() => { // 끝나고 무조건 실행
  console.log('무조건!');
  });
```

1. `new Promise`를 통해 프로미스를 생성할 수 있으며, 그 내부에 `resolve`와 `reject`를 매개변수로 갖는 콜백함수를 생성
2. 1과 같이 만든 `promise` 변수에 `then`과 `catch` 메서드를 붙일 수 있다.
   1. `resolve`가 호출되면 -> `then` 실행
   2. `reject`가 호출되면 -> `catch` 실행
   3. `finally`는 성공/실패 여부와 관계없이 실행

## `Promise.all`
프로미스를 여러 개 한 번에 실행 
``` javascript
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

Promise.all([promise1, promise2])
    .then(result => {
        console.log(result); // ['성공1', '성공2'];
    })
    .catch((error) => {
        console.error(error);
    });
```

`Promise.resolve`는 즉시 resolve 하는 프로미스를 만든다. (reject도 존재) 

프로미스가 여러개 있을 때, `Promise.all`에 넣으면 모두 resolve될 때 까지 기다렸다가 then으로 넘어가고, Promise 중 하나라도 reject 되면 catch로 간다.

# async/await 
ES2017 부터 추가되었고, 노드처럼 비동기 위주 프로그래밍을 해야할 때 도움이 된다. 

## 이전
``` javascript
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((users) => {
            user.name = 'me';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender : 'm'});
        })
        .then((user) => {
            // ... 
        })
        .catch(err => {
            console.error(err);
        });
}
``` 

## 이후 
``` javascript
async function findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.name = 'me';
    user = await user.save();
    user = await User.findOne({ gender : 'm' });
    // ... 
}
``` 
`await Users.findOne({});` 는 resolve 될 때 까지 기다린 다음에 user를 초기화 한다. 

for 문과 `async/await` 을 같이 써서 프로미스를 순차적으로 실행할 수 도 있다. (since ES2018)

``` javascript
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

(async () => {
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();