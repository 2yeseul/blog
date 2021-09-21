---
title: '[스터디] 자바 ORM 표준 JPA 프로그래밍 01'
date: 2021-08-06 00:00:00
description: ""
tags: [Java, JPA]
thumbnail: 
---  
# [스터디] 자바 ORM 표준 JPA 프로그래밍 01
# SQL vs JPA 요약

## 비교

> -  CRUD 용 SQL 작업 
→ 반복작업, 비즈니스 로직 작업 < SQL 작성 시간
- 지루하고 비생산적임

> - 객체 모델링과 관계형 데이터 베이스 사이의 차이점 해결
- 실행 시점에 자동으로 SQL 만들어서 실행 → SQL을 직접 작성하는 것이 아니라 어떤 SQL 실행

## JPA 장점

1. 객체 중심의 개발 → 생산성, 유지보수 👍
2. 테스크 용이

# SQL을 직접 다룰 때의 문제점

요구사항 : 회원 관리 기능 → CRUD 기능 개발

## 1. 반복

### 예제) 회원 조회 기능을 만드려면?

회원 객체(Member)와 데이터베이스에 접근하는 DAO 객체

```java
public class Member {
  
  private String memberId;
  private String name;
  // ..
  
}
```

```java
public class MemberDAO {
  
  public Member find(String memberId)
			{ ... }
}

```

**1. 회원 조회용 SQL 작성**
select member_id, name from member where member_id = ?
**2. JDBC API를 사용하여 SQL 실행**
ResultSet rs = stmt.excuteQuery(sql);
**3. 쿼리 조화 결과와 Member 객체 매핑**
String memberId = rs.getString("member_id");
String name = rs.getString("name");

Member member = new Member();
member.setMemberId(memberId);
member.setName(name);
// ...

### 문제점

객체를 DB에 CRUD를 하려면 너무 많은 SQL과 JDBC API를 코드로 작성해야함

## 2. SQL에 의존적인 개발

요구 사항 : 기존 회원 관리 기능 + 회원 연락처 저장 추가

```java
public class Member {
  
  private String memberId;
  private String name;
  private String tel; // 추가된 필드
  
}
```

**1. 연락처 저장 INSERT SQL 수정 및 등록 SQL에 전달**
String sql = "insert into member(member_id, name, tel) values (?, ?, ?);
psmt.setString(3, member.getTel());
**2. 조회 코드 변경**
select member_id, name, tel from member where member_id = ?
...
String tel = rs.getString("tel");
member.setTel(tel); // 추가
**3. 수정 코드 변경** 
**4. 연관 객체**
Team 객체가 Member 객체에 추가된다면(연관될 때)
member.getTeam().getTeamName(); → null
****select m.member_id, m.name, m.tel, m.team_id, t.team_name from member m
from member m
join team t on m.team_id = t.team_id
→ Member 객체가 연관된 Team 객체를 사용할 수 있을지 없을지는 전적으로 사용하는 SQL에 달려있다.
데이터 접근 계층을 사용해 SQL을 숨겨도, 어쩔 수 없이 DAO를 열어 어떤 SQL이 실행되는지 확인되어야한다.

### 문제점

 SQL에 모든 것을 의존하는 상황에서, DAO를 열어 어떤 SQL이 실행되고, 어떤 객체들이 함께 조회되는지 확인해야 하므로, 개발자들이 엔티티(비즈니스 요구사항을 모델링한 객체)를 신뢰할 수 없다. 이 것은 진정한 의미의 계층 분할이 아니다. 

1. 진정한 의미의 계층 분할이 어렵다
2. 엔티티를 신뢰할 수 없다.
3. SQL에 의존적인 개발을 피할 수 없다.

- DDD

    **MDD**

    Entity → Id (식별할 수 있는 객체)

    VO → 식별할 수 있음. 공유하는 주소 

    ---

    Service → 형용사? (MVC의 서비스와는 비슷하면서 다른?)

    Specification(명세) ?

    사람이 문을 연다                   → Service : 우리 직원

    명사   문 class 동사

        → open(Person)

## 3. JPA의 문제 해결

CRUD 작업을 할 때, 개발자가 직접 SQL이 작성하는 것이 아니라 JPA가 제공하는 API를 사용하면 된다.

# 객체와 RDBMS의 패러다임의 불일치

## 발생 이유

객체와 관계형 데이터베이스의 목적, 기능, 표현방법이 다르므로, 객체 구조를 테이블 구조에 저장하는 데 한계가 있다.

문제 > 비즈니스 요구사항을 정의한 도메인 모델을 외부에 저장할 때 발생

### 객체

구조 - `속성(필드)`, `기능(메서드)`

### RDBMS의 구조

데이터 중심으로 구조화, 집합적 사고 요구

## 문제

### 1. 상속

객체는 상속이라는 기능이 있으나 테이블은 상속이 없다.

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/40c41911-ff46-438a-a7c5-338b9c6ae71f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-08-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.46.43.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210806%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210806T021641Z&X-Amz-Expires=86400&X-Amz-Signature=056383cc8f9c3cfeb8403386704c71d1ab12bf2b52bd6749d1d4eef706a7ff7a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2021-08-04_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_9.46.43.png%22)

```java
abstract class Item {
	Long id;
	String name;
	int price;
}

class Album extends Item {
	String artist;
}
class Movie extends Item {
	String director;
	String actor;
}
class Book extends Item {
	String author;
	String isbn;
}
```

만약, Album 객체나 Movie, Book 객체를 저장하려면, Item과 상속받는 객체를 분해하여 두 SQL을 만들어야 한다.

```java
insert into item ... 
insert into album ...
```

조회 역시 item과 album 테이블을 조인하여 조회한 다음, 그 결과를 통해 Album 객체를 생성해야 한다. → 패러다임 불일치 해결을 위해 소모하는 비용 

### 1-1. JPA와 상속

JPA는 위와같은 상속 관련 패러다임 불일치 문제를 해결한다.

```java
jpa.persist(album);
```

`persist()` 메소드를 실행하면 위에서의 번거로운 과정을 JPA가 대신 해준다.

### 2. 연관관계

**객체**는 `참조`를 사용하여 `연관관계`를 가지고, `참조`에 접근하여 연관된 `객체`를 조회한다. 

**테이블**은 `외래 키`를 사용해서 다른 테이블과 `연관관계`를 가지고, `조인`을 사용해서 `연관된 테이블`을 조회한다.


![img2](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b89f143f-7baf-4ca3-88db-cdc6dcfd7e8e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-08-04_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_10.22.34.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210806%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210806T021724Z&X-Amz-Expires=86400&X-Amz-Signature=c9fe0ad179b49bdd279a7f9bdb03cd929e9b1215a1251be10c0c4598a1154587&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2021-08-04_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_10.22.34.png%22)

참조를 사용하는 객체와 외래 키를 사용하는 관계형 데이터베이스 사이의 패러다임 불일치는, 객체지향 모델링을 포기하게 만들 정도로 극복하기 어렵다.

**객체 >**

`Member`은 `Member.team` 필드에, `Team` 객체의 참조를 보관하여, `Team` 객체와 관계를 맺는다. 따라서 이 참조 필드에 접근하면 `Member`와 연관된 `Team`을 조회할 수 있다.

**테이블 >**

`MEMBER` 테이블은 `MEMBER.TEAM_ID` 외래 키 컬럼을 사용하여, `TEAM` 테이블과 관계를 맺는다. 

이 외래키를 사용하여 `MEMBER` 테이블과 `TEAM` 테이블을 조인하면 `MEMBER` 테이블과 연관된 `TEAM` 테이블을 조회할 수 있다. 

**차이점 >**

`team.getMember()`는 불가능하지만, 외래키 하나로 `TEAM JOIN MEMBER`는 가능하다.

### 2.1 객체를 테이블에 맞추어 모델링

```java
class Member {
	String id;
	Long teamId; // TEAM_ID FK
	String username; 
}

class Team {
	Long id;
	String name;
}
```

위와 같이 객체를 테이블에 맞추어 모델링하면, 객체를 테이블에 저장하거나 조회할 때는 편리하지만, 객체지향적인 방법은 아니다. 

객체는 연관된 참조를 보관해야, 참조를 통해 연관된 객체를 찾을 수 있다.

`Team team = member.getTeam();`

이러한 참조를 통한 조회가 가장 객체지향적인 방법이다. 

### 2.2 객체지향적 모델링

```java
class Member {
	String id;
	Team team;
	String username;
	
	Team getTeam() {
		return team;
	}
}

class Team {
	Long id;
	String name;
}
```

Member.team의 필드는 외래 키의 값을 그대로 보관하는 것이 아닌, Team의 참조를 보관한다,

이처럼 객체지향 모델링을 사용하면, 객체를 테이블에 저장 or 조회 하는 것은 쉽지 않다. 

### 2.3 JPA와 연관관계

JPA는 연관관계와 관련된 패러다임의 불일치 문제를 해결

: 객체의 `참조` → `외래키`로 변환

## 3. 객체 그래프 탐색

객체 그래프 탐색이란?

`Team team = member.getTeam();`

MemberDAO에서 회원과 팀에 대해서만 데이터를 조회한 경우, member.getTeam()에 대한 조회는 성공하지만, member.getOrder()는 실패한다.

**SQL을 직접 다루면, 처음 실행하는 SQL에 따라 객체 그래프를 어디까지 탐색할 수 있는지 정해진다. → 객체지향에서는 제약** 

- 비즈니스 로직에 따라 사용하는 객체 그래프가 다름
- 언제 끊어질지 모르는 객체 그래프를 함부로 탐색할 수 없다.

### 3-1. JPA와 객체 그래프 탐색

JPA는 객체를 사용하는 시점에 적절한 SELECT SQL을 실행

- 연관된 객체 1) 즉시 조회(Eager Loading), 2) 실제 사용하는 시점에 지연 조회(Lazy Loading)할 지 설정을 통해 정의

## 4. 비교

DB → PK를 통해 각 row구분

객체 → 동일성, 동등성 비교

- `동일성 비교`는 `==` 비교 → `객체 인스턴스 주소 값` 비교
- `동등성 비교` → `equals()`를 통한 `객체 내부의 값` 비교

```java
Member member1 = memberDAO.getMember(memberId);
Member member2 = memberDAO.getMember(memberId);
```

`member1 ≠ member2`

### 4-1. JPA와 비교

JPA는 같은 트랜잭션일 때 같은 객체가 조회되는 것을 보장

따라서 `member1 = member2`

# JPA란 무엇인가?

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff2d8e09-cdfb-4f09-a5cd-91f91dc7f23d/IMG_2068.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff2d8e09-cdfb-4f09-a5cd-91f91dc7f23d/IMG_2068.jpg)

JPA(Java Persistence API)는 자바의 ORM 기술 표준이다. ORM은, Object-Relational Mapping 이름 그대로 객체 ↔ RDBMS를 매핑한다는 뜻이다. ORM 프레임워크는 위와 같이 객체와 테이블을 매핑하여 둘 사이의 패러다임 문제를 해결해준다. 

## JPA 소개

### 하이버네이트

자바 진영의 오픈소스 ORM 프레임워크

EJB의 ORM이었던 엔티티 빈과 비교했을 때, 가볍고 실용적이며 기술 성숙도도 높음, 자바 엔터프라이즈 애플리케이션 서버 없이도 동작

→ EJB 3.0에서 하이버네이트 기반으로 새로운 자바 ORM 표준 탄생 ⇒ JPA!

![img3](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ff2d8e09-cdfb-4f09-a5cd-91f91dc7f23d/IMG_2068.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210806%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210806T021821Z&X-Amz-Expires=86400&X-Amz-Signature=55b7f95f5bfb9e479dae896547d3e01f68db187c7ea8735c6cd36c57dba52ca0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22IMG_2068.jpg%22)

**JPA는 자바 ORM 기술에 대한 표준 명세**

→ 인터페이스를 모아둔 것

→ 이 인터페이스들을 구현한 프레임워크가 `하이버네이트`

## JPA를 사용해야 하는 이유

### 생산성

지루하고 반복적인 코드와 CRUD용 SQL을 개발자가 직접 작성하지 않아도 O

객체 설계 중심의 개발 가능

### 유지보수

기존에는 엔티티에 필드 하나만 추가해도 CRUD SQL과 결과를 매핑하기 위한 JDBC API 코드를 전부 변경해야 했지만, JPA는 대신 처리해주어 수정해야할 코드가 줄어든다

### 패러다임의 불일치 해결

### 성능

JPA 없이는 같은 트랜잭션 안에서 같은 코드를 두 번 조회 했어야 했지만, JPA를 통해 한 번만 DB에 조회한 뒤, 그 뒤로는 기존에 조회한 객체 사용 가능

### 데이터베이스 접근 추상화와 벤더 독립성

RDBMS는 같은 기능도 벤더마다 사용법이 다르다. 

하지만 JPA는 특정 DB 기술에 종속되지 X

방언 설정을 해주면 된다.

### 표준