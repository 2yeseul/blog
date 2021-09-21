---
title: 'BFS'
date: 2021-01-01 00:00:00
description: "BFS"
tags: [Algorithms]
thumbnail: 
---  

# BFS

다차원 배열에서 각 칸을 방문할 때 **너비를 우선으로 방문**하는 알고리즘

1. 시작하는 칸을 큐에 넣고 방문했다는 표시를 남김
2. 큐에서 원소를 꺼내고, 그 칸에서 상하좌우로 인접한 칸에 3번을 진행
3. 해당 칸을 이전에 방문했다면 아무 것도 하지 않고, 처음으로 방문했다면 방문했다는 표시를 남기고, 해당 칸을 큐에 삽입
4. 큐가 빌 때 까지 2번을 반복

**모든 칸이 큐에 1번씩 들어가므로 시간복잡도는 칸이 N개일 때, O(N)**

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fclyc4S%2FbtqyQ6MYwGu%2FDiWyF5a2fR7oAH62W553R0%2Fimg.gif](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fclyc4S%2FbtqyQ6MYwGu%2FDiWyF5a2fR7oAH62W553R0%2Fimg.gif)

## 유형

1. Flood Fill
2. 다차원 배열에서의 거리 측정(두 노드 사이의 최단경로 etc)

