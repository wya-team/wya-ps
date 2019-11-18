# \@wya/ps
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

- [Demo](https://wya-team.github.io/wya-ps/demo/index.html)

- [Documents](https://wya-team.github.io/wya-ps/docs/#/)

## 安装

```vim
npm install @wya/ps --save
```

## 使用方法

- `on` 订阅
- `once` 一次订阅
- `off` 取消订阅
- `emit` 发布事件

```js
import { Event } from 'wya-ps';
let source = new Event({ a: 2 });

// 订阅事件 ，不使用`() => {}`, 使用`function() {}`可以拿到当前对象，进行链式操作
source.on('[event-name]', ({ name }) => {
	console.log(name, this);
});

// 订阅listener
source.on(({ name }) => {
	console.log(name, this);
});

// 发布事件，第一个值事件，第二个值参数
source.emit('[event-name]', { name: 'wya-ps' }); 

// 取消事件订阅
source.off('[event-name]');

// 取消订阅listener
source.off();
```

## 待开发
。。。

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/@wya/ps.svg
[npm-url]: https://www.npmjs.com/package/@wya/ps
