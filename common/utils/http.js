import {
	BASE_URL,
	TOKEN_KEY
} from '../config'
import store from '@/store'
import {
	hasOwnProperty,
	cloneDeepWithDescriptors,
} from './object'
import {
	showToast
} from './project'

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


let loadingCount = 0

function startLoading(title = '加载中...') {
	loadingCount++
	uni.showLoading({
		mask: true,
		title
	})
}

function endLoading() {
	if (loadingCount > 0) loadingCount--
	if (loadingCount === 0) {
		uni.hideLoading()
	}
}

// 106
export function downloadFile(url, params, config, options) {
	options = {
		loading: true,
		...options
	}

	const {
		headers,
		...configRes
	} = config

	const hasParams = typeof params === 'object' && params !== null
	if (hasParams) {
		params = Object.keys(params).reduce((prev, k) => {
			const val = params[k]
			val && prev.push(encodeURIComponent(k) + '=' + encodeURIComponent(val))
			return prev
		}, []).join('&')
	}
	options.loading && startLoading('下载中...')
	let closeLoading = () => {
		options.loading && endLoading()
		closeLoading = null
	}
	return new Promise((resolve, reject) => {
		const token = store.state.user.token
		uni.downloadFile({
			url: BASE_URL + url + (hasParams ? '?' + params : ''),
			header: {
				...(token && {
					[TOKEN_KEY]: token
				}),
				...headers
			},
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			},
			complete() {
				closeLoading && closeLoading()
			},
			...configRes
		})
	})
}
const uploadFileCaches = []
export function uploadFile(url, params, config, options) {
	const argumentsCache = cloneDeepWithDescriptors(arguments)
	params = {
		keyName: 'file',
		filePath: '',
		...params
	}

	options = {
		loading: true,
		showError: true,
		...options
	}

	const {
		headers,
		...configRes
	} = config

	const {
		keyName,
		filePath,
		...formData
	} = params

	const token = store.state.user.token
	if (!filePath.startsWith('http://tmp') && !filePath.startsWith('wxfile://tmp')) return Promise.resolve({
		data: filePath
	})


	options.loading && startLoading('上传中...')
	let closeLoading = () => {
		options.loading && endLoading()
		closeLoading = null
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + url, //仅为示例，非真实的接口地址
			filePath,
			name: keyName,
			formData,
			header: {
				...(token && {
					[TOKEN_KEY]: token
				}),
				...headers
			},
			success(res) {
				try {
					const data = JSON.parse(res.data)
					if (hasOwnProperty(data, 'status') && !data.status) {
						if (data.responseCode === 'invalidAuthorization') {
							uploadFileCaches.push(() => uploadFile(...argumentsCache).then(resolve)
								.catch(reject))
							return store.dispatch('user/login')
								.then(() => {
									uploadFileCaches.forEach(fn => fn())
									uploadFileCaches.length = 0
								})
						}
						if (hasOwnProperty(data, 'message') && options.showError) {
							closeLoading()
							showToast(data.message)
						}
						return reject(data)
					}
					resolve(data)
				} catch (e) {
					reject(e)
				}
			},
			fail(e) {
				reject(e)
			},
			complete() {
				closeLoading && closeLoading()
			},
			...configRes
		})
	})

}

function simplify(type) {
	return function(url, params, config, options) {
		return request(url, type, params, config, options)
	}
}
request.get = simplify('get')
request.post = simplify('post')

const requestCaches = []
export function request(url, method, params, config, options) {
	const argumentsCache = cloneDeepWithDescriptors(arguments)
	options = {
		loading: true,
		qs: true,
		showError: true,
		...options
	}

	const {
		headers,
		...configRes
	} = config

	const token = store.state.user.token

	options.loading && startLoading()
	let closeLoading = () => {
		options.loading && endLoading()
		closeLoading = null
	}
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: BASE_URL + url,
			data: params,
			header: {
				'Content-Type': method.toUpperCase() === 'GET' ? COMTENT_TYPES.JSON : options.qs ?
					COMTENT_TYPES.FORM_URLENCODED : COMTENT_TYPES.JSON,
				'source': 'miniProgram',
				'deliveryType': store.state.deliveryType,
				...(token && {
					[TOKEN_KEY]: token
				}),
				...headers
			},
			success(res) {
				if (res.statusCode !== 200) return reject(res)
				const data = res.data
				if (hasOwnProperty(data, 'status') && !data.status) {
					if (data.responseCode === 'invalidAuthorization') {
						requestCaches.push(() => request(...argumentsCache).then(resolve).catch(reject))
						return store.dispatch('user/login')
							.then(() => {
								requestCaches.forEach(fn => fn())
								requestCaches.length = 0
							})
					}
					if (hasOwnProperty(data, 'message') && options.showError) {
						closeLoading()
						showToast(data.message)
					}
					return reject(data)
				}
				resolve(data)
			},
			fail(err) {
				console.log("http fail")
				showToast("请求失败")
				reject(err)
			},
			complete(res) {
				closeLoading && closeLoading()
			},
			...configRes,
		})
	})
}
export default request