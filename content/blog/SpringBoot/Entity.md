---
title: '[SpringBoot] 엔티티 만들기'
date: 2021-01-12 02:04:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

# 도메인

![https://www.petrikainulainen.net/wp-content/uploads/spring-web-app-architecture.png](https://www.petrikainulainen.net/wp-content/uploads/spring-web-app-architecture.png)

[https://www.petrikainulainen.net/software-development/design/understanding-spring-web-application-architecture-the-classic-way/](https://www.petrikainulainen.net/software-development/design/understanding-spring-web-application-architecture-the-classic-way/)

스프링에서 `도메인`이란 무엇일까? 우선 스프링 웹의 아키텍쳐를 살펴볼 필요가 있다. 우선, 웹 애플리케이션은 다음과 같은 특징을 가져야한다.

- 유저의 입력(input)을 처리하고 유저에게 올바른 response를 반환해야한다.
- 유저에게 합리적인 에러 메시지를 제공하는 예외 처리 메카니즘이 있어야한다.
- 트랜잭션을 관리하는 전력이 있어야한다.
- 인증과 권한을 둘다 다뤄야한다.
- 애플리케이션의 비즈니스 로직을 구현해야한다.
- 사용되는 데이터 저장소와 외부 리소스간 통신이 필요하다.

이러한 특징들을 오직 세 계층을 이용함으로써 실현할 수 있다.

## Web Layers

`web layer`는 웹 애플리케이션의 `최상단`에 위치한다. 사용자의 입력을 처리하고 올바른 응답을 사용자에게 반환하는 역할을 한다. 또한 다른 계층에서 발생한 예외도 처리해야한다. `web layer`는 애플리케이션의 진입점이므로, 인증을 처리하고 권한이 없는 사용자에 대한 첫 번째 방어선 역할을 해야한다.

`controller`, `view template` 등이 web layer에 해당한다.

### DTO(Data Transfer Object)

DTO는 단순히 데이터 객체 그 자체이며, 이러한 객체는 서로 다른 프로세스간과 애플리케이션 레이어들간에 데이터를 전달하는데 사용된다. 

## Service Layers

`service layer`는 `web layer` 아래에 위치한다. `트랜잭션 경계` 역할을 하며 애플리케이션과 인프라 서비스를 모두 포함한다. 애플리케이션 서비스는 `service layer`의 `public API`를 제공한다. 또한 권한 부여를 담당한다. `인프라 서비스`는 시스템, 데이터베이스, 혹은 이메일 서버와 같은 외부 리소스들과 소통하는 `배관 코드` 를 포함한다. 때때로 이러한 방법은 둘 이상의 애플리케이션에서 사용된다.

## Repository Layers

`repository layer`은 웹 애플리케이션의 최하단에 위치한다. 사용하는 데이터 저장소와의 통신을 담당한다.

### DAO(Data Access Object)

`DAO`는 DB에 접근하는 객체이다. SQL을 사용하여 `CRUD API`를 생성한다. Spring에서는 `Repository`가 DAO에 해당된다.

### Domain Model

- `domain service`는 도메인 개념과 관련된 작업을 제공하지만 엔티티 혹은 값 객체의 자연스러운 부분이 아닌 무상태 클래스(상태 정보가 없음 = 인스턴스 변수가 없음)이다.
- `entity`는 전체 수명주기 동안 변경되지 않고 유지되는, 식별자를 통해 정의된 객체이다.
- `value object`는 속성이나 사물을 설명하고, 이러한 객체에는 고유한 식별자나 수명주기가 없다. value object는 엔티티의 수명주기에 바인딩된다.

즉 도메인 모델은 DB의 테이블과 매칭될 클래스이다. DB 테이블 내에 존재하는 컬럼만을 속성(필드)로 가진다. 엔티티 클래스는 상속을 받거나 구현체여서는 안되고, 테이블 내에 존재하지 않는 컬럼을 가져서도 안된다.

# 엔티티 만들기

회원 정보를 저장하는 `Account` 라는 엔티티 클래스를 만든다. 이 클래스는 간단하게 `닉네임`, `아이디(이메일)`, `패스워드`, `프로필 사진`이라는 필드를 가진다.

```java
@Entity
@Getter
@Setter
@EqulasAndHashCode(of = "id")
@Builder @AllArgsConstructor @NoArgsConstructor
public class Account {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(unique = true)
	private String email;
	
	@Column(unique = true)
	private String nickname;
	private String password;

	@Lob
	@Basic(fetch = FetchType.EAGER)
	private String profileImage;
}
```

## JPA

### ORM(Object-Relational Mapping)

`객체 관계 매핑`이란, 객체는 객체대로 설계하고, RDBMS는 RDBMS대로 설계하면, ORM 프레임워크가 중간에서 매핑해준다. 대중적인 언어에는 대부분 ORM 기술이 존재한다. 

ORM은 객체와 RDB 두 기둥 위에 위차한 기술이다.

### JPA(Java Persistence API)

과거의 자바 표준(Entity Bean)인 `EJB`는 과거의 ORM이었다. 하지만 코드가 매우 지저분하고, 인터페이스를 많이 구현해야 하므로 API가 복잡하며 속도가 느렸다.

따라서 이러한 Entity Beans 이용을 대체할 목적으로 ORM 오픈소스 프레임워크인 `Hibernate`가 개발되었다.

`JPA`는 현재 자바 진영의 `ORM 기술 표준`으로, `인터페이스의 모음`이다. 즉, 실제로 동작하는 것이 아니다. JPA를 구현한 대표적인 오픈소스가 바로 `Hibernate`이다.

- JPA를 사용해야 하는 이유
    1. SQL 중심 개발에서 객체 중심으로 개발
    2. 생산성
        - 간단한 CRUD
            - Create : `jpa.persist(memper)`
            - Read : `Member member = jpa.find(memberId)`
            - Update : `member.setName("변경할 이름")`
                - 객체를 변경하면 알아서 DB에 UPDATE Query가 나간다.
            - Delete : `jpa.remove(member)`

### `@Entity`

- `@Entity`가 붙은 클래스는 JPA가 관리하는 클래스인데, 해당 클래스를 Entity라고 부른다
- JPA를 사용하여 테이블과 매핑할 때는 반드시 `@Entity`를 붙여야한다.
- ⭐ 기본생성자가 필수이다.
    - JPA spec으로 규정되어있음
        - JPA를 구현해서 쓰는 라이브러리들이 다양한 기술(ex. reflection)을 사용하여 객체를 프록싱할 때 필요하기 때문이다.
- `final 클래스`, `enum`, `interface`, `inner 클래스`는 엔티티로 사용할 수 없다.
- DB로 저장하고 싶은 필드에 `final`을 사용할 수 없다.

### `@Id`

- 어노테이션이 붙은 필드를 해당 테이블의 `기본키`(Primary Key)로 매핑한다.

### `@GeneratedValue`

- 기본키의 생성 규칙이다. 자동으로 PK를 생성해주는데, 생성 전략을 지정해주지 않으면 기본값은 `AUTO`이다.

[읽어보기]([https://gmlwjd9405.github.io/2019/08/12/primary-key-mapping.html](https://gmlwjd9405.github.io/2019/08/12/primary-key-mapping.html))

### `@Column`

- 별다른 옵션이 없다면 생략해도 괜찮지만, 기본값 외에 추가로 변경이 필요한 옵션이 있다면 사용한다
- `@Column(unique=true)` 는 그 값이 유일해야 한다는 뜻이다.

### `@Lob`

- Large Object라는 뜻이다. 가변길이를 갖는 `큰 데이터를 저장`하는데 사용된다. 일반적인 데이터베이스에서 제공하는 길이인 255개 이상의 문자, 즉 VARCHAR보다 큰 데이터를 저장하고 싶을 때 지정한다. @Lob은 스프링이 추론하여 어ㄸ 타입으로 저장할지 판단하는데, String과 char를 기본으로 하는 타입을 제외하면 @Blob으로 사용된다. (CLOB - 문자 기반 데이터 저장, BLOB - binary 데이터 저장)

### `@Basic`

- `null`이 가능한지 여부를 옵션으로 줄 수 있다. 기본은 `true` 이다.
    - `@Basic(optional = false)`
- Fetch 속성을 lazily loaded와 eagerly fetched 중 하나를 명시한다. 기본은 `FetchType.EAGER` 이다.
    - `@Basic(fetch = FetchType.LAZY)`

## Lombok

### `@Getter` `@Setter`

- 클래스 내 모든 필드의 getter, setter  메소드를 자동으로 생성해준다.

### `@EqualsAndHashCode`

- equls : 두 객체의 내용이 같은지 확인
- hashcode : 두 객체가 같은 객체인지 확인
- `@EqualsAndHashCode(of="id")` : id 변수를 포함시킨다는 뜻이다.

    → 연관 관계가 복잡해질 때, `@EqualsAndHashCode` 에서 서로 다른 연관 관계를 순환 참조 하느라 무한 루프가 발생하고, 결국 스택오버플로우가 발생하기 때문에 id값만 주로 사용한다.

    - `exclude` : 제외시킬 변수명
    - `of` : 포함시킬 변수명
    - `callSuper` : 상위 클래스 호출 여부 물음
    - `doNotUseGetters` : getter 사용여부

### `@Buider`

- 해당 클래스의 빌더 패턴 클래스를 생성한다.

### `@AllArgsConstructor`

- 모든 필드 값을 파라미터로 받는 생성자 생성 (All arguments - 모든 인수 ... )

### `@NoArgsConstructor`

- 파라미터가 없는 기본 생성자 생성 (No arguments - 인수가 없음 )

---
출처

[https://medium.com/webeveloper/entity-vo-dto-666bc72614bb](https://medium.com/webeveloper/entity-vo-dto-666bc72614bb)

[https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html](https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html)

[http://wonwoo.ml/index.php/post/1607](http://wonwoo.ml/index.php/post/1607)

[https://velog.io/@max9106/Lombok](https://velog.io/@max9106/Lombok)

[https://pinokio0702.tistory.com/142](https://pinokio0702.tistory.com/142)