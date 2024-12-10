import {
	cloneDeepWithDescriptors,
} from '../object'
export const CONTENT_TYPES = Object.freeze({
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

function simplify(_request, type) {
	return function(url, params, config, options) {
		return _request(url, type, params, config, options)
	}
}

export function createRequest(defaultConfig, defaultOpts) {

	function _request(url, method, params, config, options) {
		const source = CancelToken.source()

		const argumentsCache = cloneDeepWithDescriptors(arguments)
		options = {
			loading: true,
			loadingText: '加载中...',
			qs: true,
			showError: true,
			resInterceptor: (res) => res.data,
			errInterceptor: () => void 0,
			...defaultOpts,
			...options
		}

		config = {
			...defaultConfig,
			...config
		}

		let {
			headers,
			...configRes
		} = config

		if (typeof headers !== 'function') {
			const _temp = headers
			headers = () => _temp
		}

		options.loading && startLoading(options.loadingText)
		let closeLoading = () => {
			options.loading && endLoading()
			closeLoading = null
		}

		return promisifyRequest('request', {
			cancelToken: source.token,
			method,
			url: url.startsWith('http') ? url : config.baseURL ? config.baseURL + url : url,
			data: params,
			header: {
				'Content-Type': method.toUpperCase() === 'GET' ? CONTENT_TYPES.JSON : options.qs ?
					CONTENT_TYPES.FORM_URLENCODED : CONTENT_TYPES.JSON,
				...headers()
			},
			...configRes
		}).then(res => {
			closeLoading()
			return options.resInterceptor ? options.resInterceptor(res, options, () => _request(...
				argumentsCache)) : res
		}).catch(e => {
			options.errInterceptor && options.errInterceptor(e)
			closeLoading && closeLoading()
			return Promise.reject(e)
		})
	}
	_request.get = simplify(_request, 'get')
	_request.post = simplify(_request, 'post')
	return _request
}

export function createUploadFile(defaultConfig, defaultOpts) {
	return function _uploadFile(url, params, config, options) {
		const source = CancelToken.source()

		const argumentsCache = cloneDeepWithDescriptors(arguments)
		params = {
			keyName: 'file',
			filePath: '',
			...params
		}

		options = {
			loading: true,
			loadingText: '上传中...',
			showError: true,
			resInterceptor: (res) => res.data,
			errInterceptor: () => void 0,
			...defaultOpts,
			...options
		}

		config = {
			...defaultConfig,
			...config
		}

		let {
			headers,
			...configRes
		} = config

		if (typeof headers !== 'function') {
			const _temp = headers
			headers = () => _temp
		}

		const {
			keyName,
			filePath,
			...formData
		} = params

		if (!filePath.startsWith('http://tmp') && !filePath.startsWith('wxfile://tmp')) return Promise.resolve({
			data: filePath
		})

		options.loading && startLoading(options.loadingText)
		let closeLoading = () => {
			options.loading && endLoading()
			closeLoading = null
		}

		return promisifyRequest('uploadFile', {
				cancelToken: source.token,
				url: url.startsWith('http') ? url : config.baseURL ? config.baseURL + url : url,
				filePath,
				name: keyName,
				formData,
				header: {
					...headers()
				},
				...configRes
			})
			.then(res => {
				closeLoading()
				try {
					res.data = JSON.parse(res.data)
					return options.resInterceptor ? options.resInterceptor(res, options, () => _uploadFile(...
						argumentsCache)) : res
				} catch (e) {
					return Promise.reject({
						type: 'code error',
						res: e
					})
				}
			})
			.catch(e => {
				options.errInterceptor && options.errInterceptor(e)
				closeLoading && closeLoading()
				return Promise.reject(e)
			})

	}
}

export function createDownloadFile(defaultConfig, defaultOpts) {
	return function _downloadFile(url, params, config, options) {
		const source = CancelToken.source()

		options = {
			loading: true,
			loadingText: '下载中...',
			errInterceptor: () => void 0,
			...defaultOpts,
			...options
		}

		config = {
			...defaultConfig,
			...config
		}

		let {
			headers,
			...configRes
		} = config

		if (typeof headers !== 'function') {
			const _temp = headers
			headers = () => _temp
		}

		const hasParams = typeof params === 'object' && params !== null
		if (hasParams) {
			params = Object.keys(params).reduce((prev, k) => {
				const val = params[k]
				val && prev.push(encodeURIComponent(k) + '=' + encodeURIComponent(val))
				return prev
			}, []).join('&')
		}
		options.loading && startLoading(options.loadingText)
		let closeLoading = () => {
			options.loading && endLoading()
			closeLoading = null
		}
		return promisifyRequest('downloadFile', {
			cancelToken: source.token,
			url: (url.startsWith('http') ? url : config.baseURL ? config.baseURL + url : url) + (hasParams ?
				'?' + params : ''),
			header: {
				...headers()
			},
			...configRes
		}).then((res) => {
			closeLoading()
			return res
		}).catch((e) => {
			options.errInterceptor && options.errInterceptor(e)
			closeLoading && closeLoading()
			return Promise.reject(e)
		})
	}
}