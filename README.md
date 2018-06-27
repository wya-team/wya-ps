# wya-ps
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

## [Demo](https://wya-team.github.io/wya-ps/demo/index.html)

## 安装

```vim
npm install wya-ps --save
```

## 使用方法

- `subscribe` 订阅
- `once` 一次订阅
- `unsubscribe` 取消订阅
- `publish` 发布事件

```js
import { Observer } from 'wya-ps';
let source = new Observer({ a: 2 });

// 订阅事件 ，不使用`() => {}`, 使用`function() {}`可以拿到当前对象，进行链式操作
source.subscribe('[event-name]', ({ name }) => {
	console.log(name, this);
});

// 订阅listener
source.subscribe(({ name }) => {
	console.log(name, this);
});

// 发布事件，第一个值事件，第二个值参数
source.publish('[event-name]', { name: 'wya-ps' }); 

// 取消事件订阅
source.publish('[event-name]');

// 取消订阅listener
source.publish();
```

## 待开发
。。。

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-ps.svg
[npm-url]: https://www.npmjs.com/package/wya-ps
