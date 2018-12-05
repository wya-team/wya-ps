import { EventStore } from '../src/main';
let count = 0;
let source = new EventStore({ a: 2 });

source.on('[event-name]', ({ name }) => {
	count++;
	console.log(count, name, this);
});
source.on('[event-name]', ({ name }) => {
	count++;
	console.log(count, name);
});


source.on('[event-name]', ({ name }) => {
	count++;
	console.log(count, name);
});

source.on('[event-name]', ({ name }) => {
	count++;
	console.log(count, name);
});

// 改变对象的值
source.on('[event-name]', function({ name }) {
	count++;
	console.log(count, name, this, ++this.a);
});

// 一次订阅
source.once('once', function({ name }) {
	console.log('只能订阅一次');
});
source.emit('once');
source.emit('once');
source.emit('once');
source.emit('once');
source.emit('once');
source.emit('once');
// 测试作用域
let test = {
	a: 1,
	b() {
		source.on(({ name }) => {
			console.log('有订阅就会执行我');
			console.log(this, name);
		});
	}
};
test.b();
setTimeout(() => {
	console.log(222);
	source.emit('[event-name]', { name: 'wya-ps' }).off('[event-name]');
	source.emit();
}, 5000);
