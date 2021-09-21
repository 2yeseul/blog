---
title: 'DI/IoC'
date: 2021-01-03 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

# DI / IoC

## 의존성 주입(Dependency Injection)

### 정의

객체를 직접 생성하는 것이 아니라, 외부에서 생성한 후 주입을 하는 방법이다.

### DI의 가장 큰 목적

- 객체 간의 결합도를 느슨하게 하고(의존성을 낮추고) 확장이 용이하게 하여 객체지향적 프로그래밍을 가능하게 한다.
- 스프링에서는 `Spring 컨테이너`, `IoC 컨테이너`라는 개념을 사용한다. 컨테이너는 인스턴스의 생명주기를 관리하며, 생성된 인스턴스에게 추가적인 기능을 제공한다.
- 즉 컨테이너는 사용자가 작성한 코드의 처리과정을 위임받은 독립적인 존재다. 이 때문에 제어권이 사용자에게 있는 것이 아니라 컨테이너에게 있게되는 즉, `Inversion Of Control`이 발생하게 되는 것이다. 적절한 설정만 컨테이너에 되어있다면 프로그래머가 작성한 코드를 스스로 참조하여 객체의 생성과 소멸을 사용자 대신 컨트롤한다.

---

### 의존성 주입 예시

```java
public class Car {
	private Tire tire;
	public Car(){
	tire = new Tire();
	}
}
```

의존성은 new 키워드를 통해 만들어지는데, 따라서 Car는 Tire에 종속된다. 즉 Tire의 제어권은 Car에게 있다. 

```java
public class Car {
	private Tire tire;
	public Car(Tire tire){
		this.tire = tire;
	}
}
public CarTest {
	Tire tire = new Tire();
	Car car = new Car(tire);
}
```

하지만 위와 같이 생성자를 통해 의존성을 주입한다면, Tire의 제어권이 CarTest에 있게된다. 즉 CarTest가 Tire에 의존성을 갖는다. 이처럼 의존성을 역전시켜 제어권을 직접 갖지 않는 것이 IoC이며, 의존성을 외부에서 주입시키는 것이 DI이다.

## 주입의 종류

### `생성자`를 통한 의존성 주입

```java
public class Dessert {
	private final CakeService cakeService;
	private final DrinkService drinkService;
	
	@Autowired
	public Dessert(CakeService cakeService, DrinkService drinkService) {
			this.cakeService = cakeService;
			this.drinkService= drinkService;
		}
}
```

### `Setter`를 통한 주입

```java
public class Dessert {
	private final CakeService cakeService;
	private final DrinkService drinkService;
	
	@Autowired
	public void setCakeService(CakeService cakeService) {
			this.cakeService = cakeService;
	}
	@Autowired
	public void setDrinkService(DrinkService drinkService) {
			this.drinkService = drinkService;
	}
}
```

### `Field`를 통한 주입

```java
public class Dessert {
	@Autowired
	private final CakeService cakeService;
	@Autowired
	private final DrinkService drinkService;
}
```

## 생성자 주입을 권장하는 이유

### 순환 참조 방지

A가 B를 참조하고, B가 다시 A를 참조하는 순환참조가 일어난다고 가정하자. `생성자 주입`의 경우 `BeenCurrentlyInCreationException`이 발생하여 애플리케이션이 구동되지 않는다.

- `setter 주입` : setter 주입에서는 우선 주입 받는 빈의 생성자를 호출하여 빈을 찾거나, 팩토리에 등록한다. 그 후 생성자 인자에 사용하는 빈을 찾거나 만든다. 그 이후 주입하려는 빈 객체의 setter를 호출하여 주입한다.
- `field 주입` : 수정자 주입 방법과 동일하게 먼저 빈을 생성한 뒤 어노테이션이 붙은 필드에 해당하는 빈을 찾아서 주입하는 방식이다. 즉 빈을 먼저 생성한 후 필드에 대해서 주입한다.
- `생성자 주입` : 생성자로 객체를 생성하는 시점에 필요한 빈을 주입한다. 먼저 생성자의 인자에 사용되는 빈을 찾거나 빈 팩토리에서 만든다. 그 후에 찾은 인자 빈으로 주입하려는 빈의 생성자를 호출한다. 즉 빈을 먼저 생성하는 것이 아니다.

따라서 `순환참조`는 생성자 주입에서만 문제가 된다. 객체 생성 시점에 빈을 주입하기 때문에 서로 참조하는 객체가 생성되지 않은 상태에서 그 빈을 참조하기 때문에 오류가 발생한다.

### 테스트 용이

테스트 코드를 좀 더 편리하게 작성할 수 있다. 필드 주입같은 경우에 객체 생성만으로는 의존성을 주입할 수 없기 때문에, 테스트 코드를 작성할 때 `@Mock` 을 사용하여 주입해야한다. 하지만 생성자를 통한 주입은 객체를 생성한 뒤 생성자에 넣어주기만 하면 된다.

### final로 선언할 수 있다.

`필드 주입`과 `setter 주입`은 해당 필드를 `final`로 선언할 수 없다. 따라서 초기화 후 Bean 객체가 변경될 수 있지만, 생성자 주입의 경우에는 필드를 `final`로 선언할 수 있다. 따라서 필드 주입인 경우 null값이 되는게 가능하기 때문에 `NullPointerException` 발생 위험이 있는데, 생성자 주입은 final 변수 선언을 통해 null이 되는 것이 불가능하다.

### 의존관계 파악

생성자의 파라미터를 통해 의존관계를 한 눈에 파악할 수 있고, 리팩토링의 필요성을 얻을 수 있다. (Constructor의 파라미터가 많아짐과 동시에 하나의 클래스가 많은 책임을 떠안다는 것을 알게된다.)

출처

[https://iseunghan.tistory.com/58](https://iseunghan.tistory.com/58)

[https://madplay.github.io/post/why-constructor-injection-is-better-than-field-injection](https://madplay.github.io/post/why-constructor-injection-is-better-than-field-injection)

[https://devfunny.tistory.com/263](https://devfunny.tistory.com/263)