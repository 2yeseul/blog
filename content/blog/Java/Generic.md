---
title: 'Generic'
date: 2021-02-27 00:55:00
description: ""
tags: [Java]
thumbnail: 
---  

# 제네릭
## 제네릭이란?
프로그램에서 변수를 선언할 때 모든 변수는 자료형이 존재한다. 마찬가지로 메서드에서 매개변수를 사용할 때도 자료형이 있다. 하지만 보통 하나의 자료형으로 구현되므로, 변수나 메서드의 자료형을 필요에 따라 여러 자료형으로 바꿀 수 있다면, 프로그램이 훨씬 유연할 것이다.

이와같이 어떤 값이 하나의 참조 자료형이 아닌, 여러 참조 자로형을 사용할 수 있도록 프로그래밍 하는 것이 `제네릭(Generic) 프로그래밍` 이다. 

제네릭 프로그램은 참조 자료형이 변환댈 때, 이에 대한 검증을 컴파일러가 하므로 안정적이다. 컬렉션 프레임워크의 많은 부분 역시 제네릭으로 구현되어있다. 

## 제네릭 클래스 정의
제네릭에서는 여러 참조 자료형을 사용해야 하는 부분에 `Object`가 아닌, 하나의 문자로 표현한다. 

``` java
public class GenericPrinter<T> {

    private T material;

    public void setMaterial(T material) {
        this.material = material;
    }

    public T getMaterial() {
        return material;
    }
}
```

- 자료형 매개변수(type parameter) : T 
    - 나중에 클래스를 사용할 때, T 위치에 실제 사용할 자료형을 지정한다.
- 다이아몬드 연산자 <>
    - 자바 7 부터는 제네릭 자료형의 클래스를 생성할 때, 생성자에 사용하는 자료형을 명시하지 않는 것이 가능해졌다.

    `ArrayList<String> list = new ArrayList<>();`
    
    선언된 자료형을 보고 생략된 부분이 String 임을 컴파일러가 유추할 수 있기 때문에 생성 시에 생략할 수 있다.

## Bounded Type Parameters
T 자료형에 사용할 자료형에 제한을 둘 수 있다. 예를들어 숫자 처리를 위한 메서드를 만드는 경우, Number 타입 혹은 Number 타입의 자식 클래스의 객체만을 허용하는 메서드를 만들 수 있다. 혹은 떡볶이를 만드는 클래스가 있다고 할 때, 떡볶이를 만드는 재료에는 양념, 떡, 어묵 등으로 한정되어져 있다. 이러한 경우 제약이 없으면 뜬금없이 떡볶이를 만드는데 아이스크림(..)을 넣을 수도 있으므로, 이런 일을 방지하기 위해 사용할 클래스에 자료형을 제한해야한다. 

### 선언 방법 
`<T extends class>` 형식으로 가능하다. 

떡볶이를 만드는 클래스가 있다고 가정할 때, 떡볶이를 만드는 재료 Material이 필요할 것이다. 

``` java
public abstract class Material {
    public abstract void doPrintMaterial();
}
``` 

그 다음, 추상 클래스 Material을 상속받을 Sauce, Tteok 클래스를 만들어준다.

``` java
public class Sauce extends Material {
    public void doPrintMaterial() {
        System.out.println("양념");
    }
}
```

``` java
public class Tteok extends Material {
    public void doPrintMaterial() {
        System.out.println("떡");
    }
}
```

``` java
public class cookTteokboki<T extends Material> {
    private T material; 
    // ...
}
```

### `<T extends Class>` 로 상위 클래스 메서드 사용
T는 컴파일할 때 Object 클래스로 변환되므로, 바운디드 타입을 사용하지 않을 때에는 자료형을 알 수 없으므로, Object 클래스가 기본적으로 제공하는 메서드만 사용할 수 있다.
하지만 바운디드 타입을 사용하면, Class의 메서드를 사용하는 것이 가능하다. (위의 예시에서는 Material) 
따라서 <T extends Class> 를 선언하면 컴파일 시 내부적으로 T 자료형이 Object가 아닌 Class로 변환된다.

## WildCard
Generic으로 구현된 메서드의 경우, 선언된 타입으로만 매개변수를 입력해야한다. 이를 상속받은 클래스, 혹은 부모 클래스를 매개변수로 사용하고 싶어도 불가능하며, 혹은 그 어떤 타입이 와도 상관 없는 경우에 대응하기 좋지 않다. 이를 위한 해법으로 Wildcard를 사용한다.

### Unbound WildCard
List<?> 와 같은 형태로 물음표를 통해 정의된다. 내부적으로는 Object로 정의되어 모든 타입을 인자로 받을 수 있다. 타입 파라미터에 의존하는 메소드만을 사용하거나, Object 메소드에서 제공하는 기능으로 충분한 경우에 사용한다.

### Upper Bounded WildCard
List<? extends Foo> 와 같은 형태로 사용되는데, 특정 클래스의 자식 클래스 만을 인자로 받겠다는 선언이다. Foo 클래스를 상속받은 어떤 클래스가 와도 되지만, 사용할 수 있는 기능은 Foo에 정의된 기능만 가능하다. 

- `<T extends Class>` vs `<? extends Class>` 

`Upper Bounded WildCard` 에 대해 공부하고 나니, `Bounded Type`과 뭐가 다른거지? 라는 의문이 들었다. 

예를들어, `List<T extends String>` 의 경우, 이 List는 오직 T의 요소만을 포함할 수 있다.

하지만 `List<? extends String>` 의 경우, List는 String을 상속하는 어떤 요소도 사용할 수 있는 것이다. 

즉, 전자의 경우 T가 확정적으로 매칭되는 것이지만, ?는 허용되는 범위 내에서 `와일드카드` 로 자유롭게 사용할 수 있다. 

### Lower Bounded WildCard

`List<? super Foo>` 와 같은 형태로 사용되는데, Upper Bounded WildCard와는 반대로, 특정 클래스의 부모 클래스 만을 인자로 받겠다는 선언이다. 

## Erasure

타입 이레이져는 새로운 클래스들이 파라미터화된 타입에는 생성되지 않음을 보장하는데, 결과적으로 제네릭은 런타임 오버헤드를 발생시키지 않는다. 제네릭은 컴파일 타임에만 타입 체킹용으로 삭제되고, 모두 제네릭이 삭제된 상태로 동작한다. 컴파일러는 필요한 경우 타팁 캐스팅 코드를 넣어 컴파일한다. 

Type erasure 때문에 원칙적으로는 파라미터로 온 객체의 제네릭 타입은 알아낼 수 없지만, 클래스가 제네릭인 경우 클래스 자신의 타입은 알아낼 수 있다. 
