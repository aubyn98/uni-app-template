export const COMTENT_TYPES = Object.freeze({
	/** json */
	JSON: 'application/json;charset=UTF-8',
	/** text/plain */
	TEXT: 'text/plain;charset=UTF-8',
	/** form-data 一般配合qs */
	FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
	/** form-data  上传 */
	FORM_DATA: 'multipart/form-data;charset=UTF-8'
})

export const CancelToken = {
	caches: {},
	add(token, Task) {
		this.caches[token] = Task
	},
	delete(token) {
		delete this.caches[token]
	},
	_cancel(token) {
		const Task = this.caches[token]
		if (Task) Task.abort()
	},
	cancelAll() {
		Object.values(this.caches).forEach(task => task.abort())
		this.caches = {}
	},
	source() {
		const token = uni.$u.guid()
		return {
			token,
			cancel: () => this._cancel(token)
		}
	}
}

export function promisifyRequest(type, {
	cancelToken,
	...opts
}) {
	return new Promise((resolve, reject) => {
		const Task = uni[type]({
			...opts,
			success(res) {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					return resolve(res)
				}
				reject({
					type: 'fail',
					res
				})
			},
			fail(res) {
				reject({
					type: 'fail',
					res
				})
			},
			complete() {
				if (cancelToken) CancelToken.delete(cancelToken)
			}
		})
		if (cancelToken) CancelToken.add(cancelToken, Task)
	})
}

let loadingCount = 0

export function startLoading(title = '加载中...') {
	loadingCount++
	uni.showLoading({
		mask: true,
		title
	})
}

export function endLoading() {
	if (loadingCount > 0) loadingCount--
	if (loadingCount === 0) {
		uni.hideLoading()
	}
}