import config, {
	ENUMS
} from '../config'
import store from '@/store'
import {
	hasOwnProperty,
	cloneDeepWithDescriptors
} from './object'
import {
	showToast
} from './project'


const default_baseURL = config.baseURL


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
		setTimeout(() => {
			uni.hideLoading()
		}, 17)
	}
}

// 106
export function downloadFile(url, params, loading = true) {
	const hasParams = typeof params === 'object' && params !== null
	if (hasParams) {
		params = Object.keys(params).reduce((prev, k) => {
			const val = params[k]
			val && prev.push(encodeURIComponent(k) + '=' + encodeURIComponent(val))
			return prev
		}, []).join('&')
	}
	loading && startLoading('下载中...')
	return new Promise((resolve, reject) => {
		const token = store.state.user.token
		uni.downloadFile({
			url: default_baseURL + url + (hasParams ? '?' + params : ''),
			header: {
				...(token && {
					[ENUMS.TOKEN_KEY]: token
				})
			},
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			},
			complete() {
				loading && uni.hideLoading()
			}
		})
	})
}

export function uploadFile(url, filePath, formData, loading = true) {
	const token = store.state.user.token
	if (!filePath.startsWith('http://tmp') && !filePath.startsWith('wxfile://tmp')) return Promise.resolve({
		data: filePath
	})
	loading && startLoading('上传中...')
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: default_baseURL + url, //仅为示例，非真实的接口地址
			filePath,
			name: 'file',
			formData,
			header: {
				...(token && {
					[ENUMS.TOKEN_KEY]: token
				})
			},
			success(res) {
				try {
					const data = JSON.parse(res.data)
					if (hasOwnProperty(data, 'status') && !data.status) {
						if (data.responseCode === 'invalidAuthorization') {
							return store.dispatch('user/login')
								.then(() => uploadFile(...arguments))
								.then(resolve)
						}
						if (hasOwnProperty(data, 'message')) showToast(data.message)
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
				loading && uni.hideLoading()
			}
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

export function request(url, method, params, config, options) {
	options = {
		loading: true,
		qs: true,
		...options
	}

	options.loading && startLoading()
	const cacheArguments = cloneDeepWithDescriptors(arguments)
	const {
		header,
		...res
	} = config
	config = res
	return new Promise((resolve, reject) => {
		const token = store.state.user.token
		uni.request({
			method,
			url: default_baseURL + url,
			data: params,
			header: {
				'Content-Type': method.toUpperCase() === 'GET' ? 'application/json' : options
					.qs ?
					'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json',
				'source': 'miniProgram',
				'deliveryType': store.state.deliveryType,
				...(token && {
					[ENUMS.TOKEN_KEY]: token
				}),
				...header
			},
			success(res) {
				if (res.statusCode == 404) return reject(res)
				const data = res.data
				if (hasOwnProperty(data, 'status') && !data.status) {
					if (data.responseCode === 'invalidAuthorization') {
						return store.dispatch('user/login')
							.then(() => http(...cacheArguments))
							.then(resolve)
					}
					if (hasOwnProperty(data, 'message')) uni.showToast({
						title: data.message,
						icon: 'none',
						duration: 1500
					})
					return reject(data)
				}
				resolve(data)
			},
			fail(err) {
				console.log("http fail")
				uni.showToast({
					title: "请求失败",
					icon: 'none'
				})
				reject(err)
			},
			complete() {
				options.loading && endLoading()
			},
			...config,
		})
	})
}
export default request