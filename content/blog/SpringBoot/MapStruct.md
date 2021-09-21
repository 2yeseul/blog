---
title: 'Entity와 DTO 간 매핑에 대한 코드를 자동 생성하는 MapStruct'
date: 2021-07-31 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  

# Entity와 DTO 간 매핑에 대한 코드를 자동 생성하는 MapStruct

Spring에서, Entity와 DTO 간 매핑을 자주하게 된다. 레이어 간 데이터를 주고받을 때 혹은 비즈니스 로직에서의 형변환 등이 그 경우이다.
이러한 작업을 수동으로 개발자가 직접 할 때 발생하는 문제점은 다음과 같다.

> 1. 지루하며 반복적이고 코드 중복이 발생한다.
> 2. 필드가 많은 경우 실수하기 쉽다. 
> 3. 생산성 저하
> 4. 코드의 복잡성

객체 간 매핑을 자동으로 생성해주는 `MapStruct` 라이브러리를 사용한다면 위와 같은 문제점을 제거할 수 있다.

# MapStruct의 장점

> 1. 컴파일 시점에서 오류 확인 가능
> 2. 리플렉션을 사용하지 않기 때문에 매핑 속도가 빠르다. (ModelMapper는 리플렉션을 사용한다.)
> 3. 디버깅이 쉽다.
> 4. 빌드 시, 매핑 코드가 자동생성되기 때문에 눈으로 확인할 수 있다.


# 사용 예시
## 메서드 추상화 
``` java
public interface GenericMapper<D, E> {

    D toDto(E e);

    E toEntity(D d);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(D dto, @MappingTarget E entity);
}
```

공통적으로 사용되는 메서드들을 추상화한 `GenericMapper` 라는 인터페이스를 생성한다.

## 구현
``` java
@Mapper(componentModel = "spring", uses = ExampleEntity.class)
public interface ExampleEntityMapper extends GenericMapper<ExampleDto, ExampleEntity> {
    ExampleEntity toEntity(ExampleDto dto);
}
```

``` java
@Mapper(componentModel = "spring")
public interface ExampleResponseDto extends GenericMapper<ExampleResponseDto, ExampleEntity> {

    @Mapping(target = "someIgnoreField", ignore = true)
    ExampleResponseDto toDto(ExampleEntity exampleEntity);
}
``` 

참고

https://meetup.toast.com/posts/213