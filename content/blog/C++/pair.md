---
title: '[C++] pair'
date: 2021-01-05 02:09:00
description: ""
tags: [C++]
thumbnail: 
---  

```cpp
#include<bits/stdc++.h>
using namespace std;

// 선언
pair<int, int> p;
pair<int, int> p2 (1, 1);

// 생성
p = make_pair(1, 1);
p = {1, 1};

// 조회
int first = p.first;
int second = p.second;
```