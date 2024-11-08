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
	let timer = null;
	_.stop = () => timer && clearTimeout(timer);

	function _(...argvs) {
		_.stop();
		timer = setTimeout(() => {
			fn.apply(this, argvs);
		}, delay);
	}
	return _;
}

export function debouncePromise(fn, delay) {
	let timer = null,
		arr = [];
	_.stop = () => {
		if (timer) {
			arr.shift()?.('cancel');
			clearTimeout(timer);
		}
	};

	function _(...argvs) {
		return new Promise((resolve, reject) => {
			_.stop();
			arr.push(reject);
			timer = setTimeout(() => {
				resolve(fn.apply(this, argvs));
			}, delay);
		});
	}
	return _;
}

// 节流
export function throttle(func, wait = 500, immediate = true) {
	let timer, flag;
	return immediate ? function(...argvs) {
		if (flag) return
		flag = true;
		typeof func === 'function' && func.apply(this, argvs);
		timer = setTimeout(() => {
			flag = false;
		}, wait);

	} : function(...argvs) {
		if (flag) return
		flag = true
		timer = setTimeout(() => {
			flag = false
			typeof func === 'function' && func.apply(this, argvs);
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
// 路径参数对象化
export function getSearchParams(str) {
	const collect = {}
	decodeURIComponent(str).replace(/([^?^&]*?)=([^?^&]*)/g, (match, k, v) => {
		const temp = collect[k]
		if (!temp) return (collect[k] = v)
		if (temp && typeof temp === 'string') return (collect[k] = [temp, v])
		collect[k].push(v)
	})
	return collect
}

export function getRandomStr(len = 8, $chars) {
  len = len || 32;
  $chars ||= 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// 获取路径参数
export function getSearchStr(params) {
	return Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')
}

// 获取页面参数
export function getOnLoadParams(e) {
	const scene = e.scene
	if (scene) {
		e = {
			...e,
			...getSearchParams(scene)
		}
	}
	return e
}