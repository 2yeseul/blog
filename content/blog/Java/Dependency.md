---
title: 'Dependency'
date: 2021-01-02 00:00:00
description: ""
tags: [Java]
thumbnail: 
---  

# 의존성이란?

```java
public class Car {
	Tire tire;
	public Car(){
	tire = new Tire();
	}
}
```

와 같은 코드가 있을 때, `Car`의 생성자는 `Tire`객체를 새로 생성한다. 자동차라는 객체는 타이어를 생산해야(가져야)하므로, Car는 Tire에 `종속`된다.

즉, 한 클래스(A) 내에서 다른 클래스(B)가 `new로 객체화`될 때(참조할 때), `A는 B에 의존성을 가진다`라고 표현할 수 있다.

→ 하지만 이러한 방식은 두 객체 사이에 `결합도` 가 높으므로 Tire의 타입이 변하면 Car도 수정해야한다. 즉 하나의 모듈이 바뀌어 의존하는 다른 모듈까지 변경해야 한다.

# 스프링 없이 의존성 주입하기

## 생성자를 통한 의존성 주입

생성자를 통한 주입

이전의 방식

```java
public class Car{
	Tire tire;
	public Car() {
		tire = new KoreaTire();
		}
	}
public class Car {
	Tire tire;
	public Car(Tire tire) {
		this.tire = tire;
	}
}
```

### 장점

- 기존 코드에서는 Car가 구체적으로 KoreaTire or AmericaTire를 생산할지 결정한다 → 유연성이 떨어지고, KoreaTire와 AmericaTire를 정확하게 알고있어야 하므로 확장이 어렵다.
- 생성자를 통해 의존성을 주입하면, 어떤 타이어를 생산해서 장착할지에 대한 여부를 Car가 결정하는 것이 아니라 운전자가 고민한다.