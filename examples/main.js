import { Observer } from '../src/main';
let count = 0;
let source = new Observer({ a: 2});

source.subscribe('[event-name]', ({ name }) => {
	count++;
	console.log(count, name, this);
});
source.subscribe('[event-name]', ({ name }) => {
	count++;
	console.log(count, name);
});


source.subscribe('[event-name]', ({ name }) => {
	count++;
	console.log(count, name);
});

source.subscribe('[event-name]', ({ name }) => {
	count++;
	console.log(count, name);
});

// 改变对象的值
source.subscribe('[event-name]', function({ name }) {
	count++;
	console.log(count, name, this, ++this.a);
});

// 测试作用域
let test = {
	a: 1,
	b() {
		source.subscribe(({ name }) => {
			console.log('有订阅就会执行我');
			console.log(this, name);
		})
	}
}
test.b();
setTimeout(() => {
	source.publish('[event-name]', { name: 'wya-ps' }).unsubscribe('[event-name]');
	source.publish();
}, 5000);
