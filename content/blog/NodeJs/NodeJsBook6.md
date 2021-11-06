---
title: '[Node.js 교과서] - 6장 express '
date: 2021-11-06 00:05:00
description: "Node.js 교과서 3장을 정리합니다."
tags: [Node.js, Javascript]
thumbnail: 
---   


# 미들웨어란 
미들웨어는 익스프레스의 핵심이다. `요청`과 `응답`의 중간에 위치하여 미들웨어라 부른다. 라우터와 에러 핸들러 역시 미들웨어의 일종이므로, 미들웨어가 익스프레스의 전부라고 해도 과언이 아니다.

미들웨어는 요청과 응답을 조작하여 기능을 추가하고, 나쁜 요청을 걸러내기도 한다.

미들웨어는 `app.use` 와 함께 사용되는데, `app.use(미들웨어)` 꼴이다. 

# 미들웨어의 특성 
미들웨어는 `req`, `res`, `next` 를 매개변수로 가지는 함수(에러 처리 미들웨어만 예외적으로 `err`, `req`, `res`, `next`를 가진다.)로서, `app.use`, `app,get`, `app.post`로 장착한다. 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.

여러 개의 미들웨어를 장착할 수도 있고, 다음 미들웨어로 넘어가려면 `next`함수를 호출해야 한다. 

``` javascript
app.use(
    morgan('dev),
    express.static('/', path.join(__dirname, 'public')),
    express.join(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.COOKIE_SECRET);,
);
```
위의 미들웨어는 내부적으로 `next`를 호출하므로, 미들웨어를 연달아서 사용할 수 있다. 

next를 호출하지 않는 미들웨어는 `res.send`나 `res.sendFile` 등의 메서드로 응답을 보내야 한다. 

`express.static`과 같은 미들웨어는 정적파일을 제공할 때 `next` 대신 `res.sendFile` 메서드로 응답을 보낸다. 따라서 정적파일을 제공하는 경우, express.json, express.urlencoded, cookieParser 미들웨어는 실행되지 않는다. 

next 함수에 인수를 넣을 수도 있는데, 그 경우엔 특수한 동작을 한다. `route`라는 문자열을 넣으면 다음 **라우터의 미들웨어**로 바로 이동하고, **그 외의 인수를 넣는다면 바로 에러 처리 미들웨어**로 이동한다.

라우터에서 에러가 발생할 때 에러를 `next(err)`를 통해 에러처리 미들웨어로 넘긴다. 

미들웨어 간 데이터를 전달하는 방법도 있는데, 세션을 사용한다면 `res.session`에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지가 된다는 단점이 있다. 

요청이 끝날 때 까지만 데이터를 유지하고 싶다면 `req` 객체에 데이터를 넣어두면 된다.

``` javascript
app.use((req, res, next) => {
    req.data = 'input data';
    next();
}, (req, res, next) => {
    console.next(req.data); // 데이터 받기
    next();
});
```

- `app.set`은 익스프레스에서 전역적으로 사용되므로 사용자 개개인의 값을 넣기는 부적절하고, 앱 전체의 설정을 공유할 때만 사용하는 것이 좋다. 

## 미들웨어 사용 시 유용한 패턴 - 미들웨어 안에 미들웨어를  넣는 방식

``` javascript
// 1) 
app.use(morgan('dev'));

// 2) 
app.use((req, res, next) => {
    morgan('dev')(req, res, next);
});

``` 
- 이 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 때문이다. 

다음과 같은 분기처리 역시 가능하다. 

``` javascript
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next);
    } else {
        morgan('dev')(req, res, next);
    
    }
});
```

# req, res
익스프레스의 `req`, `res` 는 http 모듈의 req, res를 확장한 것이다. 

## res

### `req.app`
req 객체를 통해 app 객체에 접근할 수 있다. req.app.get('port')와 같은 식으로 사용할 수 있다.

### `req.body` 
body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체이다. 

### `req.cookies` 
cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다. 

### `req.ip`
요청의 ip 주소가 담겨있다. 

### `req.params`
라우트 매개변수에 대한 정보가 담긴 객체이다. 

### `req.query`
쿼리 스트링에 대한 정보가 담긴 객체이다.

### `req.signedCookies`
서명된 쿠키들은 `req.cookies` 대신 이 객체에 담겨져 있다.

### `req.get(헤더 이름)`
헤더의 값을 가져오고 싶을 때 사용하는 메서드이다. 

## res 
### `res.app`
res 객체를 통해 app 객체에 접근 
### `res.cookie(키, 값, 옵션)`
쿠키를 설정하는 메서드 
### `res.clearCookie(키, 값, 옵션)`
쿠키를 제거하는 메서드 
### `res.end()`
데이터 없이 응답을 보낸다 
### `res.json(JSON)`
JSON 형식의 응답을 보낸다
### `res.redirect(주소)`
리다이렉트할 주소와 함께 응답을 보낸다. 
### `res.render(뷰, 데이터)`
템플릿 엔진을 렌더링하여 응답할 때 사용 
### `res.send(data)`
데이터와 함께 응답을 보낸다. 
### `res.sendFile(경로)`
경로에 위치한 파일을 응답한다. 
### `res.set(헤더, 값)`
응답의 헤더를 설정한다. 
### `res.status(코드)`
응답 시의 HTTP 상태 코드를 지정한다. 

 