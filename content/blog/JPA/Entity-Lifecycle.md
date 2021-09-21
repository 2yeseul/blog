---
title: '[JPA] Entity의 Life cycle'
date: 2021-01-13 22:00:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  
# 엔티티 매니저 팩토리와 엔티티 매니저

![https://media.vlpt.us/post-images/conatuseus/38dac7b0-cff5-11e9-825d-1977adc755dc/image.png](https://media.vlpt.us/post-images/conatuseus/38dac7b0-cff5-11e9-825d-1977adc755dc/image.png)

## 엔티티 매니저

- 엔티티의 CRUD 등 엔티티와 관련된 모든 일을 처리
- 엔티티 매니저는 여러 스레드가 동시에 접근하면 동시성 문제가 발생하므로 스레드 간에 절대 공유하면 안됨

## 엔티티 매니저 팩토리

- 엔티티 매니저를 만드는 공장
- 엔티티 매니저 팩토리는 생성하는 비용이 커서 한 개만 만들어 애플리케이션 전체에서 공유
- 여러 스레드가 동시에 접근해도 안전

# 영속성 컨텍스트

- `영속성 컨텍스트`란 **엔티티를 영구 저장하는 환경**이다.
- `EntityManager.persist(member);`
    - member 엔티티를 저장할 때 데이터베이스에 저장하는 것이 아닌 엔티티 매니저를 사용하여 회원 엔티티를 영속성 컨텍스트에 저장한다.
    - 엔티티 매니저를 생성할 때 하나만 만들어진다. 엔티티 매니저를 통해 영속성 컨텍스트에 접근과 관리를 할 수 있다.

# Entity의 상태

- `Transient`
- `Persistent`
- `Detached`
- `Removed`

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbiYa6T%2FbtqCuYYCtXY%2FBxqa5rHj3s4Rz33PQDmJFK%2Fimg.jpg](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbiYa6T%2FbtqCuYYCtXY%2FBxqa5rHj3s4Rz33PQDmJFK%2Fimg.jpg)

![https://media.vlpt.us/post-images/conatuseus/3861eed0-d482-11e9-9b0f-dd1a4f570095/image.png](https://media.vlpt.us/post-images/conatuseus/3861eed0-d482-11e9-9b0f-dd1a4f570095/image.png)

## Transient

```java
Account account = new Account();
account.setUserName("name");
account.setTitle("title");
```

- `JPA`가 모르는 상태
- 단순히 객체를 생성만 한 상태
- `영속성 컨텍스트` 나 `데이터베이스`와는 전혀 관계가 없는 상태

## Persistent

### 영속 상태란?

- `entityManager.persist();` 로 영속성 컨텍스트에 저장된 상태
- `entityManager.find();` 로 조회할 때, 영속성 컨텍스트 1차 캐시에 없어서 DB에서 조회한 후 해당 Entity를 1차 캐시에 올린 상태(엔티티 매니저가 관리중)

### JPA가 관리중인 상태

```java
// 1) 객체를 생성한 상태 - Transient
Account account = new Account();
account.setUserName("name");
account.setUserId("id");
EntityManager entityManager = entityManagerFactory.createEntityManager();
entityManager.getTransaction().begin();
// 2) 객체를 저장한 상태 - Persistent
entityManager.persist(account);
```

- `save`를 하는 시점부터는 JPA가 account 객체를 `인지`하고 `관리`를 하기 시작하는 것이다.
- 영속 상태가 된다고 DB에 쿼리가 바로 날라가는 것이 아니다.(insert문이 날라가지 않음 = 저장 X)
    - `EntityManager.persist(account);`
- 저장할 시점이 되어야 insert문이 날라간다.
    - `transaction.commit();`
- `1차 캐시`, `Dirty Checking`, `Write Behind` 등등 지원

## Detatched

### 준영속 상태

- 영속성 컨텍스트에 저장되었다가 분리된 상태
- 영속성 컨텍스트에서 지운 상태
- 준영속 상태에서는 영속성 컨텍스트가 제공하는 기능을 사용하지 못함
    - Dirty Checking, Update Query
- `entityManager.detatch(account);`

## Removed

- 실제 DB 삭제를 요청한 상태
- `entityManager.remove(account);`

## 예시

```java
Account account = entityManager.find(Account.class, 150L);
account.setName("name");
transaction.commit();
```

- `entityManager.find()`

    1차 캐시에 없으므로 DB에서 조회한 Entity를 1차 캐시에 넣는다 → 영속상태

- 변경 감지(Dirty Checking)
    - 이름 변경에 대한 Entity 데이터 변화 감지
    - 1차 캐시의 Entity와 Snapshot이 다른 것을 감지하고 UPDATE Query를 날린다.

## 준영속 상태로 만들기 (영속 → 준영속)

1. `entityManager.detach(entity)` : 특정 엔티티만 준연속 상태로 전환
    - JPA가 관리하지 않는 객체가 됨
    - Transaction commit에서 아무일도 발생하지 않음
    - Entity가 변경이 되었지만 실제로 UPDATE Query X
    - 직접 쓸일 X
2. `entityManager.clear()` : 영속성 컨텍스트를 완전히 초기화
    - clear 후 Entity 다시 조회할 때는 SELECT Query가 나감
    - 1차 캐시에 상관없이 쿼리를 확인하고 싶을 때, 즉 testcase 작성 시에 도움이 된다.
3. `entityManager.close()` : 영속성 컨텍스트를 종료
    - JPA의 관리대상 X

출처

[https://n1tjrgns.tistory.com/249](https://n1tjrgns.tistory.com/249)

[https://gmlwjd9405.github.io/2019/08/08/jpa-entity-lifecycle.html](https://gmlwjd9405.github.io/2019/08/08/jpa-entity-lifecycle.html)

[https://velog.io/@conatuseus/2019-09-06-0009-작성됨-cfk06vdfm9](https://velog.io/@conatuseus/2019-09-06-0009-%EC%9E%91%EC%84%B1%EB%90%A8-cfk06vdfm9)