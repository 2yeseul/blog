---
title: 'Thread'
date: 2021-01-23 01:53:00
description: ""
tags: [Java]
thumbnail: 
---  

- [Thread](#thread)
  * [정의](#--)
  * [왜 사용할까?](#-------)
  * [상태](#--)
    + [NEW](#new)
    + [RUNNABLE](#runnable)
    + [WAITING](#waiting)
    + [TIMED_WAITING](#timed-waiting)
    + [BLOCK](#block)
    + [TERMINATED](#terminated)
  * [스케줄링](#----)
    + [우선순위](#----)
    + [라운드 로빈](#------)
- [Thread 클래스와 Runnable 인터페이스](#thread------runnable------)
  * [yield()](#yield--)
  * [sleep()](#sleep--)
  * [join()](#join--)
- [main 쓰레드](#main----)
- [synchronized](#synchronized)
- [데드락](#---)
  * [멀티 쓰레드란](#-------)
    + [문제점](#---)
  * [크리티컬 섹션](#-------)
  * [원인](#--)
    + [**자원의 배타적 사용(Mutual Exclusion Condition)**](#-------------mutual-exclusion-condition---)
    + [**자원의 부분 할당(Partial Allocation, Hold and Wait)**](#------------partial-allocation--hold-and-wait---)
    + [**자원의 선점 불가능성(Non Preemption)**](#--------------non-preemption---)
    + [**자원에 대한 환형 대기(Circular Wait)**](#---------------circular-wait---)
  * [해결](#--)
    + [**예방(Prevention)**](#-----prevention---)
    + [**회피(Avoidance)**](#-----avoidance---)
    + [**탐지(Detection)**](#-----detection---)
    + [**복구(Recovery)**](#-----recovery---)

    # Thread

## 정의

`Thread`는 CPU에서 작업을 수행하는 가장 작은 단위이다. 프로그램 하나를 실행시키면 하나 이상의 thread가 실행된다. 예를들어, "Hello, World"라는 자바 프로그램을 실행시키면 문자열을 출력하는 쓰레드가 실행된다. 하지만 실제로는 다른 쓰레드도 같이 실행이 되는데, 메모리 작업을 해주는 GC(Garbage Collection) 관련 쓰레드가 그 예이다.

## 왜 사용할까?

두 가지 연산을 수행하는 상황이 있다고 가정하자. 하나는 1부터 1000까지의 합을 구하는 연산이고, 다른 하나는 1부터 10까지의 곱을 구하는 연산이다.

```java
public class EX1 {
    public static void main(String[] args) {
        int calculation1 = 1;
        int calculation2 = 1;

        for(int i=2;i<=1000;i++) calculation1+=i;
        for(int i=2;i<=10;i++) calculation2*=i;

        System.out.println("calculation1 is " + calculation1);
        System.out.println("calculation2 is " + calculation2);
    }
}
```

`프로그램 실행 과정`은 우선 `calculation1`을 계산 후, `calculation2`를 계산한다.

하지만 연산 1과 연산 2는 독립적인데, 아무 관계가 없는 두 연산을 굳이 순서대로 할 이유가 없다. 즉 두 연산을 한꺼번에 해도 상관이 없다.

쓰레드를 통해 두 연산을 동시에 진행해보자.

```java
class C1 extends Thread{
    public void run() {
        int result = 1;
        for(int i=2;i<=1000;i++) result+=i;
        System.out.println("calculation1 is " + result);
    }
}

class C2 extends Thread{
    public void run() {
        int result = 1;
        for(int i=2;i<=10;i++) result*=i;
        System.out.println("calculation2 is " + result);
    }
}

class ex2 {
    public static void main(String[] args) {
        C1 c1 = new C1();
        C2 c2 = new C2();

        c1.start();
        c2.start();
    }
}
```

출력결과

```
calculation2 is 3628800
calculation1 is 500500
```

c1과 c2의 연산이 동시에 실행 되는데, c2는 10번만 연산을 수행하므로 더 빨리 끝나기 때문에 출력결과는 c2가 먼저나왔다.

만약 두 개의 연산이 1시간씩 걸린다면, 쓰레드를 안쓴다면 각각 연산을 수행해야 하므로 2시간이 걸리겠지만, 쓰레드를 사용하면 연산을 동시에 수행하므로 1시간이 걸릴것이다.

## 상태

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F99D9E94B5A3CAD770ADF38](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F99D9E94B5A3CAD770ADF38)

[https://sjh836.tistory.com/121](https://sjh836.tistory.com/121)

### NEW

쓰레드가 생성된 상태. 아직 `start()` 되지 않음

### RUNNABLE

start()가 호출되어 실행 대기. run() 하면 Running(CPU 점유)이 된다. `Runnable pool`에 모여있음

### WAITING

일시정지, 다른 쓰레드의 통지를 기다림

### TIMED_WAITING

일시정지, 주어진 시간동안 기다림

### BLOCK

일시정지, 사용하려는 객체의 lock이 풀릴 때 까지 대기 etc..

### TERMINATED

실행 마친 뒤 종료. run()이 끝나면 terminated 되면서 소멸

## 스케줄링

자바 쓰레드는 `우선순위`랑 `라운드로빈`으로 스케줄링한다.

### 우선순위

`Priority` 값이 높은 쓰레드가 실행 상태를 더 많이 가진다. `기본이 5`이며 개발자가 `setPriority()`를 통해 컨트롤 할 수 있다.

### 라운드 로빈

`시간 할당량`(Time Slice)를 정하여 하나의 쓰레드를 정해진 시간만큼 실행시킨 뒤 다른 쓰레드를 실행한다. `JVM`이 컨트롤한다.

# Thread 클래스와 Runnable 인터페이스

쓰레드를 생성하는 방법은 두 가지가 있는데, 하나는 `Thread` 클래스를 사용하는 것이고, 다른 하나는 `Runnable` 인터페이스를 사용하는 것이다.

두 클래스 모두 `java.lang` 패키지에 있으므로 별도의 import가 필요없다. 또한 `Runnable` 인터페이스에는 구현할 메소드가 run()만 존재하므로, run()만 구현하면 된다. 

```java
class UseRunnable implements Runnable {

    @Override
    public void run() {
        System.out.println("UseRunnable run() method.");
    }
}

class UseThread extends Thread {
    public void run() {
        System.out.println("UseThread run() method.");
    }
}

class ThreadSample {
    public static void main(String[] args) {
        UseRunnable useRunnable = new UseRunnable();
        UseThread useThread = new UseThread();

        new Thread(useRunnable).start();
        useThread.start();

        System.out.println("ThreadSample program ends");
    }
}
```

실제로 실행되는 부분은 `run()` 메소드이고, 그 부분을 실행시키는 메소드는 `start()`이다. 쓰레드를 생성했다고 해서 자동으로 실행되는 것이 아니라, start()를 호출해야 쓰레드가 실행된다. 실제로는 start()가 호출 되어서 바로 실행되는 것이 아니라, 실행 대기 상태에 있다가 자신의 차례가 되어야 실행된다. 실행 대기 중인 쓰레드가 없다면 바로 실행상태가 된다. 

하지만 Runnable을 구현하여 만든 쓰레드는 바로 실행할 수 없고, new Thread(useRunnable)과 같이 Thread 클래스의 생성자를 통해 객체를 만들어야 한다.

번거롭지만 자바에서는 다중상속이 되지 않기 때문에, Thread 클래스를 상속 받는다면 다른 클래스는 상속받을 수 없다. 하지만 인터페이스는 여러 개를 구현할 수 있으므로 보통은 Runnable을 구현하는 것이 일반적이다.

한 번 종료된 쓰레드는 다시 실행할 수 없다. 즉, 하나의 쓰레드에 대해 start()가 한 번만 호출될 수 있다. 만일 쓰레드의 작업을 한 번 더 수행해야 한다면, 새로운 쓰레드를 생성한 다음 start()를 호출해야한다. 하나의 쓰레드에 대해 start()를 두 번 이상 호출하면 실행 시에 `IllegatThreadStateException`이 발생한다.

위의 코드를 여러 번 실행시키면, 출력순서가 뒤죽박죽이 된다. 쓰레드를 start() 메소드를 통해 시작했다는 것은, 하나의 쓰레드를 JVM에 추가하여 실행한다는 것이다. new Thread(useRunnable).start()를 통해 useRunnable 쓰레드가 JVM에 추가되고, useThread.start()를 통해 useTread 쓰레드가 JVM에 추가된다. useRunnable이 useThread를 통해 JVM에 들어갔지만 미세한 차이이며 두 쓰레드가 함께 실행되고 같은 연산을 해도 CPU 상태에 따라 실행시간에 미세한 차이가 있을 수 있다.

또한 useRunnable과 useThread는 ThreadSample 프로그램과 별개로 진행되므로, useRunnable, useThread는 진행중이면서 그 밑의 출력 코드가 실행된다. 따라서 결과가 뒤죽박죽이 된다.

## yield()

우선권이 동일한 쓰레드에게 실행할 기회를 양보한다. 이를 실행하면 `RUNNING` 상태에서 `RUNNABLE` 상태로 바뀐다.

## sleep()

일정 시간 동안 쓰레드를 멈추게 한다.

```java
static void sleep(long millis);
static void sleep(long millis, int nanos);
```

밀리 세컨드(1000분의 1초)와 나노 세컨드(10억분의 1초)의 시간 단위로 세밀하게 값을 지정할 수 있다.

sleep을 호출할 땐 항상 `try-catch`문으로 예외 처리를 해야한다.

## join()

다른 쓰레드와 협동 작업할 때 주로 쓴다. 호출되면 `BLOCKED` 상태가 되었다가, 기다리는 쓰레드의 작업이 끝나면 다시 `RUNNABLE`로 간다.

# main 쓰레드

`데몬 쓰레드`(daemon thread)

main 메소드의 작업을 수행하는 것도 쓰레드이며, 이를 main 쓰레드라고 한다. 지금까지는 main 메소드가 수행을 마치면 프로그램이 종료되었지만 main 메소드가 수행을 마쳤다고 하더라도 다른 쓰레드가 아직 작업을 마치지 않은 상태라면 프로그램이 종료되지 않는다.

# synchronized

하나의 쓰레드가 작업을 다 끝내기 전에는 다른 thread가 작업의 제어권을 가져가지 못하게 한다.

- `Thread`는 공유 자원을 서로 `sharing` 한다.
- 내가 작업하는 동안 어떤 쓰레드도 방해하지 못하도록 보장받아야함
- 동기화 처리는 무겁기 때문에 해당하는 기능에만 처리해야한다.

```java
public class CommonCalculate {
    private int value;

    public CommonCalculate(){
        value = 0;
    }

    public void plus(){
        value++;
    }

    public int getValue(){
        return value;
    }
}
```

value값을 더해주는 클래스이다.

```java
public class ChangeValue extends Thread{
    private CommonCalculate calc;

    public ChangeValue(CommonCalculate calc){
        this.calc = calc;
    }

    public void run(){
        for(int i=0; i<10000; i++) calc.plus();
    }
}
```

CommonCalculate를 다루는 ChangeValue라는 클래스이다. calc의 value값을 1씩 증가시키는 작업을 만 번 수행한다.

그리고 이 두 클래스를 사용하는 SyncEx 클래스를 만든다.

```java
public class SyncEx {
    public static void main(String[] ar){
        CommonCalculate calc = new CommonCalculate();
        ChangeValue t1 = new ChangeValue(calc);
        ChangeValue t2 = new ChangeValue(calc);

        t1.start();
        t2.start();

        try{
            t1.join();
            t2.join();
            System.out.println("calc.value = " + calc.getValue());
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
```

calc 객체를 t1과 t2 모두 사용한다. 그리고 t1, t2가 실행되는데, try-catch문에 있는 join 메소드는 해당 쓰레드가 끝날 때 까지 기다린다. 즉 t1, t2 쓰레드가 모두 끝날 때 까지 기다렸다가 calc 객체의 value 값을 확인한다. 

하지만 매번 실행할 때 마다 값이 다를 뿐더러 예상값과는 다르게 나오는데, 그 이유는 t1과 t2 두 객체가 동시에 진행되면서 같은 객체값을 가지고 연산하기 때문이다.

plus() 메소드의 연산 수행 과정은 다음과 같다.

```java
1. 현재 value 값을 읽고
2. value++를 계산하고
3. value값에 value++한 값을 대입하는 것이다.
```

value 값이 5라고 가정하자. t1의 쓰레드 연산이 1단계를 지나 2단계 까지 수행하였다면, 남은 일은 대입 뿐이다. 하지만 이 때 t2 쓰레드가 1단계인 현재 value값을 읽는 단계를 진행하려 한다면, t2가 읽은 value는 5가 맞다. 하지만 t2가 value값을 읽은 후 t1이 3단계를 진행하면 value는 6이 된다. 그렇다면 t2가 3단계 까지 진행한 다음의 value값은 6이 될 것이다. t1의 실행이 끝난 뒤 t2가 실행되었다면 value값은 7이 되었을 것이다. 

이런 경우들을 싱크가 안맞거나 혹은 쓰레드에 안전하지 않다라고 표현하는데, 이러한 상황을 `synchronized` 예악어로 방지할 수 있다.

```java
public synchronized void plus(){
        value++;
    }
```

plus() 메소드에 다음과 같이 `synchronized` 예약어를 써주면 예상값이 나온다. `synchronized` 는 해당 메소드가 하나의 쓰레드에서만 호출되도록 한다. 

하지만 이렇게 `synchronized`를 사용하면 비효율의 문제가 발생하는데,  예를 들어 여러 개의 연산이 존재하고 싱크를 고려해야할 연산은 하나 뿐이라고 가정하자. 이러한 상황에서 메소드 자체에 `synchronized` 를 붙이면, 메소드 안의 모든 연산이 한 번에 하나의 쓰레드 만 접근할 수 있으므로 비효울적이다. 그런 경우 다음과 같이 싱크를 고려해주고 싶은 연산에만 `synchronized` 를 사용할 수 있다.

```java
Object plusLock = new Object();
public void plus(){
    synchronized(plusLock){
        value++;
    }
}
```

잠금 처리를 하기 위해 this의 사용 대신 별도의 객체를 사용하여 lock 한다.

# 데드락

## 멀티 쓰레드란

1개의 응용프로그램이 쓰레드로 불리는 흐름 처리 단위를 복수 생성하여 복수의 처리를 병행하는 것이다. 중앙 처리 장치의 처리 시간을 매우 짧은 단위로 분할하여 복수의 쓰레드에 차례로 할당함으로써 복수의 처리가 동시에 이루어지는 것 처럼 보인다.

### 문제점

- 동시에 복수 개의 코드가 같은 주소 공간에서 실행되므로서 서로 간섭하고 영향을 주며, 주소 공간 분리의 이점이 없다.
- 쓰레드간의 실행 순서를 예측할 수 없어 디버깅이 어렵다.
- 공유 자원을 보호하기 어렵다.

## 크리티컬 섹션

- 멀티 쓰레드는 쓰레드간에 실행 순서가 규칙적이지 않아 동기화를 해주어야 한다.
- 프로세스 내에서만 사용해야하는 제약이 있으며, `임계구역` 혹은 `치명적 영역`이라고 한다.
- 다른 쓰레드에 의해 방해받지 말아야 할 작업을 할 때, 이 영역을 크리티컬 섹션으로 둘러싸면 `전역자원의 독점권`이 주워진다.

데드락, 즉 `교착 상태`는 멀티 쓰레드 중 쓰레드 간에 대기 상태가 종료되지 않아 무한정 대기만 하는 비정상적인 상황이다. 기아(Starvation)와는 다르게 외부적 조치 없이는 벗어날 수 없다.

## 원인

4가지 원인 중 하나라도 부정가능하다면 교착 상태에 빠지지 않는다.

### **자원의 배타적 사용(Mutual Exclusion Condition)**

배타적 사용이 요구되는 자원이 있으면 교착 상태가 발생할 수 있다.

### **자원의 부분 할당(Partial Allocation, Hold and Wait)**

프로세스는 필요한 시점에 필요한 자원을 부분적으로 확보하기에 어느 시점에 필요한 자원을 할당받지 못하지만 확보한 자원은 놓치 않게 되어 교착 상태가 발생할 수 있다.

### **자원의 선점 불가능성(Non Preemption)**

자원이 선점 불가할 경우 교착 상태가 발생할 수 있다.

### **자원에 대한 환형 대기(Circular Wait)**

자원을 보유한 채로 서로의 자원을 요청하게되면 교착 상태가 발생할 수 있다.

## 해결

### **예방(Prevention)**

- 교착 상태의 원인이 되는 조건 중 하나를 없앰으로써 교착 상태 발생을 방지하는 방법, **교착 상태를 확실히 제거할 수 있지만 심각한 자원 낭비와 특정 프로세스의 무한 대기 가능성이 있다.**
- 자원의 배타적 사용을 배제배타적 사용이 필요한 자원을 공유할 경우 큰 문제를 야기할 수 있다. 따라서 배제할 수 없다.
- 자원의 부분할당을 배제자신이 필요한 모든 자원을 미리 할당받아 실행하게끔 하는 방법으로 심각한 자원 낭비를 초래하고 무한 대기에 빠질 수 있다.
- 자원의 선점 불가능성을 배제모든 자원이 선점 가능할 경우 비정상적인 프로세스 종료로 인한 자원 낭비와 무한 대기에 빠질 수 있다.
- 자원의 환형 대기 상황을 배제자원에 대한 우선 순위를 책정하여 프로세스가 이 우선순위를 지켜 요청하도록 하는 방법, 마찬가지로 자원의 낭비와 무한 대기를 겪을 수 있다.

### **회피(Avoidance)**

- 특정한 알고리즘을 통해 시스템의 상태가 지속적으로 안전 상태를 유지할 수 있도록 조절하는 방법, 안전 상태는 교착 상태가 발생할 수 없는 상태를 의미한다. 대기 상태가 길어질 수 있지만 **예방보다 자원의 낭비를 감소시킬 수 있다.**
- **은행가 알고리즘**
    - 은행가 알고리즘이 정상적으로 작동하기 위해서는 다음과 같은 전제가 필요하다.
        - 시스템 내의 프로세스 수가 고정되어 있어야 한다.
        - 자원의 수가 고정되어 있어야 한다.
        - 각 프로세스가 요구할 자원의 최대 개수를 알아야 한다.
        - 각 프로세스는 할당받은 자원을 사용한 후 반드시 반납해야 한다.

        프로세스의 자원 요청이 있을 때 마다 요청에 따른 할당이 안전 상태를 유지할 수 있는지 확인한다. **안전 상태의 판단은 현 상태에서 모든 프로세스가 정상적으로 종료할 수 있는 길이 적어도 하나 이상 있는 것이다.**

### **탐지(Detection)**

- 교착 상태가 발생하였을 때 그를 탐지하여 조치(복구)를 취하는 방법이다. 탐지를 위해서는 현 시스템의 상황을 알아야하는데 자원 할당 그래프(Resource Allocation Graph, RAG)로 나타낸다.
- **그래프 제거법**
    - 싱크(나가는 간선이 없는 프로세스 노드, 활동이 가능한 프로세스)로부터 시작하여 들어오는 모든 간선을 제거한다.(가지고 있던 자원의 반납) 모든 싱크에 대해서 같은 작업을 수행했을 때 간선이 남아있으면 교착 상태다.
- **그래프 탐색법**
    - 대기 상황을 나타내는 간선을 따라 진행했을 때 싱크가 발견되면 교착 상태가 없으며 모든 경로를 탐색해도 싱크가 발견되지 않는다면 교착 상태가 있는 것이다.**사이클은 모든 자원이 한 개씩 있을 때만 교착 상태를 나타낸다.**

### **복구(Recovery)**

- **프로세스의 종료(Process Termination)**특정 프로세스를 종료시켜 자원을 확보하는 방법으로 프로세스를 종료시킬 때 종료 비용을 최소화하는 것이 관건이다.
    - 종료 비용이 가장 저렴한 하나의 프로세스를 종료시키는 방법하나를 종료시킬 때 마다 교착 상태가 제거되었는지 확인해야한다.
    - 모든 부분 집합을 만들어 종료 비용이 가장 저렴한 하나의 부분 집합을 모두 종료시키는 방법모든 부분 집합에 대한 비용을 계산하기가 복잡하고 힘들다.
- 자원의 선점에 의한 방식

    자원을 선점시켜 교착 상태를 해소하는 방법으로 선점으로 인한 복구 비용을 최소화하는 것이 관건이다.

    - 검사점 지정(Checkpointing)프로세스의 실행 중간 중간에 결과값을 저장해두어 복구시 검사점으로 복구

- 출처

    [https://onsil-thegreenhouse.github.io/programming/java/2018/05/23/java_tutorial_1-25/](https://onsil-thegreenhouse.github.io/programming/java/2018/05/23/java_tutorial_1-25/)

    [https://velog.io/@ednadev/4.-자바-쓰레드-Thread-ydh851la](https://velog.io/@ednadev/4.-%EC%9E%90%EB%B0%94-%EC%93%B0%EB%A0%88%EB%93%9C-Thread-ydh851la)

    [https://velog.io/@hyeon930/운영체제-5.-교착-상태Deadlock](https://velog.io/@hyeon930/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-5.-%EA%B5%90%EC%B0%A9-%EC%83%81%ED%83%9CDeadlock)

    [https://velog.io/@godkimchichi/Java-6-Thread-State](https://velog.io/@godkimchichi/Java-6-Thread-State)

    [https://sjh836.tistory.com/121](https://sjh836.tistory.com/121)