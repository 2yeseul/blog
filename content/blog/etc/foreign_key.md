---
title: '[MySQL] 외래키 무시하고 삭제하기'
date: 2021-03-15 22:50:00
description: ""
tags: [ETC, MySQL]
thumbnail: 
---  
MySQL에서 외래키가 지정된 경우, db를 삭제하려고 할 때 

```
ERROR 1217 (23000): Cannot delete or update a parent row: a foreign key constraint fails
```

와 같은 에러가 발생한다.

이를 무시하고 삭제하고 싶은 경우,
`set foreign_key_checks = 0;` 를 실행시킨 뒤, 삭제 후 다시
`set foreign_key_checks = 1;` 을 실행한다.
