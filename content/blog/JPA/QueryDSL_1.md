---
title: 'QueryDSL (1) - 설정과 예제'
date: 2021-07-12 00:00:00
description: ""
tags: [Java, JPA, QueryDSL]
thumbnail: 
---  

# QueryDSL (1)

Java의 표준 ORM인 JPA를 통해 개발자는 복잡한 설정이나 일일히 쿼리를 작성할 필요 없이 간단한 설정을 통하여 쿼리를 생성할 수 있다. 하지만 `JpaRepsitory`를 통해 복잡한 쿼리는 작성하기 까다로운데, 특히 복잡한 동적 쿼리가 필요한 경우 난감한 상황이 많았다. 이러한 경우 보통 `@Query` 어노테이션을 통해 네이티브로 쿼리를 작성했지만, 발생하는 몇 가지 문제점이 있다.

> 1. Type safe 하지 않다.
> 2. 유지보수 하기 어렵다.
> 3. 다양한 조회 기능을 사용하기엔 한계가 있다.
> 4. human error의 발생 가능성 농후

QueryDSL은 문자가 아닌 코드를 통해 안전하게 쿼리를 작성할 수 있고, 복잡한 동적 쿼리를 깔끔하게 작성할 수 있다. 또한 쿼리 작성 과정에서 IDE의 코드 완성 기능을 사용하여 쿼리를 더 빠르고 안전하게 만들 수 있다. 

# 1. Gradle 설정 

## 1-1. 의존성 추가 
``` java
dependencies {
    // QueryDSL
    implementation "com.querydsl:querydsl-jpa:${queryDslVersion}"
    annotationProcessor(
            "javax.persistence:javax.persistence-api",
            "javax.annotation:javax.annotation-api",
            "com.querydsl:querydsl-apt:${queryDslVersion}:jpa")
}
```

## 1-2. QueryDSL이 생성하는 QClass 경로 생성
QueryDSL이 생성하는 QClass들의 경로를 설정해야 한다. 
``` java 
def generated='src/main/generated'
sourceSets {
    main.java.srcDirs += [ generated ]
}

tasks.withType(JavaCompile) {
    options.annotationProcessorGeneratedSourcesDirectory = file(generated)
}
``` 
gradle의 Task에서 compileJava를 실행하면, 지정한 경로에 QClass가 generate 된다. 
# 2. Java Configuration

``` java
@Configuration
public class QueryDslConfiguration {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        return new JPAQueryFactory(entityManager);
    }
}
``` 
위와 같이 설정하면 어느 곳에서나 JPAQueryFactory를 주입받아 QueryDSL을 사용할 수 있다. 

# 3. 예제 

``` java
import static com.example.dog_cat_api.domain.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostQueryRepository  {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Post> findByPetName(String petName) {
        return jpaQueryFactory.selectFrom(post)
                .where(post.petName.eq(petName))
                .fetch();
    }
}
```  

처음에 인텔리제이에서 QClass를 자동으로 import 해주지 않아 조금 애를 먹었는데.. 그냥 수동으로 import 시켜 주었다. generate된 경로의 객체를 static으로 import 시키면, 해당 클래스를 주입받아 사용할 수 있다. 


출처

자바 ORM 표준 JPA 프로그래밍

https://velog.io/@aidenshin/Querydsl-Gradle-%EC%84%A4%EC%A0%95

https://github.com/cheese10yun/blog-sample/blob/master/query-dsl/docs/querydsl-custom-repository.md

https://jojoldu.tistory.com/372
