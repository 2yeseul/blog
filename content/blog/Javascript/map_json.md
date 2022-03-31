---
title: '[Javascript] Map <-> JSON'
date: 2022-04-01 00:00:00
category: 'Javascript'
draft: false
---  
# Map to JSON / JSON to Map

## convert Map to JSON
``` javascript
const someMap = new Map();
someMap.set('key', 'value');

const jsonFromMap = Object.fromEntries(someMap);

// { "key": "value" }
```

## read JSON and convert to Map
``` javascript
const path = require('path')

const someMap = Object.entries(JSON.parse(await fs.promise.readFile(path.resolve(jsonPath)).toString()));
```