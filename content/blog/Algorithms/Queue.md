---
title: 'Queue'
date: 2021-01-01 00:00:00
description: ""
tags: [Algorithms]
thumbnail: 
---  

# 큐

먼저 집어넣은 데이터가 먼저 나오는 자료구조

![https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/1920px-Data_Queue.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/1920px-Data_Queue.svg.png)

## 구현

**by 배열**

- FIFO(First In First Out)
- 원소 추가, 제거 : O(1)
- 제일 앞, 뒤 원소 확인 : O(1)
- 맨 앞뒤 원소 제외 나머지 원소 확인, 변경 원칙적으로 불가능

```cpp
const int MX = 1000005;
int dat[MX];
int head = 0, tail = 0;
```

제일 앞의 원소를 없앤다고  가정할 때, 원소를 다른 값으로 덮는 것이 아닌 head를 증가시킨다.

**큐의 원소가 들어있는 자리** 

- dat[head] ~ dat[tail - 1]

**큐의 크기**

- tail - head

배열로 구현했을 때 문제 : 삭제할 때 마다 **쓸모없는 공간**이 생김

**→ 해결 : 원형 큐 (Circular Queue)**

## 원형 큐(Circular Queue)

![https://cdn.programiz.com/sites/tutorial2program/files/circular-increment.png](https://cdn.programiz.com/sites/tutorial2program/files/circular-increment.png)

## 구현

head나 tail이 7인 상태에서 1이 더해질 때 0번지로 다시 오도록 만든다

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MX = 1000005;
int dat[MX];
int head = 0, tail = 0;

void push(int x) {
	dat[tail++] = x;
}
void pop() {
	head++;
}
int front() {
	return dat[head];
}
int back() {
	return dat[tail-1];
}
```

## STL Queue

```cpp
#include <bits/stdc++.h>
using namespace std;

int main(void) {
	queue<int> q;
	q.push(10);
	cout << q.size();
	q.pop();
	cout << q.front() << " " << q.back();
 }
```