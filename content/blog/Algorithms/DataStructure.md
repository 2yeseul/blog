---
title: '자료구조 - 배열, 링크드리스트, 스택, 큐 정리'
date: 2021-05-05 18:06:00
description: ""
tags: [Algorithms]
thumbnail: 
---  

# Data Structure

# Array & Linked List

## Array 
1. 논리적 저장 순서와 물리적 저장 순서가 일치
2. 찾고자 하는 원소의 **인덱스를 알면** `시간복잡도 O(1)`에 해당 원소에 접근가능하다.
    - 즉 random access가 가능하다.
3. 하지만 삭제 or 삽입 시, 해당 원소에 접근하여 작업을 완료하는 시간 -> O(1)에, 또 한가지 작업을 해줘야한다. 배열의 원소 중 어느 원소를 삭제한다면 배열의 연속성이 깨지기 때문에, **빈 공간을 없애기 위해 원소를 이동시키는 비용** 역시 생기게 된다. 이 경우 시간 복잡도는 O(n)이기 때문에, Array에서 삭제 시 최악의 시간 복잡도는 O(n)이 된다. 삽입 역시 마찬가지다.

## Linked List
1. 위와 같은 문제를 해결하기 위한 자료구조가 Linked List이다. 
2. 각각의 원소는 자기 자신 다음에 어떤 원소인지만 기억한다. 따라서 다음 원소 값을 다른 값으로 변경시키면 삭제와 삽입의 시간 복잡도는 O(1)이 된다. 
3. 하지만 원하는 위치에 삽입을 하고자 한다면, 원하는 위치를 검색하는 과정에서 비용이 발생한다 -> 첫번째 원소부터 다 확인을 해야한다. 
    - Linked List는 논리적 저장 순서와 물리적 저장 순서가 일치하지 않는다. 
    - 이 과정에서 O(n)의 시간이 추가로 발생할 수 있다.
4. 따라서 Linked List는 검색, 삽입, 삭제에서 모두 O(n)의 시간 복잡도를 가진다.

# Stack & Queue 

## Stack
스택은 한 쪽 끝에서만 원소를 넣거나 뺄 수 있는 선형 자료구조이다. 

1. `FILO(First In Last Out)`
    - 먼저 들어간 원소가 가장 나중에 나오고, 나중에 들어간 원소가 먼저 나오는 형식이다. 차곡차곡 쌓이는 구조이다. 
2. 원소의 추가와 제거, 최상단의 원소 확인 : O(1)
    - 최상단이 아닌 나머지 원소의 확인/변경이 원칙적으로 불가능

### Stack Class 예제 - Java

``` java
// 선언 방법 
Stack<Integer> integerStack = new Stack<>();
Stack<String> stringStack = new Stack<>();

// 원소 삽입
integerStack.push(1);
integerStack.push(2);

stringStack.push("hello");
stringStack.push("world")

// stack 크기
integerStack.size();

// 촤상단 값 출력 
integerStack.peek();
stringStack.peek();

// 가장 위에 있는 원소 삭제
integerStack.pop();
stringStack.pop();

// 스택 원소 전체 삭제
integerStack.empty();

// 원소 포함 여부
stringStack.contains("hello");

```

## Queue
먼저 집어넣은 데이터가 먼저 나오는 선형 자료구조이다.
1. `FIFO (First In First Out) `
    - 먼저 삽입된 원소가 먼저 나온다. Stack과 반대.
2. 원소 추가, 제거, 제일 앞, 뒤 원소 확인 : O(1)

### Queue Class 예제 - Java 

``` java
Queue<Integer> queue = new LinkedList<>();

// 값 추가 
queue.add(1); 

// 최상단의 값 반환 후 제거 , 비어있을 시 null 반환
queue.poll();

// 최상단 값 제거 
queue.remove();

// queue 원소 전체삭제 

```