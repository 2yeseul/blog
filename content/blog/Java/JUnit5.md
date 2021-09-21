---
title: 'JUnit5'
date: 2021-01-02 00:00:00
description: ""
tags: [Java]
thumbnail: 
--- 

# JUnit 5

## JUnit5란 무엇인가?

Junti은 이전 Junit과 달리, 3개의 다른 서브 프로젝트로부터 각기 다른 모듈들로 구성되어있다.

> ***JUnit 5 = Junit Platform + JUnit Jupiter + Junit Vintage***

Java 8부터 지원

### Junit Platform

Junit Platform은 JVM 환경에서 테스팅 프레임워크를 실행(launch)하기 위한 기초이다. 또한 플랫폼에서 가동되는 테스팅 프레임워크를 개발하기 위한 `TestEngine` API를 정의한다. 더 나아가, 플랫폼은 Command Line으로 플랫폼을 구동할 수 있는 `Console Launcher` 와 Junit 4 기반 환경에서의 플랫폼에서도 가동할 수 있는 Test Engine을 제공한다.

### Junit Jupiter

Junit Jupiter는 테스트 개발 모델과 새로운 테스트를 작성하기 위한 확장 모델로 구성된다. Jupiter의 하위 프로젝트는 플랫폼에서 Jupiter 기반 테스트를 실행하기 위한 `TestEngine`을 제공한다.

### Junit Vintage

Junit Vintage는 JUnit 3과 JUnit 4 기반 테스트를 실행할 때 `TestEngine` 을 제공한다.

### 사용해보기

Intelli의 Spring Initializer로 프로젝트를 생성하면 `spring-boot-starter-test` 때문에 Junit을 사용할 수 있다.

간단한 테스트용 클래스를 작성한 뒤, 테스트를 해보았다!

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrcnbC%2FbtqP4kHxeAm%2FAKa7sQTSBipbYxcM1NhMSk%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrcnbC%2FbtqP4kHxeAm%2FAKa7sQTSBipbYxcM1NhMSk%2Fimg.png)

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

```java
package com.example.junit5test.Calculator;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MyFirstJUnitJupiterTest {

    private final Calculator calculator = new Calculator();

    @Test
    void addition() {
        assertEquals(2, calculator.add(1, 1));
    }

}
```

## Annotation

대부분의 중요한 어노테이션은 `junit-jupiter-api` 모듈에 있는 `org.junit.jupiter.api` 패키지에 있다.

| Annotations                                                  | Describes                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [@Test](https://www.notion.so/Test-c308d1cbc70d490c8a431a882f2bcebc) | 해당 메서드가 테스트 메서드임을 나타낸다.                    |
| [@ParameterizedTest](https://www.notion.so/ParameterizedTest-8ef0a8cacb4a4ad28c968f891e2889a7) | 해당 메서드가 매개변수를 받는 테스드 메서드임을 나타낸다.    |
| [@RepeatedTest](https://www.notion.so/RepeatedTest-72912f0e668d4773ad31d53d8b4736c7) | 해당 메서드가 반복 테스트를 위한 테스트 템플릿임을 나타낸다. |
| [@TestFactory](https://www.notion.so/TestFactory-752f6a2931084851ac02d162f4852b8f) | 해당 메서드가 동적 테스트를 위한 테스트 팩토리임을 나타낸다. |
| [@TestTemplate](https://www.notion.so/TestTemplate-6665ee3a6e2f4bd79b4be81be59cf4a1) | 해당 메서드가 공급자에 의해 여러 번 호출되도록 설계된 테스트 케이스 템플릿임을 나타낸다. |
| [@TestMethodOrder](https://www.notion.so/TestMethodOrder-b6b894dab4da4f9d8fef70b880a2834f) | 어노테이션이 달린 테스트 클래스에 대해서, 테스트 메스트 실행 순서를 구성하는데 사용한다. Junit 4의 `@FixedMethodOrder`과 유사하다. |
| [@TestInstance](https://www.notion.so/TestInstance-ba101e9a95dd4b35aa86a88cd12515e8) | 어노테이션이 달린 테스트 클래스에 대해서, 테스트 인스턴스의 생명주기를 구성하는데 사용된다. |
| [@DisplayName](https://www.notion.so/DisplayName-96ae9d74033946f6ba21b106cbb9dcb1) | 테스트 클래스나 테스트 메서드의 사용자 정의 이름을 선언할 때 사용 |
| [@DisplayNameGeneration](https://www.notion.so/DisplayNameGeneration-a095b24c423e41ceb52275f6286e30db) | 테스트 클래스에 대한 사용자 정의 이름 생성기를 선언한다.     |
| [@BeforeEach](https://www.notion.so/BeforeEach-185e36d41c8d4a089e185ebddacf92c6) | 해당 메서드가 각각의 테스트(`@Test, @RepeatedTest, @ParameterizedTest, @TestFactory)`를 실행하기 전 실행하는 메서드임을 나타낸다. |
| [@AfterEach](https://www.notion.so/AfterEach-e5303f62ebd74289944f21440648c33d) | 해당 메서드가 각각의 테스트(`@Test, @RepeatedTest, @ParameterizedTest, @TestFactory)`를 실행한 뒤 실행하는 메서드임을 나타낸다. |
| [@BeforeAll](https://www.notion.so/BeforeAll-4cc450d3d39c4f8e98059f2e277ee838) | 현재 클래스가 실행되기 전에 실행할 메서드. `static`이어야함  |
| [@AfterAll](https://www.notion.so/AfterAll-af814eb809e540ceb25dff0f8a0c05b1) | 현재 클래스가 실행된 후에 실행할 메서드. `static`이어야함    |
| [@Nested](https://www.notion.so/Nested-b0846515fa61448091ca912bc8b762ca) | 해당 클래스가 static이 아닌 중첩 테스트 클래스임을 나타낸다. `@BeforeAll`과 `@AfterAll` 메서드는 `@Nested` 테스트 클래스에서 직접적으로 사용할 수 없다. |
| [@Tag](https://www.notion.so/Tag-bee87595895c4ca69f5b251796461077) | 클래스 또는 메서드 레벨에서 테스트를 필터링 하기 위해 태그를 선언할 때 사용된다. |
| [@Disabled](https://www.notion.so/Disabled-a78a14fe17c44f53b04f0943adec9446) | 테스트 클래스나 메서드를 사용할 수 없도록 할 때 사용된다.    |
| [@Timeout](https://www.notion.so/Timeout-f30cd198e37249d494c2b0505136dfd1) | 만약 테스트, 테스트 팩토리, 테스트 템플릿 또는 생명주기 메서드가 주어진 실행 시간을 초과할 때, 실패하도록 할 때 사용된다. |
| [@ExtendWith](https://www.notion.so/ExtendWith-408dd8fd48ff4e33b7bebcd0ee168827) | 선언적으로 확장을 등록할 때 사용된다.                        |
| [@RegisterExtension](https://www.notion.so/RegisterExtension-ec2c4a7f982042ed82a474c0b06e2b49) | field를 통해 프로그래밍 방식으로 확장을 등록할 때 사용된다.  |
| [@TempDir](https://www.notion.so/TempDir-858e4ef1286c401f897a576b37e16dd9) | 생명주기 메서드나 테스트 메서드에서, field나 파라미터 삽입을 통해 임시 디렉토리를 제공할 때 사용한다. |




### Meta-Annotations and Composed Annotations (사용자 정의 어노테이션)

JUnit Jupiter 어노테이션은 **메타 어노테이션**으로 사용할 수 있다. 즉 자동으로 메타 어노테이션의 의미들을 상속하는 사용자 정의 어노테이션을 생성할 수 있다!

**Fast Annotation**

```java
package com.example.junit5test.Meta;
import org.junit.jupiter.api.Tag;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Tag("fast")
public @interface Fast {
}
```

- `@Tag("fast")`를 `@FAST`로 대신 사용할 수 있다
- `@inteface`  : 커스텀 어노테이션을 정의할 때 사용한다.
- `@Target` : 어노테이션을 적용할 수 있는 대상(위치)를 나타낸다. Target에 선언된 대상과 다른 대상에 어노테이션을 적용할 경우 컴파일 에러 발생
- `@Retention` : 어노테이션이 어떤 시점까지 유지 되는지 알 수 있다.
  - SOURCE : 컴파일 시점에 컴파일러에 의해 제거. 즉 java파일 내에서만 적용
  - CLASS : SOURCE 뿐만 아니라 class파일 까지 적용됨
  - RUNTIME : SOURCE, CLASS뿐만 아니라 JVM에서 실행될 때도 적용된다. 리플렉션으로 어노테이션 조회 가능.

**Test Annotation**

```java
@Fast
@Test
void myFastTest() {
}
```

**@Fast와 @Test 섞은 @FastTest로 선언 가능**

```java
@FastTest
void myFastTest() {
}
```

### Test Classes and Methods

- **Test Class**

  최소 한 개 이상의 테스트 메서드를 포함하고 있는 최상위 클래스, `static` 멤버 클래스, `@Nested` 클래스

- **Test Method**

  `@Test`, `@RepeatedTest`, `@ParameterizedTest`, `@TestFactory`, `@TestTemplate` 로 선언된 메서드

- **Lifecycle Method**

  `@BeforeAll`, `@AfterAll`, `@BeforeEach`, `@AfterEach` 로 선언된 메서드

### Display Names

`@DisplayName`을 통해 테스트 클래스와 메스드는 커스텀 디스플레이 네임을 가질 수 있다. 공백, 특수문자, 이모지 까지 사용가능하다!

```java
package com.example.junit5test.DisplayName;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Display Name Demo🤓")
public class DisplayNameDemo {
    @Test
    @DisplayName("공백 공백 공백 ")
    void testWithDisplayNameContainingSpaces() {
    }

    @Test
    @DisplayName("╯°□°）╯")
    void testWithDisplayNameContainingSpecialCharacters() {
    }

    @Test
    @DisplayName("🎄")
    void testWithDisplayNameContainingEmoji() {
    }

}
```

### ⭐️Assertions

JUnit Juptier는 JUnit 4에서 사용하던 assertion 메서드를 포함하고 Java 8 람다에도 잘 사용할 수 있게끔 몇가지를 더 추가하였다. 모든 JUnit Jupiter assertion은 `org.junit.jupiter.api.Assertions`에 있는 `static` 메서드이다.

Assertion, 즉 단정문은 메서드를 사용하여 테스트에서 검증하고자 하는 내용을 확인한다. 테스트가 조건에 맞지 않다면 에러를 던진다.

| Methods                                                      | Describe                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [assertAll(executables..)](https://www.notion.so/assertAll-executables-3497c0e58b034fa19ade53ba042bc2aa) | 함수형 인터페이스를 파라미터로 받을 수 있다. 기본적으로 파라미터들은 `람다형`으로 선언된다. 테스트를 검증하는 assertNotNull, assertTrue 등의 검증을 모두 묶어 한 번에 처리가 가능하다. |
| [assertNotNull(actual)](https://www.notion.so/assertNotNull-actual-90ae39c06e344a9ba81a36df8b478ee5) | 해당 값이 `null`인지를 검사해준다.                           |
| [assertEquals(expect, actual)](https://www.notion.so/assertEquals-expect-actual-6cfd8191871f4cfa9f1183c504798a4d) | 기대값(expect)가 실제값(actual)과 같은지를 확인한다. 세번 째 파라미터로 `message`를 추가하여 테스트가 실패했을 때 메시지를 던진다. |
| [assertTrue(actual)](https://www.notion.so/assertTrue-actual-b29bccb918e847e79fe5c016c369277b) | 파라미터의 조건이 참인지 확인할 때 사용한다.                 |
| [assertThrows(expectedType, executable)](https://www.notion.so/assertThrows-expectedType-executable-c0f79b8bdfb246559dcc2f9747a161dd) | 내가 만든 예외 메시지와 실제 에러 메시지가 같은지 확인할 때 사용한다. |
| [assertTimeout(duration, executable)](https://www.notion.so/assertTimeout-duration-executable-5be4c723beba46e1b7efd8e309c584f9) | 특정시간 내에 실행하는지 확인한다.                           |
| [assertTimeoutPreemptively(duration, executable)](https://www.notion.so/assertTimeoutPreemptively-duration-executable-e24221c9242349cb8f8215161cc252b6) | 특정시간 내에 실행하는지 확인 후, 시간을 초과하면 실행 파일의 실행이 중단되도록 설정한다. 하지만 executable과 다른 스레드에서 실행하기 때문에, Thread Local을 사용하는 코드라면 예상하지 못한 결과를 얻을 수 있다. ex) 트랜잭션 적용이 안되어서 롤백이 안되는 경우 |




실습

```java
package com.example.Assertions;

import com.example.junit5test.Cal.Calculator;
import com.example.junit5test.Person.Person;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AssertionsDemo {
    private final Calculator calculator = new Calculator();
    private final Person person = new Person("Jane" , "Doe");

    @Test
    @DisplayName("Calculator Test")
    void standrdAssertions() {
        assertEquals(2, calculator.add(1, 1));
        assertEquals(6, calculator.multiply(3, 2) ,
                "The optional failure message is now the last parameter");
        assertTrue('a' < 'b', () -> "Assertion messages can be lazily evaluated --" +
                "to avoid constructing complex messages unnecessarily.");
    }

    @Test
    @DisplayName("Person Test - group")
    void groupAssertions() {
        assertAll("person",
                () -> assertEquals("Jane", person.getFirstName()),
                () -> assertEquals("Doe", person.getLastName())
        );
    }

    @Test
    @DisplayName("Person Test - dependent")
    void dependentAssertions() {
        assertAll("properties",
                () -> {
                    String firstName = person.getFirstName();
                    assertNotNull(firstName);
                    assertAll("first name",
                            () -> assertTrue(firstName.startsWith("J")),
                            () -> assertTrue(firstName.endsWith("e"))
                    );
                },
                () -> {
                    String lastName = person.getLastName();
                    assertNotNull(lastName);
                    assertAll("last name",
                            () -> assertTrue(lastName.startsWith("D")),
                            () -> assertTrue(lastName.endsWith("e"))
                    );
                }
        );
    }
}
```

### Third Party Libraries

`AssertJ`, `Hamcrest`, `Truth`

### Assumptions

Assertions와 마찬가지로, JUnit Juptier는 JUnit 4에서 사용하던 Assumption 메서드를 포함하고 Java 8 람다에도 잘 사용할 수 있게끔 몇가지를 더 추가하였다. 모든 JUnit Jupiter assumption은 `org.junit.jupiter.api.Assumptions`에 있는 `static` 메서드이다.

| Methods                                                      | Describes                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [assumeTrue(actual)](https://www.notion.so/assumeTrue-actual-2fedbbcf44864d7a828a4295aecffb79) | false일 때는 테스트를 진행하지 않고, true일 때만 테스트를 진행한다. |
| [assumingThat(actual, execute)](https://www.notion.so/assumingThat-actual-execute-886b7e9372fd4550871fbb5dd4e8cba2) | 해당 조건을 만족하면 execute를 실행한다.                     |
| [EnabledOnOs(OS_Type) / DisabledOnOS](https://www.notion.so/EnabledOnOs-OS_Type-DisabledOnOS-d999d52fd0894b5d93a60610a5b5083d) | 해당 운영체제가 어떤 OS인지에 따라 실행 여부를 결정한다. @EnabledOnJre도 이와 유사한데, JVM버전에 따라 테스트를 실행하게 할 수 있다. |







- 출처
  - [https://lee1535.tistory.com/116](https://lee1535.tistory.com/116)
  - [https://junit.org/junit5/docs/current/user-guide/](https://junit.org/junit5/docs/current/user-guide/)
  - [https://hongsii.github.io/2018/12/12/java-annotation/](https://hongsii.github.io/2018/12/12/java-annotation/)
  - https://minkukjo.github.io/framework/2020/03/07/JUnit-04/