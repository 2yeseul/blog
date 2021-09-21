---
title: '예외 처리'
date: 2021-01-15 04:06:00
description: ""
tags: [Java]
thumbnail: 
---  
# 예외

## 예외의 정의

`예외`는 프로그램 실행 중에 발생하는 이벤트인데, 프로그램의 명령의 정상적인 흐름을 방해한다.

- 메서드 내에서 오류가 발생하면, 메서드는 객체를 만들어 런타임 시스템에 전달한다.
- 예외 객체라고 하는 객체는, 에러가 발생했을 때 프로그램의 상태와 타입이 포함된, 에러에 대한 정보가 담겨져있다.
- 예외 객체를 만들고 런타인 시스템에 전달하는 것이 `예외 발생`이다.

### Runtime System

![https://docs.oracle.com/javase/tutorial/figures/essential/exceptions-callstack.gif](https://docs.oracle.com/javase/tutorial/figures/essential/exceptions-callstack.gif)

[https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html)

- 런타임 시스템은 예외를 처리할 수 있는 `코드 블록`이 포함된 메서드를 `call stack` 에서 검색한다. 이 코드 블록이 `exception handler` 이다.
- 검색은 에러가 발생한 메서드에서 시작하여, 메서드가 호출된 역순으로 call stack을 통해 진행된다.
- 적절한 handler가 발견되면, 런타임 시스템은 예외를 handler에게 전달한다. exception handler는 throw된 exception 객체의 유형이 handler가 처리할 수 있는 유형과 일치할 때, 적절한 것으로 판단한다.

![https://docs.oracle.com/javase/tutorial/figures/essential/exceptions-errorOccurs.gif](https://docs.oracle.com/javase/tutorial/figures/essential/exceptions-errorOccurs.gif)

[https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html](https://docs.oracle.com/javase/tutorial/essential/exceptions/definition.html)

선택된 exception handler는 예외를 catch 했다고 말할 수 있다. 위의 그림과 같이 런타임 시스템이 적절한 exception handler를 찾지 않고 call stack의 모든 메서드를 철저하게 검색하면 런타인 시스템(프로그램)이 종료된다.

## 예외 처리 방법

### try

exception handler를 구성하는 방법은 예외를 throw할 가능성이 있는 코드를 `try` 블록으로 감싸는 것이다. 

```java
try {
	// .. code
}
// catch and finally blocks...
```

try 내에서 예외가 발생하면 → 해당 예외는 그 것과 관련된 exception handler에 의해 처리된다.

- exception handler를 try와 연결하려면, 그 뒤에 catch 블록을 넣어야한다.

### catch

try 블록 뒤에 하나 이상의 catch 블록을 제공하면 exception handler와 try 블록을 연결할 수 있다. try 블록의 끝과 첫 번째 catch 블록 시작 사이에 코드가 있으면 안된다.

```java
try {
	// .. code
} catch (ExceptionType name) {
	//
} catch (ExceptionType name) {
	//
}
```

- 각 catch 블록은 인수에 의해 나타나는 예외 유형을 처리하는 `Exception handler` 이다.
- ExceptionType은 handler가 처리할 수 있는 exception 타입을 선언하고, `Throwable` 클래스에서 상속되는 클래스의 이름이어야 한다.
- handler는 `name` 으로 예외를 참조할 수 있다.
- catch 블록에는 exception handler가 호출될 때 실행되는 코드가 포함된다.
- 런타임 시스템은 handler가 Exception Type이 발생한 것과 일치하는 call stack의 첫 번째 handler일 때, exception handler를 호출한다.
- 시스템은 throw된 객체가 exception handler의 인수에 할당될 수 있는 경우에 일치하는 것으로 간주한다.
- handler는 예외 섹션에 설명된대로 오류 복구를 수행하거나, 사용자에게 결정을 내리도록 하거나, chained exception을 사용하여 더 높은 수준의 handler로 에러를 알릴 수 있다.

### throw vs throws

`throw` 는 Exception을 발생시킬 때 사용되는 키워드이다. 만약 어떤 연산을 하다가 예상하지 못한 일이 발생하면, Exception을 발생시켜 예외를 처리한다. Application이 예외를 적절하게 처리하지 못하면 프로그램이 죽거나 오작동한다.

```java
String numberString = "11a";
int num = Integer.parseInt(numberString);
```

와 같이 숫자가 아닌 문자열을 인자로 전달하면, Exception이 발생하며 프로그램이 죽는다.

Output : 

```java
Exception in thread "main" java.lang.NumberFormatException: For input string: "11a"
	at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
	at java.base/java.lang.Integer.parseInt(Integer.java:652)
	at java.base/java.lang.Integer.parseInt(Integer.java:770)
```

`Integer.parseInt()` 의 코드를 보면 예상밖의 인자가 전달되면 Exception을 `throw` 하도록 구현되어있다.

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEYorH%2FbtqTxDdTx7G%2FaHN2TaG4TR5PTWMVJP9KnK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEYorH%2FbtqTxDdTx7G%2FaHN2TaG4TR5PTWMVJP9KnK%2Fimg.png)

`throws`는 메소드를 정의할 때 사용한다. 이 메소드에서 발생할 수 있는 Exception을 명시적으로 정의할 때 사용하므로, throws를 보면 잠재적으로 어떤 Exception이 발생될 수 있는지 쉽게 알 수 있다.

```java
public static void main(String... args) throws IOException {
	// code
}
```

`IOException`이 발생할 것 이라고 명시한다.

### try-catch-finally

```java
try {
	fileInputSystem = new FileInputSystem("a.txt");
	if(fileInputSystem!=null) {
		try {
			fileInputSystem.close(); // try 블록에서 파일 리소스를 닫는 close() 호출
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			}
		}
	} catch (FileNotFoundException e) {
		System.out.println(e);
	}
}
```

위 코드에서는 try 블록에서만 파일 리소스를 닫았지만, 프로그램이 정상적으로 종료된 경우에도 파일 리소스를 닫아야하고 비정상적으로 종료된 경우도 그러하다.

따라서 try 블록 뿐만 아니라 catch 블록에서도 close() 를 사용해야한다.

만약 try 블록 안에서 발생가능한 예외 상황이 여러 개라면, catch 블록을 예외 상황 수 만큼 구현해야 한다. 그러나 한 번 열어놓은 리소스를 해제하는 코드를 try-catch-catch... 각 블록에 모두 작성해야 하는 것은 번거롭다.

이때 사용하는 블록이 `finally`이다.

일단 try 블록이 수행되면 finally 블록은 어떤 경우에도 반드시 수행된다. try나 catch문에 return문이 있어도 수행된다.

```java
try {
	예외가 발생할 수 있는 부분
} catch (ExceptionType e) {
	예외를 처리하는 부분
} finally {
	항상 수행하는 부분
}
```

### try-with-resources

자바 7부터 try-with-resources문을 제공하여 close() 메소드를 명시적으로 호출하지 않아도 try 블록 내에서 열린 리소스를 자동으로 닫을 수 있게 하였다. 이 문법을 사용하려면 `AutoCloseable` 인터페이스를 구현해야한다.

`AutoCloseable` 인터페이스에는 close() 메서드가 있고, 이를 구현한 클래스는 close()를 명시적으로 호출하지 않아도 close() 메서드 부분이 호출된다.

FileInputStream은 AutoCloseable을 구현하고 있다. 따라서 자바 7 부터는 try-with-resources를 사용하면 FileInputStream을 사용할 때 close()를 명시적으로 호출하지 않아도 정상인 경우와 예외가 발생한 경우 모두 close() 메소드가 호출된다. FileInputStream 이외에 네트워크(socket)와 데이터베이스(connection) 관련 클래스도 AutoCloseable 인터페이스를 구현하고 있다.

```java
public class AutoClassObj implements AutoCloseable {
	@Override
	public void close() throws Exception {
		System.out.println("리소스 클로즈");
	}
```

```java
public class AutoClassTest {
	public static void main(String... args) {
		try(AutoClassObj obj = new AutoClassObj()) {
		} catch(Exception e) {
			System.out.println("예외");
		}
	}
}
```

### 향상된 try-with-resources문 (자바 9에서 추가)

자바 7에서는 AutoCloseable을 구현한 리소스의 변수 선언을 try문 괄호 안에서 해야했다. 따라서 리소스가 외부에 선언되고 생성된 경우에도 다른 참조 변수로 괄호안에 다시 선언해야 했다.

```java
AutoCloseObj obj = new AutoCloseObj();
    try (AutoCloseObj obj2 = obj){
       throw new Exception();
     } catch (Exception e) {
        e.printStackTrace();
     }
```

하지만 자바 9부터 try문의 괄호 안에서 외부에서 선언한 변수를 쓸 수 있다.

```java
AutoCloseObj obj = new AutoCloseObj();
    try (obj){
        throw new Exception();
    } catch (Exception e) {
        e.printStackTrace();
    }
```

# 예외 계층 구조

![https://media.vlpt.us/images/codepark_kr/post/a70025be-d97d-4ba4-81de-bf9b8fe48d2b/ExceptionClassHierarchy.png](https://media.vlpt.us/images/codepark_kr/post/a70025be-d97d-4ba4-81de-bf9b8fe48d2b/ExceptionClassHierarchy.png)

[https://velog.io/@codepark_kr/자바-이론-예외-처리](https://velog.io/@codepark_kr/%EC%9E%90%EB%B0%94-%EC%9D%B4%EB%A1%A0-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC)

# Exception과 Error의 차이

프로그램에서 오류가 발생하는 상황은 두 가지이다 

- `컴파일 오류(compile error)` : 프로그램 코드 작성 중 실수로 발생하는 오류
    - 개발 환경에서 대부분 원인을 알 수 있다. 발생한 컴파일 오류를 모두 수정해야 프로그램이 정상적으로 진행하기 때문이다.
- `실행 오류(runtime error)` : 실행중인 프로그램이 의도하지 않은 동작을 하거나 프로그램이 중지되는 오류 - 크게 두 가지 있음 : 시스템 오류, 예외
    - `시스템 오류(error)` : `JVM`에서 발생

        ex) 사용 가능한 동적 메모리가 없거나 스택 메모리의 오버플로가 발생한 경우 → 프로그램에서 제어할 수 없음

    - `예외(exception)` : 프로그램에서 제어할 수 있음

        ex) 프로그램에서 파일을 읽어야 하는데 파일이 없는 경우, 배열 값을 출력해야 하는데 배열이 null인 경우 등등..

### 자바에서 제공하는 오류에 대한 클래스 계층

![https://www.oreilly.com/library/view/pure-javatm-2/0672316544/0672316544_ch10lev1sec1_image01.gif](https://www.oreilly.com/library/view/pure-javatm-2/0672316544/0672316544_ch10lev1sec1_image01.gif)

[https://www.oreilly.com/library/view/pure-javatm-2/0672316544/0672316544_ch10lev1sec1.html](https://www.oreilly.com/library/view/pure-javatm-2/0672316544/0672316544_ch10lev1sec1.html)

- 오류 클래스는 모두 `Throwable` 클래스에서 상속받는다. Error의 하위 클래스는 **시스템에서 발생하는 오류**를 다루며 **프로그램에서 제어하지 않는다.**
- 프로그램을 제어하는 부분은 Exception 클래스와 그 하위에 있는 예외 클래스이다.

# Runtime Exception과 아닌 것의 차이

RuntimeException, Error, 그리고 하위 클래스들은 `unchecked exception`이고, 그 외의 Exception은 `checked exception`이라고 한다.

런타임 예외는 런타임 예외는 JVM의 정상적인 작동중에 발생할 수 있는 예외의 수퍼 클래스이다. 따라서 프로그램의 **어느 곳에서나 발생**할 수 있고, 일반적인 예외는 매우 많을 수 있다. 어느 곳에서나 발생할 수 있고 예측할 수 있는 상황이 아닌 런타임 에러이기 때문에, 모든 메서드 선언에 런타임 예외를 추가해야하는 것은 `프로그램의 명확성을 떨어뜨린다`. 따라서 컴파일러는 비록 가능할지라도 런타임 예외를 캐치하거나 지정할 필요는 없다. 

따라서 복구할 수 있는 상황, 즉 예측할 수 있는 상황에는 checked 예외를, 프로그래밍 오류에는 런타임 예외를 사용하는 것이 좋다.

# 커스텀 예외

사용자 정의 예외 클래스를 구현할 때는 기존 JDK에서 제공하는 예외 클래스 중 가장 유사한 클래스를 상속받는 것이 좋다. 유사한 예외 클래스를 잘 모르겠다면 가장 상위 클래스인 Exception 클래스에서 상속받는다.

아이디가 null값이거나 지정 범위를 벗어나는 경우의 예외 처리 클래스이다.

```java
public class IDFormatException extends Exception {
	public IDFormatException(String message) {
		// 생성자의 매개변수로 예외 상황 메시지를 받는다
		super(message);
	}
}
```

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fda2Ab3%2FbtqTF2QNaU5%2FffhZOsTDYvHsOKoN2kcePK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fda2Ab3%2FbtqTF2QNaU5%2FffhZOsTDYvHsOKoN2kcePK%2Fimg.png)

출처

[https://codechacha.com/ko/java-throw-and-throws/](https://codechacha.com/ko/java-throw-and-throws/)

[https://velog.io/@codepark_kr/자바-이론-예외-처리](https://velog.io/@codepark_kr/%EC%9E%90%EB%B0%94-%EC%9D%B4%EB%A1%A0-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC)

[https://johngrib.github.io/wiki/java-exception-handling/](https://johngrib.github.io/wiki/java-exception-handling/)