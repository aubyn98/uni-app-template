// 组合函数
export function compose(...fns) {
	return fns.reduce(
		(l, r) =>
		function(...argv) {
			return r.call(this, () => l.apply(this, argv), ...argv)
		}
	)
}

// 防抖
export function debounce(fn, delay) {
	let last = 0,
		timer = null
	return function(...argvs) {
		const now = Date.now()
		if (now - last < delay) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				last = now
				fn.apply(this, argvs)
			}, delay)
		} else {
			last = now
			fn.apply(this, argvs)
		}
	}
}

// 节流
export function throttle(func, wait = 500, immediate = true) {
	let timer, flag;
	return immediate ? function(...argvs) {
		if (flag) return
		flag = true;
		typeof func === 'function' && func(...argvs);
		timer = setTimeout(() => {
			flag = false;
		}, wait);

	} : function(...argvs) {
		if (flag) return
		flag = true
		timer = setTimeout(() => {
			flag = false
			typeof func === 'function' && func(...argvs);
		}, wait);
	}
}

// 路径参数编解码
export function encodeURIParams(params) {
	return encodeURIComponent(JSON.stringify(params || {}))
}
export function decodeURIParams(params) {
	return JSON.parse(decodeURIComponent(params || '{}'))
}
// 获取路径参数
export function getSearchParams(str) {
	const collect = {}
	str.replace(/([^?^&]*?)=([^?^&]*)/g, (match, k, v) => {
		const temp = collect[k]
		if (!temp) return (collect[k] = v)
		if (temp && typeof temp === 'string') return (collect[k] = [temp, v])
		collect[k].push(v)
	})
	return collect
}

export default {
	compose,
	debounce,
	throttle,
	encodeURIParams,
	decodeURIParams,
	getSearchParams,
}
