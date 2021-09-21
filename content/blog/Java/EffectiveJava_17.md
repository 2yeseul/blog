---
title: '[이펙티브 자바] 17. 변경 가능성을 최소화하라'
date: 2021-08-23 00:00:00
description: ""
tags: [Java]
thumbnail: 
---  

17. 변경 가능성을 최소화하라

불변 인스턴스에 간직된 정보는 고정되어 객체가 파괴되는 순간까지 절대 달라지지 않는다. 자바 기본 클래스에서 String, BigInteger, BigDemical이 이에 속한다. 

**불변 클래스는 가변 클래스보다 구현하고 사용하기 쉬우며, 오류가 생길 여지가 적고 훨씬 안전하다.**

# 불변 클래스로 만들기 위한 다섯가지 규칙
1. 객체의 상태를 변경하는 메서드(변경자)를 제공하지 않는다.
2. 클래스를 확장할 수 없도록 한다. 
3. 모든 필드를 final로 설정한다. 
4. 모든 필드를 private으로 설정한다. 
5. 자신 외에는 내부의 가변 컴포넌트에 접근할 수 없도록 한다. 


``` java
public final Class Complex {
    private final double re;
    private final double im;

    public Complex(double re, double im) {
        this.re = re;
        this.im = im;
    }

    public double realPart() {
        return re;
    }

    public double imaginaryPart() {
        return im;
    }

    public Complex plus(Complex c) {
        return new Complex(re + c.re, im + c.im);
    }

    public Complex minus(Complex c) {
        return new Complex(re - c.re, im - c.im);
    }

    // .. 

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }

        if (!(o instanceof Complex)) {
            return false;
        }

        Complex c = (Complex) o;

        return Double.compare(c.re, re) == 0
                && Double.compare(c.im, im) == 0;
    }

}
```

# 불변 객체의 장점
1. 불변 객체는 단순하다. 불변 객체는 생성된 시점의 상태를 파괴될 때 까지 보존한다.

    반면 가변 객체는 임의의 복잡한 상태에 놓일 수 있다. 변경자 메서드가 일으키는 상태 전이를 정밀하게 문서로 남겨놓지 않은 가변 클래스는 믿고 사용하기 어렵다.
2. 불변 객체는 근본적으로 스레드 안전하여 동기화할 필요가 없다. 

    여러 스레드가 동시에 사용해도 훼손되지 않는다.

3. 불변 객체는 안심하고 공유할 수 있다. 따라서 불변 클래스라면 한 번 만든 인스턴스를 최대한 재활용하기를 원한다.

4. 불변 객체는 자유롭게 공유 가능함은 물론, 불변 객체 끼리는 내부 데이터를 공유할 수 있다. 

5. 객체를 만들 때 다른 불변 객체들을 구성요소로 사용하면 이점이 많다. 값이 바뀌지 않는 구성요소들로 이뤄진 객체라면, 그 구조가 아무리 복잡하더라도 불변식을 유지하기 훨씬 수월하다.

# 불변 객체의 단점
1. 값이 다르면 반드시 독립된 객체로 만들어야한다. 값의 가짓수가 많은 경우 비용 소모가 크다.(특정 상황에서의 잠재적 성능 저하)


# 정리
- `getter` 가 있다고 해서 무조건 `setter`를 만들지 않는 것이 좋다. 꼭 필요한 경우가 아니라면 불변이어야 한다. 
- 모든 클래스를 불변으로 만들 수 없기 때문에 불변으로 만들 수 없는 클래스라도 변경할 수 있는 부분을 최소한으로 줄이자.
    - 다른 합당한 이유가 없다면, 변경해야 할 필드를 뺀 나머지 모든 필드는 private final이어야 한다.
- 생성자는 불변식 설정이 모두 완료된, 초기화가 완벽히 끝난 상태의 객체를 생성해야 한다.

