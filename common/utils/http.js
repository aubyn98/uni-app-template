import config, {
	ENUMS
} from '../config'
import store from '@/store'
import {
	hasOwnProperty,
	cloneDeepWithDescriptors,
} from './object'
import {
	showToast
} from './project'


const default_baseURL = config.baseURL

export const ContentTypeEnum = {
	// json
	JSON: 'application/json;charset=UTF-8',
	// json
	TEXT: 'text/plain;charset=UTF-8',
	// form-data 一般配合qs
	FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data  上传
	FORM_DATA: 'multipart/form-data;charset=UTF-8'
}


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
	return new Promise((resolve, reject) => {
		const token = store.state.user.token
		uni.downloadFile({
			url: default_baseURL + url + (hasParams ? '?' + params : ''),
			header: {
				...(token && {
					[ENUMS.TOKEN_KEY]: token
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
				options.loading && uni.hideLoading()
			},
			...configRes
		})
	})
}

export function uploadFile(url, params, config, options) {
	const cacheArguments = cloneDeepWithDescriptors(arguments)
	params = {
		fileName: 'file',
		filePath: '',
		...params
	}
	
	options = {
		loading: true,
		...options
	}
	
	const {
		headers,
		...configRes
	} = config

	const {
		fileName,
		filePath,
		...formData
	} = params

	const token = store.state.user.token
	if (!filePath.startsWith('http://tmp') && !filePath.startsWith('wxfile://tmp')) return Promise.resolve({
		data: filePath
	})


	options.loading && startLoading('上传中...')
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: default_baseURL + url, //仅为示例，非真实的接口地址
			filePath,
			name: fileName,
			formData,
			header: {
				...(token && {
					[ENUMS.TOKEN_KEY]: token
				}),
				...headers
			},
			success(res) {
				try {
					const data = JSON.parse(res.data)
					if (hasOwnProperty(data, 'status') && !data.status) {
						if (data.responseCode === 'invalidAuthorization') {
							return store.dispatch('user/login')
								.then(() => uploadFile(...cacheArguments))
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
				options.loading && uni.hideLoading()
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


export function request(url, method, params, config, options) {
	options = {
		loading: true,
		qs: true,
		...options
	}

	options.loading && startLoading()
	const cacheArguments = cloneDeepWithDescriptors(arguments)
	const {
		headers,
		...configRes
	} = config

	return new Promise((resolve, reject) => {
		const token = store.state.user.token
		uni.request({
			method,
			url: default_baseURL + url,
			data: params,
			header: {
				'Content-Type': method.toUpperCase() === 'GET' ? ContentTypeEnum.JSON : options.qs ?
					ContentTypeEnum.FORM_URLENCODED : ContentTypeEnum.JSON,
				'source': 'miniProgram',
				'deliveryType': store.state.deliveryType,
				...(token && {
					[ENUMS.TOKEN_KEY]: token
				}),
				...headers
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
			...configRes,
		})
	})
}
export default request