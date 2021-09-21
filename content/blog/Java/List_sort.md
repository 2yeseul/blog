---
title: '객체의 특정 필드 기준으로 List 정렬하는 방법'
date: 2021-03-31 22:23:00
description: ""
tags: [Java]
thumbnail: 
---  

# 객체의 특정 필드 기준으로 List 정렬하는 방법

예를들어, `Chat` 리스트를 최근 메시지 순으로 정렬하는 경우를 생각해보자.

``` java
@Getter
public class ChatDto {
    private String lastMessage;
    private String lastMessageId;
    // ...
}
```

이 객체를 List로 만든다고 가정할 때, 최신순으로 정렬하기 위해선 마지막 메시지의 Id의 역순으로 정렬해야 할 것이다.

`List<ChatDto> chatList` 

이 경우, Java에서 제공하는 sort메소드를 활용하면 된다.

``` java
chatList.sort(Comparator.comparing(ChatDto::getLastMessageId).reversed());
```

역순으로 정렬할 때는 reversed()를 추가해주면 된다.

```
This implementation is a stable, adaptive, iterative mergesort that requires far fewer than n lg(n) comparisons when the input array is partially sorted, while offering the performance of a traditional mergesort when the input array is randomly ordered. If the input array is nearly sorted, the implementation requires approximately n comparisons. Temporary storage requirements vary from a small constant for nearly sorted input arrays to n/2 object references for randomly ordered input arrays.
The implementation takes equal advantage of ascending and descending order in its input array, and can take advantage of ascending and descending order in different parts of the same input array. It is well-suited to merging two or more sorted arrays: simply concatenate the arrays and sort the resulting array.
The implementation was adapted from Tim Peters's list sort for Python ( TimSort). It uses techniques from Peter McIlroy's "Optimistic Sorting and Information Theoretic Complexity", in Proceedings of the Fourth Annual ACM-SIAM Symposium on Discrete Algorithms, pp 467-474, January 1993.
```



공식 레퍼런스를 볼 때, 배열이 어느정도 정렬이 되어 있는 상태라면 시간 복잡도는 `nlog(n)` 이하로도 가능하다고 하고, 대략적으로는 `nlog(n)` 의 시간 복잡도를 가진다고 보면 될 것 같다.