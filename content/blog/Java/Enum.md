---
title: 'Enum'
date: 2021-01-30 00:20:00
description: ""
tags: [Java]
thumbnail: 
---  

- enum 정의하는 방법
- enum이 제공하는 메소드 (values()와 valueOf())
- java.lang.Enum
- EnumSet

# Enum

## Enum이란?

- `Enum Type`은 변수가 미리 정의 된 상수 집합이 되도록하는 데이터 유형이다. Enum으로 선언된 변수는 사전에 정의된 상수 값 중 하나와 값이 같아야한다.
- 컴파일 시점에 모든 가능한 값을 알 때 사용한다. (메뉴 선택 같은 것들)
- 모든 enum 상수는 항상 암시적으로 `public static final`이다. `static`이기 때문에 enum의 이름을 통해 접근할 수 있다. 또한 `final`이기 때문에 자식을 상속할 수 없다.

## 정의 방법

```java
public enum Day {
	SUNDAY, MONDAY, TUESDAY, WEDNESDAY,
	THURSDAY, FRIDAY, SATURDAY
}
```

- 고정된 상수 집합을 나타내야 할 때 마다 enum을 사용해야한다.
- enum 내에 `main` 메소드를 선언할 수 있다. 따라서 enum을 바로 명령 프롬포트에서 호출가능하다.

## enum과 상속

- 모든 enum은 암묵적으로 `java.lang.Enum`을 상속한다. 클래스가 오직 단 하나의 부모 클래스만을 상속할 수 있기 때문에, enum은 아무 것도 상속할 수 없다.
- `toString()`은 `java.lang.Enum` 에 오버라이딩 되었다.
- `enum`은 많은 인터페이스들을 구현할 수 있다.

### 사용

```java
public class EnumTest {
	Day day;
	
	public EnumTest(Day day) {
			this.day = day;
	}
	
	public void tellItLikeItIs() {
		switch(day) {
			case MONDAY:
				System.out.println("Mondays ard bad");
				break;
			case FRIDAY:
				System.out.println("Fridays ard better);
				break;
				...
		}

}
```

## values(), valueOf(), ordinal()

- java.lang.Enum에 존재
- `values()`는 enum 내에있는 모든 값을 반환할 수 있다.
- `valueOf()`는 지정된 상수 문자열이 있는 경우 반환한다.
- `ordinal()`을 사용하여 배열 인덱스와 마찬가지로 enum 상수 인덱스를 찾을 수 있다.

# EnumSet

## 정의

`EnumSet`은 `Set` 인터페이스의 특수 구현 중 하나인데, enum 형을 사용하기 위함이다. 

## 기능

- `AbstractSet` 클래스를 상속하고, `Set` 인터페이스를 구현한다.
- `EnumSet`은 `Java Collection Framework` 중 하나이며, 동기화되지 않는다.
- `HashSet` 보다 성능이 빠르고 좋다.
- EnumSet의 모든 요소는 set이 명시적 혹은 암시적으로 만들어질 때 지정되는 단일 열거형에서 가져와야한다.
- null 객체를 허용하지 않으며 만약 null이 들어올 경우 `NullPointerException`을 throw한다.
- `fail-safe iterator`를 사용하므로 `ConcurrendModificationException`이 발생하지 않는다.
    - `fail-safe iterator`

        실제 `Collection`의 `복제본`을 작성하고 반복한다. 반복자가 작성된 후에 수정이 발생해도 사본은 그대로 유지된다. 따라서 이 반복자는 기존 Collection을 수정하더라도 계속 반복된다.

        단점 중 하나는 Iterator가 실제 컬렉션 대신 복제본에서 작업하므로 컬렉션에서 업데이트 된 데이터를 반환하지 않는다는 것이다.

        또 다른 단점은 시간과 메모리에 관하여 컬렉션의 사본을 작성하는 오버헤드이다. (?)

        - ↔ `fail-fast`

            fail-fast는 가능한 빨리 실패를 노출하고 전체 작업을 중지하여 작업을 멈추지만, file-safe는 장애 발생 시 작업을 중단하지 않는다. ArrayList, HashMap과 같은 java.util 패키지의 컬렉션이 fail-fast에 해당한다.

    - `ConcurrendModificationException`

        어떤 쓰레드가 Iterator가 반복중인 Collection을 수정하는 경우 발생한다.

        etc) 반복문에서 remove 대신 add(i)를 한다고 가정할 때, 한 번 반복이 실행될 때 마다 리스트에는 값이 하나 더 더해진다. 이 반복문은 결국 무한루프가 될 것이다. 또한 반복문 내부에서 여러 작업을 하면 리스트가 조작되기 때문에 엘리먼트의 인덱스가 실시간으로 변경된다.

        - `Iterator`로 반복하는 엘리먼트의 `수정`
        1. `for( ; ; )`
        2. `CopyOnWriteArray`
        3. 자체적으로 다른 리스트를 만들고 해당 리스트에 수정할 값을 넣은 후 반복이 끝난 후 한꺼번에 수정 → `fail-safe`!
        4. `removeIf` / `lambda` 

![https://media.geeksforgeeks.org/wp-content/uploads/20200911115830/EnumSetinJava.png](https://media.geeksforgeeks.org/wp-content/uploads/20200911115830/EnumSetinJava.png)

## 선언

```java
public abstract class EnumSet<E extends Enum<E>>
```

### 예시

```java
enum STUDY { CODE, LEARN, CONTRIBUTE, QUIZ, MCQ };

...
EnumSet<STUDY> set1, set2, set3, set4;

set1 = EnumSet.of(STUDY.QUIZ, STUDY.CONTRIBUTE);
set2 = EnumSet.complementOf(set1);
set3 = EnumSet.allOf(STUDY.class);
set4 = EnumSet.range(STUDY.CODE, STUDY.CONTRIBUTE);
...
```

참고

[https://simuing.tistory.com/261](https://simuing.tistory.com/261)

[https://imasoftwareengineer.tistory.com/85](https://imasoftwareengineer.tistory.com/85)