---
title: '[토비의 스프링] 스프링 IoC - (1)'
date: 2021-06-28 00:00:00
description: ""
tags: [Java, SpringBoot]
thumbnail: 
---  
# [토비의 스프링 3.1] 스프링 IoC

스프링을 이루는 근간 중 하나인 IoC, 즉 제어의 역전에 대해서는 개념적으로는 알고 있어도, 사실 완벽하게 이해는 못했던 상태였다. 스프링 컨테이너가 이런 저런 것들을 위임받아 빈들을 관리해서 어쩌구 저쩌구 하여 제어의 역전이 일어난다.. 라는 수많은 블로그들의 글로는 제어의 역전에 대한 2프로(?)의 부족한 이해만을 남겼다. 

그렇다면 스프링의 명서이자 바이블로 불리는 토비의 스프링에서는 IoC를 어떻게 설명하고 있을까. 

# 제어의 역전

우선 `제어의 역전` 이라는 것은, 간단하게 말하여 프로그램의 제어 흐름 구조가 뒤바뀌는 것이라고 할 수 있다.

그렇다면 일반적인 프로그램의 제어 흐름은 어떻게 될까?

일반적인 프로그램의 제어 흐름은, main() 메소드와 같이 프로그램이 시작되는 지점에, 다음에 사용할 오브젝트를 결정하고, 결정한 해당 오브젝트를 생성하여 오브젝트에 있는 메소드를 호출한다. 또 그 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 일련의 흐름이 반복된다. 

이 과정에서, **오브젝트는 자신이 사용할 오브젝트나 메소드를 스스로 결정한다.** 모든 오브젝트는 능동적으로 자신이 사용할 클래스를 결정하고, 언제 어떻게 그 오브젝트를 만들지를 스스로 관장한다. 

즉, 사용자가 모든 작업을 제어한다. 

제어의 역전은 이러한 흐름을 완전히 뒤집는 것이다. 제어의 역전에서는, **오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다. 생성역시 마찬가지다. 자기 자신도 어떻게 만들어지고 어디서 사용되는지 알 수 없다.**

## 프레임워크

프레임워크도 제어의 역전이 적용된 대표적인 기술이다. 여기서 알아두어야 할 점은, 프레임워크는 라이브러리의 다른 이름이 아니다. 프레임워크는 단지 미리 만들어둔 반제품이나, 확장해서 사용할 수 있도록 준비된 추상 라이브러리의 집합이 아니다.

라이브러리와 프레임워크의 차이점은 이러하다.

우선 `라이브러리` 를 사용하는 애플리케이션 코드는 애플리케이션 흐름을 **직접** 제어한다. 동작하는 중에 필요한 기능이 있을 때 **능동적으로 라이브러리를 사용할 뿐이다.**

반면에 `프레임워크`는 애플리케이션 코드가 프레임워크에 의해 사용된다.

# 스프링의 IoC
## 오브젝트 팩토리를 이용한 스프링 IoC

### 빈
스프링이 제어권을 가지고 직접 만들어 관계를 부여하는 객체, 즉 application component를 의미한다.

스프링 빈은 스프링 컨테이너가 생성과 관계 설정, 사용 등을 제어해주는 제어의 역전이 적용된 오브젝트를 가리키는 말이다.

### 빈 팩토리 
스프링에서는 빈의 생성과 관계설정 같은 제어를 담당하는 IoC 오브젝트를 `빈 팩토리` 라고 부른다. 보통은 빈 팩토리라는 용어 대신, 이를 좀더 확장한 `애플리케이션 컨텍스트` 를 주로 사용한다. 빈 팩토리는 빈을 생성하고 관계를 설정하는 IoC의 기본 기능에 초점을 맞춘 것이고, 애플리케이션 컨텍스트는 애플리케이션 전반에 걸쳐 모든 구성요소의 제어 작업을 담당하는 IoC 엔진이라는 의미가 좀 더 부각된다고 보면 된다.

애플리케이션 컨텍스트는 별도의 정보를 참고하여 빈의 생성, 관계 설정 등의 제어 작업을 총괄한다. 
