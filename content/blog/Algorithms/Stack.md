---
title: 'Stack'
date: 2021-01-01 00:00:00
description: ""
tags: [Algorithms]
thumbnail: 
---  

# 스택

한 쪽 끝에서만 원소를 넣거나 뺄 수 있는 자료구조

![https://upload.wikimedia.org/wikipedia/commons/2/29/Data_stack.svg](https://upload.wikimedia.org/wikipedia/commons/2/29/Data_stack.svg)

- FILO (First In Last Out)
- Restricted Structure - 큐, 스택, 덱
    - 특정 위치에서만 원소를 넣거나 뺄 수 있음
- 원소의 추가와 제거, 최상단의 원소 확인 : O(1)
- 최상단이 아닌 나머지 원소의 확인/변경이 원칙적으로 불가능

## 구현

배열 or 연결리스트를 통해 구현 가능

**by 배열**

```cpp
const int MX = 1000005;
int dat[MX];
int pos = 0;

void push(int x) { 
	dat[pos++] = x;
}
void pop() { 
	// 나중에 push가 발생하면 어짜피 그 때 들어올 값으로 덮어져서 해당 pos값 자체는 변경하지 않아도 O
	pos--;
} 
int top() { 
	return dat[pos-1];
}
void test() { }
int main(void) {
	test();
}
```

## STL stack

```cpp
stack<int> s; // 선언
s.push(10); // item을 stack에 삽입, Vector의 addElement(item)과 동일
s.pop(); // Stack top에 있는 item 삭제
s.size(); // stack 사이즈 반환
s.top(); // top item 반환
```

# 수식의 괄호 쌍

## 문제 해결 방법

1. 여는 괄호가 나오면 스택에 추가
2. 닫는 괄호가 나왔을 경우,
    1. **스택이 비어있으면** 올바르지 않은 괄호쌍
    2. **스택의 top이 짝이 맞지 않는 괄호**일 경우 올바르지 않는 괄호 쌍
    3. **스택의 top이 짝이 맞는 괄호일 경우 pop**
3. 모든 과정을 끝낸 후 스택에 괄호가 남아있으면 올바르지 않은 괄호 쌍, 남아있지 않으면 올바른 괄호 쌍