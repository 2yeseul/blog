---
title: 'JVM'
date: 2022-02-03 00:00:00
description: "JVM의 구조와 원리를 정리합니다."
tags: [Java]
thumbnail: 
---   

# JDK, JRE, JVM

![image](https://user-images.githubusercontent.com/43533905/152177242-dac8c003-297b-466f-a8aa-308196d3e584.png)

# JDK
`Java Development Kit`의 약자로, JRE와 자바 개발에 필요한 툴을 제공한다. 오라클은 Java11 부터 JDK만을 제공한다.

# JRE
`Java Runtime Environment`의 약자로, JVM과 Java API (Library)로 구성된다.

JRE의 목적은 Java 애플리케이션을 실행할 수 있도록 하는 것이다. JVM과 핵심 라이브러리 및 Runtime에서 사용하는 프로퍼티 세팅이나, 리소스 파일을 가지고 있다. 

JavaC와 같은 개발 관련 도구는 JRE에서 제공하는 것이 아니라 JDK에서 제공한다.

---

# JVM

![image2](https://user-images.githubusercontent.com/43533905/152182814-a7da2fef-8a40-4d2b-8e3e-043c4a3d326c.png)

> 바이트코드 (.class) 를 OSd에 맞게 해석(변환) & 실행한다. 

역할 - Java 애플리케이션을 클래스 로더를 통해 읽어 들인 뒤, Java API와 함께 실행한다.

프로그램 실행을 위해 물리적 머신(Computer)과 유사한 머신을 Software로 구현하였다.

## 특징
- 스택 기반
- 심볼릭 레퍼런스: 기본 자료형을 제외한 모든 타입(class, interface) 는 명시적인 메모리 주소 기반의 레퍼런스가 아니라 심볼릭 레퍼런스를 통해 참조된다. 
  - symbol reference: 주소가 아닌 이름을 통한 참조
- GC: class, interface는 사용자 code에 의해 명시적으로 생성되고, GC에 의해 자동으로 파괴된다.

## Class Loader
![image3](https://user-images.githubusercontent.com/43533905/152190357-56bf92af-4b41-4d8d-a84a-e4146e25fc04.png)
출처 - 인프런 더 자바 강의(백기선)

클래스로더는 계층형 구조이며 각 로더들마다 부모가 있다. 자바 바이트 코드를 읽어 메모리에 적절하게 배치한다.

1. Bootstrap Class Loader
Object 클래스를 비롯하여 `JAVA_HOME\lib`에 있는 코어 자바 API를 제공한다. 최상위 우선순위를 가진 클래스 로더이다. 다른 클래스 로더와 달리 자바가 아니라 네이티브 코드로 구현되어있다.

2. Platform Class Loader(Extension Class Loader)
`JAVA_HOME\lib\ext` 폴더 또는 java.ext.dirs 시스템 변수에 해당하는 위치에 있는 클래스를 읽는다.

기본 자바 API를 제외한 확장 클래스를 로드한다. 다양한 보안 확장 기능 등을 여기서 로드하게 된다.

3. Application Class Loader(System Class Loader)
애플리케이션 클래스패스(-classpath or java.class.path 환경변수의 값에 해당하는 위치)에서 클래스를 읽는다.

위 세 개의 클래스로더로 부터 클래스를 읽지 못한 경우 => class not found exception

### 로딩
클래스(바이트 코드)를 읽어온다. 클래스 로더가 바이트 코드를 읽고, 그 내용에 따라 적절한 바이너리 데이터를 만들어 Runtime Data Areas의 `메소드` 영역에 저장한다.

- 메소드 영역에 저장하는 데이터
  - FQCN : Fully Qualified Class Name
    - 클래스를 로드할 때 이미 로드된 클래스인지 확인하기 위한 용도이다. 네임스페이스에 저장된 FQCN을 기준으로 클래스를 찾는데, 비록 FQCN이 같더라도 네임 스페이스가 다르면, 즉 다른 클래스로더가 로드한 클래스이면 다른 클래스이다.  
  - class, interface, enum
  - method, variable

로딩이 끝나면, 해당 클래스타입의 Class 객체를 생성하여 `Heap`에 저장한다.

## 링크
- verify, prepare, resolve(optional)
- verify: .class 파일 형식이 유효한지를 체크
  - 읽어들인 클래스가 Java Language Specification 및 JVM 명세에 명시된 대로 잘 구성되어있는지 검사
  - 클래스 로드 전 과정 중 가장 까다로운 검사를 수행, 가장 복잡하며 시간이 많이 걸린다.
- prepare: 클래스 변수(static 변수)와 기본 값에 필요한 메모리 할당, 클래스에서 정의된 필드, 메서드, 인터페이스들을 나타내는 데이터 구조를 준비한다.
- resolve: 클래스의 상수 풀 내 모든 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경한다.
- 초기화: 클래스 변수를 적절한 값으로 초기화한다. 즉 static initializer를 실행하고, static 필드를 설정된 값으로 초기화한다.

## Runtime Data Areas
![image4](https://user-images.githubusercontent.com/43533905/152196164-86b7cbdf-f18f-4893-8af6-26c3425bf705.png)
> 런타임 데이터 영역은 JVM이 운영체제 위에서 실행되며 할당받는 메모리 영역이다.
> PC Register, JVM Stack, Native Method Stack은 스레드 마다 하나 씩 생성되며, Heap, Method Area, Runtime Constant Pool은 모든 thread가 공유하여 사용한다.

### PC Register
- PC Register는 각 스레드마다 하나 씩 존재하며, 스레드가 시작될 때 생성된다. 현재 수행중인 JVM 명령 주소를 가진다. 즉 현재 실행할 스택 프레임을 가리키는 포인터를 생성한다.

### JVM Stack
![image5](https://d2.naver.com/content/images/2015/06/helloworld-1230-5.png)

출처 - naver d2 

- JVM 스택은 각 스레드마다 하나씩 존재하며, 스레드가 시작될 때 생성된다. JVM Stack은 `Stack Frame` 이라는 구조체를 저장하는 스택인데, JVM은 이 스택과 관련하여 스택 프레임을 추가(push)하고 삭제(pop)하는 것 만을 수행한다. 

한편 Stack Frame은 JVM 내에서 **Method가 실행될 때 마다 하나의 스택 프레임이 생성되는데, 생성된 Stack Frame은 JVM Stack에 저장된다.** 메서드 사용이 종료되면 JVM Stack에서 해당 프레임이 Pop된다.

Stack Frame은 총 세 가지 속성으로 구성된다. 
1. Local Variable Array

|class 인스턴스의 this|parameter 1|parameter 2|...|parameter n|local variable 1|local variable 2|...|local variable n|
|--|--|--|--|--|--|--|--|--|
- 0부터 시작하는 배열이다. 0은 메서드가 속한 class 인스턴스의 this 레퍼런스가, 1부터는 메서드가 전달된 파라미터가 저장된다. 메서드 파라미터 이후에는 메서드의 지역 변수가 저장된다.

2. Operand Stack
- 메서드의 실제 작업 공간. 각 메서드는 피연산자 스택과 지역 변수 배열 사이에서 데이터를 교환하고, 다른 메서드 호출 결과를 추가(push)하거나 꺼낸다(pop). 피연산자 스택 공간이 얼마나 필요할지는 컴파일 때 결정할 수 있으므로, 피연산자 스택의 크기도 컴파일시에 결정된다.

### 메서드 영역
- 메서드 영역은 모든 스레드가 공유하는 영역으로, JVM이 시작될 때 생성된다. JVM이 읽어 들인 각각의 클래스와 인터페이스에 대한 `런타임 상수 풀`, `필드와 메서드 정보`, `Static 변수`, `메서드의 바이트 코드` 등을 보관한다. 

### 런타임 상수 풀
- 메서드 영역에 포함되는 영역이긴 하지만, JVM에서 가장 핵심적인 역할을 수행한다. 
- **각 클래스와 인터페이스의 상수 뿐만 아니라 메서드와 필드에 대한 모든 레퍼런스** 까지 담고 있는 테이블이다.
  - 즉 어떤 메서드나 필드를 참조할 때, JVM은 Runtime Constant Pool을 통해 해당 메서드나 필드의 실제 메모리상 주소를 찾아 참조한다.

### Heap
- 인스턴스 또는 객체를 저장하는 곳으로, GC의 대상이다.