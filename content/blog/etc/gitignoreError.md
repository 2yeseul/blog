---
title: '.gitignore 작동하지 않을 때'
date: 2021-02-13 21:25:00
description: ""
tags: [ETC, Git]
thumbnail: 
---  

ignore를 설정했는데도 파일이 계속 보이는 경우가 있다. 이 경우 git의 캐시 문제이기 때문에, 캐시를 삭제한 뒤 다시 커밋하면 해결된다.

```
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

출처 - https://jojoldu.tistory.com/307