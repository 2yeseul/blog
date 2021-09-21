---
title: '[이펙티브 자바] 02. 생성자에 매개변수가 많다면 빌더를 고려하라'
date: 2021-07-05 00:00:00
description: ""
tags: [Java]
thumbnail: 
---  

# 02. 생성자에 매개변수가 많다면 빌더를 고려하라

정적 팩터리와 생성자는 선택적 매개변수가 많을 때 적절히 대응하기 어렵다. 

# 점층적 생성자 패턴
보통은 `점층적 생성자 패턴(telescoping constructor pattern)` 을 사용하는데, 이러한 경우는 필수 매개변수만 받는 생성자, 선택 매개변수를 n개 받는 생성자,... 등의 형태로 생성자를 계속 만들어주어야 한다. 

보통 이러한 생성자는 사용자가 설정하기를 원치않는 매개변수까지 포함하기 쉽고, 매개변수가 많아지는 경우 클라이언트가 코드를 작성하거나 읽기 어려워진다. 

# 자바빈즈 (setter) 패턴
점층적 생성자 패턴 외에, 선택 매개변수가 많을 경우 사용할 수 있는 두 번째 대안은 `자바빈즈 패턴` 이다. 매개변수가 없는 생성자로 객체를 생성한 뒤 setter를 통해 매개변수의 값을 설정하는 방법이다. 

하지만 자바빈즈 패턴에서는 객체 하나를 만들기 위해 메서드를 여러 개를 호출해야하며, 객체가 완전히 생성되기 전까지는 일관성(consistency)가 무너진 상태가 된다. 

일관성이 깨진 객체의 문제점은 버그를 심은 코드와 그로인해 런타임에 문제를 겪는 코드 사이의 물리적 거리가 길다는데에 있다. 

따라서 자바빈즈 패턴을 사용할 때 일관성이 무너져 결국 클래스를 불변으로 만들 수 없기 때문에, 프로그래머가 스레드의 안정을 위한 추가 작업을 해주어야 한다. 

# 빌더 패턴
위의 두 가지 패턴에서 장점은 취하고 단점은 제한 패턴이 바로 `빌더패턴` 이다.

클라이언트는 필요한 객체를 직접 만드는 대신, 필수 매개변수만으로 생성자(or 정적 팩터리)를 호출하여 빌더 객체를 얻는다. 그런 다음, 빌더 객체가 제공하는 일종의 세터 메서드를 통해 선택 매개변수를 설정한다. 빌더는 생성할 클래스 안에 정적 멤버 클래스로 만들어두는 게 보통이다. 

``` java
// Effective Java의 Builder Pattern
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static class Builder {
        // Required parameters(필수 인자)
        private final int servingSize;
        private final int servings;

        // Optional parameters - initialized to default values(선택적 인자는 기본값으로 초기화)
        private int calories      = 0;
        private int fat           = 0;
        private int carbohydrate  = 0;
        private int sodium        = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings    = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;    // 이렇게 하면 . 으로 체인을 이어갈 수 있다.
        }
        public Builder fat(int val) {
            fat = val;
            return this;
        }
        public Builder carbohydrate(int val) {
            carbohydrate = val;
            return this;
        }
        public Builder sodium(int val) {
            sodium = val;
            return this;
        }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize  = builder.servingSize;
        servings     = builder.servings;
        calories     = builder.calories;
        fat          = builder.fat;
        sodium       = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }
}
``` 

``` java
NutritionFacts cocaCola = new NutritionFacts(240, 8).calories(100).sodium(35).carbohydrate(27).build();
```

이런 스타일의 빌더 패턴은 Lombok의 `@Builder` 를 통해 쉽게 사용 가능하다. 클래스나 생성자에 `@Builder`를 붙여주면, 위와 같은 비슷한 빌더 패턴의 코드를 사용할 수 있다.

이 클라이언트 코드는 쓰기 쉽고, 가독성이 좋다.

# 요약 
빌더 패턴의 장점을 두 가지로 요약하자면 다음과 같다. 객체 생성을 깔끔하게 할 수 있다. 점층적 생성자 패턴과 자바빈 패턴의 장점만을 가져온 것이 빌더 패턴이다. 또한 객체 생성을 유연하게 할 수 있는데, 빌더 인터페이스를 작성하여 다양한 빌더를 사용할 수 있다.