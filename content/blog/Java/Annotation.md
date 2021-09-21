---
title: '어노테이션'
date: 2021-02-06 12:15:00
description: ""
tags: [Java]
thumbnail: 
---  

# 커스텀 어노테이션

## 정의

``` java
public @interface CurrentUser {
}
```

기존에 `interface` 를 정의할 때는 `interface interfaceName {}` 과 같은 형태로 정의했지만, 커스텀 어노테이션을 정의하기 위해선 `@interface` 를 통해 정의해야한다. `Meta Annotation`을 활용하여 Custom Annotation을 만들 수 있다.

- 메타 어노테이션은 자바 코드에 적용되는 내장 어노테이션 이외의 기타 어노테이션에 적용되는 어노테이션이다.
  - 자바 코드에 적용되는 내장 어노테이션
    - `@Override` 
    - `@Deprecated` - 타입, 필드, 메소드 등에 붙일 수 있는데, 이 어노테이션이 표시된 메소드나 필드를 사용하면 빌드할 때 워닝 메시지를 보여준다. 더 나은, 개선된 메소드가 있음을 나타내고자 할 때 주로 사용된다. 개발자가 어떤 메소드를 사용했을 때, 이 메소드가 Deprecated가 선언되었다면, 다음 버전에서 사라지거나 더 개선된 메소드로 대체될 것이므로 이용을 자제해야 한다고 경고한다. 
    - `@SuppressWarnings` - 선언된 부분에 대해 경고문을 출력하지 말라는 의미이다.
  - 메타 어노테이션
    - `@Retention`
    - `@Documented`
    - `@Target`
    - `@Inherited`

## @Retention

어노테이션의 유효 범위를 정하는 어노테이션이다. 즉 어노테이션의 Life Time이다.

| name    | description                                                  |
| ------- | ------------------------------------------------------------ |
| RUNTIME | 컴파일 이후 런타임 시 까지 참조 가능하다. 즉 바이트 코드 파일까지 어노테이션 정보를 유지하면서 리플렉션을 이용해 런타임 시에 어노테이션 정보를 얻을 수 있다. |
| CLASS   | 클래스를 참조할 때 까지 유효하다. 즉 바이트 코드 파일까지 어노테이션 정보를 유지하는데, 리플렉션을 이용하여 어노테이션 정보를 얻을 수는 없다. |
| SOURCE  | 컴파일 이후 어노테이션 정보 소멸한다.                        |

`@Retention(RetentionPolicy.RUNTIME)` 과 같은 형태로 작성한다.

## @Target

어노테이션이 생성될 수 있는 위치를 지정한다.

| name            | description                            |
| --------------- | -------------------------------------- |
| PACKAGE         | 패키지 선언 시                         |
| TYPE            | 타입(클래스, 인터페이스, enum) 선언 시 |
| CONSTRUCTOR     | 생성자 선언 시                         |
| FIELD           | enum 상수를 포함한 멤버변수 선언 시    |
| METHOD          | 메소드 선언 시                         |
| ANNOTATION_TYPE | 어노테이션 타입 선언 시                |
| LOCAL_VARIABLE  | 지역변수 선언 시                       |
| PARAMETER       | 파라미터 선언 시                       |
| TYPE_PARAMETER  | 파라미터 타입 선언 시                  |

`@Target(ElementType.METHOD)` 와 같은 형태로 작성한다.

### 사용예시

``` java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@AuthenticationPrincipal(expression = "#this == 'anonymousUser' ? null : account")
public @interface CurrentUser {
}
```

## @Documented

@Documented 어노테이션이 지정된 대상의 JavaDoc에 이 어노테이션의 존재를 표기하도록 지정한다.

## Annotation Processor

Annotation Processors는 컴파일 단계에서 소스를 조작할 수 있도록하는 source-level annotation processing을 지원한다.

모든 프로세서들은 `AbstractProcessor` 를 상속 받아야 한다. 

``` java
public abstract boolean process(
 Set<? extends TypeElement> annotations, RoundEnvironment roundEnv);
public synchronized void init(ProcessingEnvironment processingEnv)
public SourceVersion getSupportedSourceVersion()
public Set<String> getSupportedAnnotationTypes()
public Set<String> getSupportedOptions()
public Iterable<? extends Completion> getCompletions(...)
protected synchronized boolean isInitialized()
private Set<String> arrayToSet(...)
```



- process() : 각 프로세서의 main 메소드와 같은 역할이다. 이 메소드에 원하는 코드를 작성하면 된다.
- getSupportedAnnotationTypes () : 이 프로세서가 처리할 어노테이션을 명시한다. 이 메소드는 어노테이션으로 대체할 수 있다.
- getSupportedSourceVersion() : 특정 자바 버전을 명시할 때 사용할 수 있는데, 어노테이션으로 대체가능하다. 다만 어노테이션과 차이점은 어노테이션에서는 SourceVersion.latestSupported() 를 사용하지 못하고 특정 버전을 명시해줘야 한다는 점이다.
- init(ProcessingEnvironment processingEnvironment) : 모든 어노테이션 프로세서는 기본 생성자를 가져야하는데, 대신 init 메소드를 사용할 수 있다. ProcessingEnvironment에서 유용한 유틸 클래스를 제공한다.
  1. [Types typeUtils = processingEnvironment.getTypeUtils();](https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/lang/model/util/Types.html)
  2. [Elements elementUtils = processingEnvironment.getElementUtils();](https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/lang/model/util/Elements.html)
  3.  [Filer filer = processingEnvironment.getFiler();](https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/annotation/processing/Filer.html)
  4. [Messager messager = processingEnvironment.getMessager();](https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/annotation/processing/Messager.html)

### 동작

Annotation Processor는 여러 번 반복 수행된다. 각 라운드는 컴파일러가 어노테이션을 검색하고, 해당 어노테이션에 맞는 Processor를 선택하는 것에서 부터 시작된다.

Annotation Processor는 JVM위에서 작동하므로 다른 라이브러리를 끌어 쓸 수 있다. 이렇게 만든 프로세서를 .jar파일로 만드려면, META-INF/services 내에 있는 Processor를 같이 압축해줘야 한다.

하지만 google에서 만든 auto-service를 이용하면 위 작업을 알아서 해준다.



## Boilerplace code

### 정의

최소한의 변경으로 여러 곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드이다.

대표적인 예시가 `Lombok` 이다.

### Lombok

Lombok은 annotation prcessor를 통해 annotation 별로 코드를 생성하는데 사용된다.

`@Getter`를 사용하여 `@Getter String name;` 을 작성하면, 

``` java
public String getName() {
  return this.name;
}
```

즉 lombok의 구현은 Annotation Processor를 이용한 컴파일 시점 코드 생성으로 요약할 수 있다.

