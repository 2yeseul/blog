---
title: 'Observer Pattern'
date: 2021-12-02 00:00:00
description: "옵저버패턴을 정리합니다."
tags: [DesignPattern]
thumbnail:
---   

# Observer Pattern
![img1](https://refactoring.guru/images/patterns/diagrams/observer/structure-2x.png?id=228af9bded4d6ee6daf4)
> `옵저버 패턴` 은 한 객체(Subject)의 상태가 변할 때, 그 객체를 구독하는 다른 객체들에게 상태가 변화했음을 알린 뒤 자동으로 내용을 갱신하는 패턴이다.
> 일대다의 의존관걔를 가진다.

1. Publisher가 이벤트가 생겼음을 subscriber들에게 알린다. 이러한 이벤트는 publisher의 상태가 변경되었거나 어떤 행동을 했을 경우 생긴다.
   publisher들은 subscribe가 등록하고 나가는 메서드가 포함되어있다. (register/remove)
2. 새 이벤트가 생기면 publisher는 subscriber의 리스트로 가서 subscriber 인터페이스에 정의된 notification 메서드를 호출한다.
3. Subscriber 인터페이스는 notification 메서드를 정의해두었는데, 대부분의 경우 update 메서드를 포함한다. 이 메서드는 publisher로부터 업데이트와 관련하여
   넘어오는 데이터들의 parameter들을 가진다.
4. Subscriber의 구현체는 publisher의 notification에 대응해서 몇 가지 행동을 취한다.

## Subject(Publisher)
`Subject` 에는 보통 새 `observer`를 등록, 제거하는 메서드와 `Subject`를 구독하는 `Observer(Subscriber)`를 멤버변수로 가진다.
![img2](https://refactoring.guru/images/patterns/diagrams/observer/solution1-en-2x.png?id=a6bc643488b8fbc8bbb3)
출처 - https://refactoring.guru/design-patterns/observer

추가적으로, `Publisher`의 데이터가 변경되었음을 알리기 위하여, `Publisher`에 전체 구독자들에 알림을 보내는 notify 관련 메서드 역시 추가할 수 있다.
그 뒤, 각 `Subscriber` 들은 `update` 메서드를 통해 `Publisher`로부터 전달받은 값으로 업데이트를 한다.
![img3](https://refactoring.guru/images/patterns/diagrams/observer/solution2-en-2x.png?id=630cfb84753c258aa4e8)
출처 - https://refactoring.guru/design-patterns/observer