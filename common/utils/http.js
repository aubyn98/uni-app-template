import config, {
	STORAGE_KEY_ENUMS
} from '../config'
import store from '@/store'
import {
	hasOwnProperty
} from './object'


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
export function downloadFile(url, params) {
	const hasParams = typeof params === 'object' && params !== null
	if (hasParams) {
		params = Object.keys(params).reduce((prev, k) => {
			const val = params[k]
			val && prev.push(encodeURIComponent(k) + '=' + encodeURIComponent(val))
			return prev
		}, []).join('&')
	}
	uni.showLoading({
		mask: true,
		title: '下载中...'
	})
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync(STORAGE_KEY_ENUMS.token)
		uni.downloadFile({
			url: default_baseURL + url + (hasParams ? '?' + params : ''),
			header: {
				...(token && {
					[STORAGE_KEY_ENUMS.token]: token
				})
			},
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}

export function uploadFile(url, filePath, formData) {
	const token = uni.getStorageSync(STORAGE_KEY_ENUMS.token)
	uni.showLoading({
		mask: true,
		title: '上传中...'
	})
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: default_baseURL + url, //仅为示例，非真实的接口地址
			filePath,
			name: 'file',
			formData,
			header: {
				...(token && {
					[STORAGE_KEY_ENUMS.token]: token
				})
			},
			success(res) {
				try {
					const data = JSON.parse(res.data)
					if (hasOwnProperty(data, 'status') && !data.status) {
						if (hasOwnProperty(data, 'message')) uni.showToast({
							title: data.message,
							icon: 'none',
							duration: 1500
						})
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
				uni.hideLoading()
			}
		})
	})

}

export function request(url, method, params, config = {}, opts = {
	loading: true,
	qs: true
}) {
	return http({
		url,
		method,
		data: params,
		...config
	}, opts.loading, opts.qs)
}

function simplify(type) {
	return function(url, params, config, options) {
		return request(url, type, params, config, options)
	}
}
request.get = simplify('get')
request.post = simplify('post')

export default function http(opt, loading = true, qs = true) {
	loading && startLoading()
	const {
		header,
		...res
	} = opt
	opt = res
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync(STORAGE_KEY_ENUMS.token)
		uni.request({
			header: {
				'Content-Type': opt.method.toUpperCase() === 'GET' ? 'application/json' : qs ?
					'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json',
				...(token && {
					[STORAGE_KEY_ENUMS.token]: token
				}),
				...header
			},
			success(res) {
				const data = res.data
				if (hasOwnProperty(data, 'status') && !data.status) {
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
				loading && endLoading()
			},
			...opt,
			url: default_baseURL + opt.url,
		})
	})
}