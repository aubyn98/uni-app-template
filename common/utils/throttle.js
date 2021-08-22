export function throttle(func, wait = 500, immediate = true) {
	let timer, flag;
	return immediate ? function(...argvs) {
		if (flag) return
		flag = true;
		// 如果是立即执行，则在wait毫秒内开始时执行
		typeof func === 'function' && func(...argvs);
		timer = setTimeout(() => {
			flag = false;
		}, wait);

	} : function(...argvs) {
		if (flag) return
		flag = true
		// 如果是非立即执行，则在wait毫秒内的结束处执行
		timer = setTimeout(() => {
			flag = false
			typeof func === 'function' && func(...argvs);
		}, wait);
	}
}
export default throttle
