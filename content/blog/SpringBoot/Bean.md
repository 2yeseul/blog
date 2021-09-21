---
title: 'Bean 등록'
date: 2021-01-02 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
--- 

# Bean 등록

# Bean의 정의

- `Spring IoC 컨테이너`가 `인스턴스화`, `관리`, `생성`하는 자바 객체이다.
- 빈과 빈 사이의 의존성은 컨테이너가 사용하는 메타데이터 환경설정에 반영된다.
- 스프링에서의 `Bean`은 보통 `Singleton`(어떤 클래스가 static으로 최초 한 번만 메모리를 할당하고, 그 메모리에 객체를 만들어 사용하는 방법)으로 존재한다.
- `Spring`에서 `Application`의 핵심을 이루는 객체이며, `ApplicationContext`가 알고 있는 객체이다.
    - 따라서 new 연산자를 통해 생성한 객체는 빈이 아니라, `ApplicationContext.getBean()`으로 얻어질 수 있는 객체이다.

# 등록 방법

## XML을 통한 등록

```java
<bean id="aaa" class="xxx.yyy.zzz.AAA">
	<property name="prop"></property>
</bean>
```

### 문제점

- 빈의 성격 구분이 어렵다.
- Application의 크기가 조금만 커져도 빈의 양이 늘어나 관리가 어렵다.

따라서 이러한 문제점 때문에 스프링에서는 클래스에 특정 `annotation`을 부여해, annotation이 붙은 클래스를 자동으로 빈 등록을 하는 `빈 스캐닝`이라는 기능을 제공한다.

## Annotation을 이용한 등록

`@Component`, `@Service`, `@Controller`, `@Repository`, `@Bean`, `@Configurations` 등으로 필요한 빈들을 등록하고 필요한 곳에서 `@Autowired`를 통해 주입받아 사용하는 것이 일반적이다. (스프링 4.3부터는 단일 생성자인 경우에 어노테이션을 붙이지 않아도된다.)

| Annotation  | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| @Component  | 컴포넌트를 나타내는 일반적인 스테리오 타입으로 태그와 동일한 역할을 함 |
| @Repository | 퍼시스턴스 레이어, 영속성을 가지는 속성(파일, 데이터베이스)을 가진 클래스 |
| @Service    | 서비스 레이어, 비지니스 로직을 가진 클래스                   |
| @Controller | 프리젠테이션 레이어, 웹 어플리케이션에서 웹 요청과 응답을 처리하는 클래스 |

## 자바 코드를 통한 등록

스프링 3.0부터 기존의 xml방식을 벗어나, java를 통해 파일을 작성할 수 있게 되었다. 

```java
@Configuration
public class ConfigurationBeanFactory {
	@Bean
	public CarInfoProvider kiaCar() {
		return new KiaCar();
	}
	@Bean
	public CarInfoProvider hyundaiCar() {
		return new HyundaiCar();
	}
}
```

- 클래스 레벨에서는 `@Configuration`을 붙이고 메서드 레벨에서는 `@Bean` 어노테이션을 붙이면 된다. `@Bean`이 붙은 메서드명이 각각 `bean`의 이름이 되고, 리턴되는 객체를 스프링 컨테이너가 빈으로 활용한다.



출처

[https://leveloper.tistory.com/33](https://leveloper.tistory.com/33)

[https://velog.io/@gillog/Spring-Bean-정리](https://velog.io/@gillog/Spring-Bean-%EC%A0%95%EB%A6%AC)

[https://atoz-develop.tistory.com/entry/Spring-스프링-빈Bean의-개념과-생성-원리](https://atoz-develop.tistory.com/entry/Spring-%EC%8A%A4%ED%94%84%EB%A7%81-%EB%B9%88Bean%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%83%9D%EC%84%B1-%EC%9B%90%EB%A6%AC)

[https://doohong.github.io/2019/01/09/Spring-bean/](https://doohong.github.io/2019/01/09/Spring-bean/)

