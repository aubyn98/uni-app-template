export function debounce(fn, delay) {
	// last为上一次触发回调的时间, timer是定时器
	let last = 0,
		timer = null
	// 将throttle处理结果当作函数返回
	return function(...argvs) {
		// 记录本次触发回调的时间
		const now = Date.now()
		// 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
		if (now - last < delay) {
			// 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
			clearTimeout(timer)
			timer = setTimeout(() => {
				last = now
				fn.apply(this, argvs)
			}, delay)
		} else {
			// 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
			last = now
			fn.apply(this, argvs)
		}
	}
}
export default debounce
