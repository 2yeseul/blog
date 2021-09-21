---
title: '인터페이스'
date: 2021-01-08 02:48:00
description: ""
tags: [Java]
thumbnail: 
---  

# 인터페이스

인터페이스는 클래스와 비슷한 `레퍼런스 타입`인데, `abstract class` 보다 추상화 정도가 높기 때문에 abstract class와 달리, 몸통을 갖춘 일반 메서드와 멤버변수를 가질 수 없다. 

따라서 기능을 명시적으로 선언하는 역할로서 `abstract 메서드`와 `상수(static final)`, `default 메서드` `static 메소드`, `private 메소드`만으로 이루어져 있다. 구현된 코드가 없으므로 당연히 인터페이스를 통해 인스턴스를 생성할 수 없다.

## 정의

```cpp
(public) interface interfaceName {
	(public static final) type constantName = value;
	(public abstract) returnType methodName (...);
}
```

- `필드`는 `public static final` 을 생략하여도 자동으로 삽입된다.
- `메서드`는 모두 구현코드가 없는 `abstract 메소드`이다. `public abstract`를 적지 않아도 컴파일 과정에서 자동으로 추상 메소드로 변환된다.

실제로 컴파일러가 `public static final` 과 `public abstract`를 자동으로 삽입해주는지 바이트코드 뷰어로 살펴보았다.

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwI6j9%2FbtqSXje6sgy%2Fo7oil7ScwTaBvX0iMgL3T1%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FwI6j9%2FbtqSXje6sgy%2Fo7oil7ScwTaBvX0iMgL3T1%2Fimg.png)

인터페이스에서는 `public static final` 과 `public abstract`를 쓰지 않았지만, 컴파일된 바이트코드에서는 `public static final`과 `public abstract`가 자동으로 삽입된 것을 알 수 있다.

## 구현

인터페이스 자체로는 인스턴스(객체)를 생성할 수 없고, 추상메소드를 갖기 때문에 이 것을 `구체화`할 클래스가 필요하다. `implements` + `인터페이스명` 을 통해 인터페이스를 구현할 수 있다. 추상메소드에는 `public`이 생략되어 있기 때문에, 오버라이딩 할 때 `public`을 명시하여야 한다.

```java
public class className implements interfaceName {
	...
}
```

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcA2rJW%2FbtqSWapaaQ2%2FugiinAoQ1i9IMzCZobtfgK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcA2rJW%2FbtqSWapaaQ2%2FugiinAoQ1i9IMzCZobtfgK%2Fimg.png)

public을 명시하지 않으면 위와같이 오류가 난다.

### `@Override` 명시하는 이유?

`@Override` 가 없어도 메소드를 오버라이딩 하는데에는 문제없지만, 개발자가 메소드명을 잘못써도 컴파일 에러가 나지 않을 수 있는 경우를 방지하기 위해 annotation을 명시하여 해당 메소드를 오버라이딩하는 메소드임을 알려준다.

## 인터페이스 레퍼런스를 통해 구현체를 사용하는 방법

새 인터페이스를 정의하는 것은 새로운 `reference data type`을 정의하는 것과 같다. 데이터 유형을 사용하는 모든 곳에서 인터페이스를 레퍼런스 타입으로 사용할 수 있다. 인터페이스인 레퍼런스 변수를 정의하는 경우, 인터페이스 그 자체는 인스턴스화 할 수 없으므로, 할당된 모든 객체는 인터페이스를 구현해야한다.

- 인터페이스 변수는 `reference type`이기 때문에 구현객체가 대입될 경우 `객체의 번지가 저장`된다.

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyMP12%2FbtqSQ6gMkG4%2FYkWYcmZk4KlEIzrvAGsGDK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyMP12%2FbtqSQ6gMkG4%2FYkWYcmZk4KlEIzrvAGsGDK%2Fimg.png)

`인터페이스`의 메소드를 사용하고자 할 때, 레퍼런스 타입으로 사용할 수 있다. 

## 상속

인터페이스는 `인터페이스로부터만 상속`받을 수 있고, 클래스와 달리 `다중상속이 가능`하다. 인터페이스 간 상속은 구현 코드를 통해 기능을 상속하는 것이 아니므로, `형 상속(type inheritance)` 라고 부른다. 한 인터페이스가 여러 인터페이스를 상속받으면, 상속받은 인터페이스는 상위 인터페이스에 선언한 추상 메서드를 모두 가지게된다.

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnMo6M%2FbtqSPFcFvrU%2FNvq9KYMIwQQPKp3iC7QgV1%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnMo6M%2FbtqSPFcFvrU%2FNvq9KYMIwQQPKp3iC7QgV1%2Fimg.png)

`BaseballPlayer` 인터페이스는 `Batter`와 `Pitcher`를 상속받는다.

```java
public interface Pitcher {
    String sports = "Baseball";
    void pitchingHand(String hand);
}
```

```java
public interface Batter {
    void hittingHand(String hand);
}

```

```java
public interface BaseballPlayer extends Pitcher, Batter {
    void position(String position);
}
```

`BaseballPlayer`를 구현하는 클래스는 총 3개의 메소드를 구현해야한다.

```java
public class KBOPlayer implements BaseballPlayer {
    String name;

    KBOPlayer(String name) {
        this.name = name;
    }

    @Override
    public void position(String position) {
        System.out.println(this.name + "'s position is " + position);
    }

    @Override
    public void hittingHand(String hand) {
        System.out.println(this.name + "'s hitting hand is " + hand);
    }

    @Override
    public void pitchingHand(String hand) {
        System.out.println(this.name + "'s pitching hand is " + hand);
    }

    public static void main(String[] args) {
        KBOPlayer kboPlayer = new KBOPlayer("Daeho");
        KBOPlayer kboPlayer1 = new KBOPlayer("Hyun-jong");
        kboPlayer.hittingHand("right");
        kboPlayer1.pitchingHand("left");
    }
}
```

## default 메소드

`Java 8` 이상부터 default 접근 제어자를 사용할 수 있게 되었다. 인터페이스 내에서 직접 메소드를 구현한다는 의미의 접근 제어자이다.

- 기본 구현을 가지는 메소드이다. 메소드 앞에 `default` 예약어를 붙이고, 추상 메소드와 달리 일반 메소드처럼 `body{}` 를 가져야한다.
- 접근 제어자가 `public`이며, 생략할 수 있다.
- 인터페이스에 이미 구현되어 있으므로 인터페이스를 구현한 클래스에서 코드를 구현하지 않아도 되지만, `재정의`할 수는 있다.
- 디폴트 메소드를 사용하면 라이브러리의 인터페이스들에 새 기능을 추가하는 것이 가능하고, 해당 인터페이스들의 이전 버전을 위해 작성된 코드와의 호환성을 보존할 수 있다.
    - `라이브러리를 업데이트`할 때 인터페이스에 추가된 기능이 있다면, 이를 구현한 클래스를 추가해줘야 하는데, 이 라이브러리를 사용하는 사용자가 해당 인터페이스를 구현한 클래스를 구현하지 않으면 에러가 발생한다. 이러한 불편함을 해소하기 위해 default 키워드를 도입하였다.
    - 

    ![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2z9a7%2FbtqSQ4DevpD%2FdGJ5C4vtwKKSwoaGHtktAk%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2z9a7%2FbtqSQ4DevpD%2FdGJ5C4vtwKKSwoaGHtktAk%2Fimg.png)

    `java.util` 라이브러리의 `Collection` 인터페이스 중 default 메소드이다. 위와 같이 인터페이스 내에서 직접 구현된 것을 볼 수 있다.

### 여러 인터페이스의 디폴트 메소드 간의 충돌

인터페이스를 구현한 클래스에서 디폴트 메소드를 오버라이딩 해야한다.

### 디폴트 메소드와 상위 클래스의 메소드 간의 충돌

상위 클래스의 메소드가 상속되고, 디폴트 메소드는 무시된다.

## static 메소드

인스턴스 생성과 관계없이, 인터페이스 타입으로 호출하는 메소드이다. `static` 예약어를 사용하고, 접근제어자는 항상 `public`이지만 생략할 수 있다. 상속받는 클래스에서는 정적 메소드를 `오버라이딩`할 수 없다.

정적 메소드를 사용할 때는 인터페이스를 직접 참조하여 사용한다. → `interface명.정적메소드명()`

```java
public interface staticTest() {
	static void test(String str) {
		System.out.println("str");
	}
}
```

## private 메소드

인터페이스 내에서만 사용가능한 메소드이며, 디폴트 메소드나 정적 메소드에 사용하기 위해 작성되는 메소드이다. 인터페이스를 구현하는 클래스에서는 재정의할 수 없고, 디폴트나 정적 메소드를 통해서만 가능하다.

```java
public interface Circle {
	default void description() {
		myDescription();
	}
	static void ratio() {
		getRatio();
	}
	private void myDescription() {
		System.out.println("circle description");
	}
	private static void getRatio() {
		System.out.println("3.14");
	}
```

출처

[https://velog.io/@ednadev/자바-인터페이스Interface-디폴트-메서드와-static-메서드](https://velog.io/@ednadev/%EC%9E%90%EB%B0%94-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4Interface-%EB%94%94%ED%8F%B4%ED%8A%B8-%EB%A9%94%EC%84%9C%EB%93%9C%EC%99%80-static-%EB%A9%94%EC%84%9C%EB%93%9C)

[https://honbabzone.com/java/java-interface/](https://honbabzone.com/java/java-interface/)

[https://interconnection.tistory.com/129](https://interconnection.tistory.com/129)

[https://velog.io/@foeverna/Java-인터페이스-인터페이스의-요소들](https://velog.io/@foeverna/Java-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EC%9D%98-%EC%9A%94%EC%86%8C%EB%93%A4)
