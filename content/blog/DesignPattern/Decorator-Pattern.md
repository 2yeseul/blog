---
title: 'Decorator Pattern'
date: 2021-12-11 00:00:00
description: "데코레이터 패턴을 정리합니다."
tags: [DesignPattern]
thumbnail: 
---   
# Decorator Pattern
![img1](https://refactoring.guru/images/patterns/diagrams/decorator/structure-2x.png)
[출처 - https://refactoring.guru/design-patterns/decorator]

> **데코레이터 패턴** 에서는 객체에 추가적인 요건을 동적으로 첨가한다. 데코레이터는 서브 클래스를 만드는 것을 통해 기능을 유연하게 확장한다.
> 구조적 디자인 패턴의 일종으로, 어떠한 객체에 새로운 행동을 추가하고 싶을 때 상속이 아닌 새로운 wrapper 객체를 만들어 그 행동들을 포함하도록 하는 것이다.

- `ConcreteComponent`에 새로운 행동을 동적으로 추가한다. 
- 각 데코레이터(BaseDecorator) 안에는 `Component` 객체가 들어있다. 즉 데코레이터에는 구성요소에 대한 레퍼런스가 들어있는 인스턴스 변수가 있다.
- `ConcreteDecorator` 에는 그 객체가 장식하는 것(데코레이터가 감싸고 있는 Component 객체)를 위한 인스턴스 변수가 있다.
  - 컴포넌트에 동적으로 추가적인 행동이 정의될 수 있다. 
  - `ConcreteDecorator`는 `BaseDecorator`의 메서드들을 오버라이드 하며, 부모 메서드가 호출되기 전이나 후에 행동을 실해한다.