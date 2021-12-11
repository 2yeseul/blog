---
title: 'Strategy Pattern'
date: 2021-10-02 22:38:00
description: "전략패턴을 정리합니다."
tags: [DesignPattern]
thumbnail:
---   


# Strategy Pattern
![img](http://wiki.hash.kr/images/0/08/%EC%A0%84%EB%9E%B5%ED%8C%A8%ED%84%B4%EC%BB%AC%EB%A0%88%EB%B3%B4%EB%A0%88%EC%9D%B4%EC%85%98.PNG)
알고리즘군을 정의하고 각각을 캡슐화하여 교환해서 사용할 수 있도록 만든다. Strategy pattern을 활용하면 알고리즘을 사용하는 클라이언트와는 독립적으로 알고리즘을 변경할 수 있다.


즉 하나의 결과를 만드는 목적(메소드)는 동일하나, 그 목적을 달성할 수 있는 방법(전략, 알고리즘)이 여러가지 존재할 경우에 사용하는 패턴이다.
Context의 변경을 최소화하고, 인터페이스를 통해 다양한 타입을 만들어 코드를 변경할 수 있다.
## 장점
- 코드 중복 방지, 런타임 시점에서의 메서드 변경, 기능 확장 용이
- 개발 중 IF-ELSE 많은 경우 사용할 수 있음

# 문제
상위 클래스 Duck을 상속받는 다양한 자식 클래스들이 있고, 오리들이 날 수 있는 기능을 추가하는 경우
1. super 클래스에 fly() 메서드를 추가했을 때, 날 수 없는 오리(장난감 오리), 즉 서브클래스에 적합하지 않은 행동까지 추가됨
2. 상위 클래스인 Duck을 interface로 만들어 모든 하위 클래스들이 그 행동을 구현하게 하는 경우엔 서브 클래스들의 메서드를 하나 하나 다 살펴보아야 함

-> 코드 재사용을 전혀 기대할 수 없으므로 코드 관리 면에서 다른 문제점이 생김

# 해결 방안
바뀌는 부분을 따로 뽑아 캡슐화

-> 나중에 바뀌지 않는 부분에는 영향을 미치지 않게 하며, 그 부분만 고치고 확장할 수 있음

-> 시스템 유연성 확장

# 바뀌는 부분과 바뀌지 않는 부분

fly(), quack() -> 오리 마다 달라지는 부분

두 행동을 Duck 클래스로부터 분리 -> 각 행동을 나타낼 클래스 집합 새로 만든다

![img2](https://snowdeer.github.io/assets/design-pattern-headfirst/strategy-1024x520.png)

# Reference
Head First Design Pattern

https://github.com/Youngerjesus/design-pattern#Strategy

https://velog.io/@ljinsk3/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-Strategy-Pattern