---
title: 'Spring Boot - JPA - MySQL 연동
'
date: 2021-01-01 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

[참고한 블로그 글입니다.]([https://devlab.neonkid.xyz/2018/06/06/spring/2018-06-06-Spring-boot-%EC%97%90%EC%84%9C-DBMS%EB%A5%BC-%EC%97%B0%EB%8F%99%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-JPA-%EA%B8%B0%EB%B3%B8%ED%8E%B8/](https://devlab.neonkid.xyz/2018/06/06/spring/2018-06-06-Spring-boot-에서-DBMS를-연동하는-방법-JPA-기본편/))



(소소한 삽질을 해서 정리해두는 글..)

### 1. build.gradle 의존성 설정

##### build.gradle

```gradle
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
compile 'mysql:mysql-connector-java'
```

의존성 부분에 각각 써주기

jpa 이미 설정해두었다면 mysql만 설정

### 2. application.properties or application.yml

##### application.properties

```properties
server.address=localhost
server.port=8080

# API 호출시, SQL 문을 콘솔에 출력한다.
spring.jpa.show-sql=true

# DDL 정의시 데이터베이스의 고유 기능을 사용합니다.
# ex) 테이블 생성, 삭제 등
spring.jpa.generate-ddl=true

# MySQL 을 사용할 것.
spring.jpa.database=mysql

# MySQL 설정
spring.datasource.url=jdbc:mysql://localhost:3306/DBNAME?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC
spring.datasource.username=db아이디
spring.datasource.password=db비번
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# MySQL 상세 지정
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
```

or

##### application.yml

```yaml
server:
    address: localhost
    port: 8080
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        password: db비번
        url: jdbc:mysql://localhost:3306/DBNAME?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC
        username: db아이디
    jpa:
        database: mysql
        database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
        generate-ddl: true
        show-sql: true

```



- yaml 사용할 때 분명 맞게 썼는데 오류가 나는 것 같다면..공백 등 무언가를 잘못 입력했을 가능성이 높으므로 구글에서 [properties to yaml](http://www.allencoders.online/converters/props2yaml) 쳐서 convert 하는 것도 방법 

  