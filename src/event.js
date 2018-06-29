/**
 * 微型事件Pub/Sub模块
 * - 支持订阅事件，可单个，多个或者监听器（都会执行）
 * - 支持多个相同事件同时绑定，当某个事件返回`return false`; 不会继续执行
 */

class Event {
	constructor(target = {}) {
		// 不可以存在关键值
		if (typeof target !== 'object' 
			|| target instanceof Event 
			|| target.__events__  
			|| target.__listeners__  
			|| target.subscribe 
			|| target.unsubscribe 
			|| target.publish
		) {
			throw new TypeError(`不符合观察条件，请删除以下对象.
				\n__events__\n__listeners__\nsubscribe\nunsubscribe\npublish
			`);
			return false;
		}
		/**
		 * 不想暴露到最外层
		 * this.__proto__.__events__
		 */
		Event.prototype.__events__ = {};
		Event.prototype.__listeners__ = [];
		
		for (let key in target) {
			this[key] = target[key];
		}
		// 通常我们会使用 on/off/trigger
		// this.on = this.subscribe;
		// this.off = this.unsubscribe;
		// this.trigger = this.publish;
	}
	/**
	 * subscribe/on
	 * 用来订阅事件，可单个或者多个
	 * @param  {string | object | function} action 事件名
	 * - 订阅单个事件时为一个字符串，订阅多个事件则需要传入一个包含事件名/函数的键值对；订阅单个事件为函数时，增加一个监听器
	 * @param  {function} callback 事件回调，仅订阅单个事件时才需要
	 * @return {object} 返回自身以便于链式调用
	 */
	subscribe(action, callback) {
		if (typeof action === "object") {
			for (key in action) {
				if (action.hasOwnProperty(key) 
					&& (typeof action[key] === "function")
				) {
					this.subscribe(key, action[key]);
				}
			}

		} else if (typeof action === "string" && typeof callback === "function") {

			this.__events__[action] || (this.__events__[action] = []);
			this.__events__[action].push(callback);

		} else if (typeof action === 'function') {
			this.__listeners__.push(action);
		}

		return this;
	}
	/**
	 * unsubscribe/off
	 * 删除一个指定的事件队列
	 * @param  {string} event 需要删除的事件名
	 * @return {object} 返回自身以便于链式调用
	 * 注：没有添加第二个参数（对应的函数方法）
	 */
	unsubscribe(event) {
		if (typeof event === 'string') {
			this.__events__[event] = [];
		} else if (typeof event === undefined){
			this.__listeners__ = [];
		}

		return this;
	}
	/**
	 * 一次订阅
	 */
	once(event, callback) {
		if (typeof event === 'string' && ( !this.__events__[event] || this.__events__[event].length === 0)) {
			let fired = false;

			const _callback = (opts) => {
				this.unsubscribe(event);
				if (!fired) {
					fired = true;
					callback.call(this, opts);
				}
			};
			this.subscribe(event, _callback);
		}
		return this;
	}
	/**
	 * publish/trigger
	 * 用于发布'一个'指定的事件
	 * @param {string} event 需要发布的事件
	 * @param {object} opts 发布的事件的参数会传递给事件队列中的每个函数回调，包括监听器
	 * @return {object} 返回自身以便于链式调用
	 */
	publish(event, opts = {}) {
		if (opts instanceof Array || typeof opts !== 'object' || opts.event) {
			throw new TypeError('参数必须是对象, 且别带event关键字');
			return this;
		}
		if (typeof event === 'string' 
				&& this.__events__.hasOwnProperty(event) 
				&& (this.__events__[event] instanceof Array)
		) {
			// 每个订阅器都会触发，直到某个返回false
			for (let i = 0; i < this.__events__[event].length; i++) {
				if (this.__events__[event][i].call(this, opts) === false) break;
			}
		}
		// 每个监听器都会触发，直到某个返回false
		for (let i = 0; i < this.__listeners__.length; i++) {
			if (this.__listeners__[i].call(this, { ...opts, event }) === false) break;
		}
		return this;
	}
}

export default Event;