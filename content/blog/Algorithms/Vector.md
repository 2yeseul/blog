---
title: 'Vector'
date: 2021-01-01 00:00:00
description: ""
tags: [Algorithms]
thumbnail: 
--- 

## 성질 및 기능

- 배열과 달리 크기를 자유자재로 늘이거나 줄일 수 있는 장점이 있다!
- insert나 erase가 이미 구현되어있음 ( 시간 복잡도 : O(N) )
- 제일 끝에 원소 추가 or 제거 → push_back , pop_back ( 시간 복잡도 : O(1) )
    - 제일 앞에 원소 추가 or 제거 → push_front, pop_front ( 시간 복잡도 : O(N) )

🤔STL을 함수 인자로 넘길 때 ?

```cpp
void func1(vector<int> v) {
	v[10] = 7;
}
int main(void) {
	vector<int> v(100);
	func1(v);
	cout << v[10];
}
```

💡선언방법

```cpp
vector<int> v(10);
```

***The answer is ... 0***

→ STL도 구조체와 비슷하게 함수 인자로 실어 보내면 복사본을 만들어 보내기 때문에, func1 함수에서 바꾼 것은 원본에 영향을 주지 않는다.

## 메소드

v.begin( ) : 벡터의 첫 번째 원소를 가리킴

v.end( ) : 벡터의 '마지막 원소 **다음**' 을 가리킴

v.assign(10) : 원소 10개 0으로 초기화

v.assing(10, 1) : 원소 10개를 1로 초기화

v. front( ) : 첫 번째 원소

v.back( ) : 마지막 원소

v.at(i) : i번째 원소

v.push_back(10) : 마지막 원소 뒤에 10 추가

v.pop_back( ) : 가장 마지막 원소 삭제

v.insert(위치, 10) : 위치에 10 추가

v.size( ) : 벡터 사이즈

v.clear( ) : 전체 원소 삭제

v.erase(위치) : 해당 위치 원소 삭제