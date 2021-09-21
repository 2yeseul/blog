---
title: '[자바 ORM 표준 JPA 프로그래밍] Entity 매핑'
date: 2021-06-16 00:00:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  
# [자바 ORM 표준 JPA 프로그래밍] Entity 매핑

# @Entity
JPA를 통해 테이블과 매핑할 클래스는 `@Entity`를 필수로 붙여야한다. 
## 주의사항
1. 기본 생성자는 필수이다. (파라미터가 없는 public, protected 생성자)
2. final 클래스, enum, interface, inner 클래스에는 사용할 수 없다.
3. 저장할 필드에 final을 사용하면 안된다.

JPA가 엔티티 객체를 생성할 때 기본 생성자를 사용하므로, 기본 생성자는 반드시 있어야한다.

# DB 스키마 자동 생성
JPA는 데이터베이스 스키마를 자동으로 생성하는 기능을 지원한다. 클래스의 매핑 정보를 보면 어떤 테이블에 어떤 컬럼을 사용하는지 알 수 있는데, JPA는 이 매핑정보와 DB 방언을 참고하여 DB 스키마를 생성한다.

## 스키마 자동 생성 기능 사용법 
yaml일 경우 다음과 같이 속성을 지정해준다. 
``` yml
spring:
    jpa:
        generate-ddl:true
        hibernate:
            ddl-auto: true
```

### 속성
|옵션|설명|
----|-----
|create|기존 테이블을 삭제한 뒤 새로 생성한다.|
|create-drop|create 속성에 추가로 애플리케이션을 종료할 때 생성한 DDL을 제거한다. (DROP + CREATE + DROP)|
|update|DB 테이블과 엔티티 매핑정보를 비교해서 변경 사항만 수정한다.|
|validate|DB 테이블과 엔티티 매핑정보를 비교해서 차이가 있으면 경고를 남기고 애플리케이션을 실행하지 않는다. 이 경우 DDL을 수정하지 않는다.|

### 주의사항 
운영 서버에서 create, create-drop, update 처럼 DDL을 수정하는 옵션은 절대 사용하면 안된다. 오직 개발 서버나 개발 단계에서만 사용해야한다. 이 옵션은 운영중인 DB의 테이블이나 컬럼을 삭제할 수 있다.

### 개발환경에 따른 추천 전략
- 개발 초기 단계 : create 또는 update
- 초기화 상태로 자동화된 테스트를 진행하는 개발자 환경과 CI 서버는 create 또는 create-drop
- 테스트 서버는 update 또는 validate
- 스테이징과 운영 서버는 validate 또는 none

# DDL 생성 기능
회원 이름은 필수로 입력되어야 하고, 10자를 초과하면 안된다는 제약조건이 있다고 가정하고, 스키마 자동 생성하기를 통해 만들어지는 DDL에 이 제약조건을 추가해보자.

``` java
@Entity
@Table(name="MEMBER")
public class Member {
    
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME", nullable = false, length = 10)
    private String username;

    // ...
}
``` 

`@Column` 매핑 정보의 nullable 속성 값을 false로 지정하면 자동 생성되는 DDL에 not null 제약조건을 추가할 수 있다. 그리고 length 속성 값을 사용하면 자동 생성되는 DDL에 문자의 크기를 지정할 수 있다. 

@Column의 이러한 속성들은 (length, nullable ...) **단지 DDL을 자동 생성할 때만 사용되고, JPA의 실행 로직에는 영향을 주지 않는다.** 따라서 스키마 자동 생성 기능을 사용하지 않고 직접 DDL을 만드는 경우에는 사용할 이유가 없다. 그래도 이 기능을 사용하면 개발자가 엔티티만 보고도 손쉽게 다양한 제약조건을 파악할 수 있는 장점이 있다.
