---
title: 'MultipleBagFetchException'
date: 2021-02-13 21:03:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  

오류 코드
```
org.hibernate.loader.MultipleBagFetchException: cannot simultaneously fetch multiple bag
```
한 엔티티에서 두 개 이상의 `@OneToMany`인 Bag 두 개 이상을 EAGER로 fetch할 때 발생하였다. 나의 경우에는 한 엔티티에서 두 엔티티 객체를 List 형식으로 OneToMany 매핑관계를 설정하였는데 계속해서 에러가 났다. 정말 힘들게 찾은 결과 아주 좋은 참고 자료가 있어 이렇게 정리하였다. (감사합니다..)

### 그렇다면 `Bag(Multiset)` 이란 뭘까? 
`Set`과 같이 순서가 없고 `List`와 같이 중복을 허락하는 자료구조이다. 자바 컬렉션에는 Bag을 지원하지 않기 때문에 하이버네이트는 Bag을 List로 활용한다.
- 참고 : Set은 중복을 허용하지 않고 순서를 보장하지 않는 컬렉션이고, List는 순서를 보장하고 중복을 허용하는 컬렉션이다.

### 해결
List르 선언된 것을 Set으로 변경하면 한 번에 해결된다! 🥺

이유는 찾아보는데 뭔가 명확하지는 않다..다만 하이버네이트가 다중 백 타입을 지원하지 않는 것 같다. 그래서 한 엔티티에서 @OneToMany를 여러번 써야할 상황이라면, List 타입은 한 번만 쓰는게 좋을 것 같다. 