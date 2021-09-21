---
title: 'Github action 정리'
date: 2021-05-21 14:53:00
description: ""
tags: [DevOps, Git]
thumbnail: 
---  

# Github action을 통한 Spring boot 자동 deploy

```yml
# This workflow will build a package using Gradle and then publish it to GitHub packages when a release is created
# For more information see: https://github.com/actions/setup-java/blob/main/docs/advanced-usage.md#Publishing-using-gradle

name: Gradle Package

# 1)
on:
  release:
    types: [created]

# 2)
jobs:
  build:

    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
    # 3)
    - uses: actions/checkout@v2
    - name: Set up JDK 11
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
        server-id: github # Value of the distributionManagement/repository/id field of the pom.xml
        settings-path: ${{ github.workspace }} # location for the settings.xml file

    - name: Build with Gradle
      run: gradle build

    # The USERNAME and TOKEN need to correspond to the credentials environment variables used in
    # the publishing section of your build.gradle
    - name: Publish to GitHub Packages
      run: gradle publish
      env:
        USERNAME: ${{ github.actor }}
        TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 1) on
### 1-1) 특정 브랜치에 push가 진행되면 실행

``` yml
on:
  push:
    branches:
    - main
    - release/*
```

### 1-2) PR이 실행되면 실행

``` yml
on:
    pull_request:
     branches:
     - main
```

### 1-3) 특정 시점에 cron으로 실행
``` yml
on:
  schedule:
    branches:
    - cron: "0 0 * * * *"
```

### 1-4) 수동으로 실행
``` yml
on:
  workflow_dispatch:
```

## 2) jobs
job은 같은 runner(workflow)위에서 실행되는 일련의 과정들이다. 기본적으로 여러 job들이 있는 workflow는 병렬로 job을 실행한다. 하지만 필요하다면 job을 순차적으로 실행하도록 설정할 수 있는데, `빌드`와 `테스트`, 순차적인 job 두개로 구성된 workflow가 있다고 가정했을 때, 테스트 job은 빌드 job 상태에 의존한다. 만약에 빌드에 실패하면 테스트 역시 run 되지 않는 것이다. 


## 3) uses: actions/checkout@v2
git checkout 실행



출처
- https://velog.io/@eomttt/Github-Actions%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-CICD-%EA%B5%AC%EC%B6%95-Github-Actions-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0

- https://blog.naver.com/jcyber/222357094864

- https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions