import {
	BASE_URL,
	TOKEN_KEY
} from '../../config'
import store from '@/store'
import {
	hasOwnProperty,
	cloneDeepWithDescriptors,
} from '../object'
import {
	showToast
} from '../project'
import {
	CONTENT_TYPES,
	CancelToken,
	promisifyRequest,
	startLoading,
	endLoading
} from './helper'
import {
	getSearchParams
} from '../magic'

function checkStatus(res, options, reloadFn) {
	const data = res.data
	if (hasOwnProperty(data, 'status') && !data.status) {
		if (['invalidAuthorization'/* , 'parameterMustBeNotnull' */].includes(data.responseCode)) {
			return store.dispatch('user/login').then(reloadFn)
		}
		if (hasOwnProperty(data, 'message') && options.showError) showToast(data.message)
		return Promise.reject({
			type: 'status',
			res
		})
	}
	return data
}

// 106
export function downloadFile(url, params, config, options) {
	const source = CancelToken.source()

	options = {
		loading: true,
		...options
	}

	const {
		headers,
		...configRes
	} = config

	const token = store.state.user.token

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
	return promisifyRequest('downloadFile', {
		cancelToken: source.token,
		url: BASE_URL + url + (hasParams ? '?' + params : ''),
		header: {
			...(token && {
				[TOKEN_KEY]: token
			}),
			...headers
		},
		...configRes
	}).then((res) => {
		closeLoading()
		return res
	}).catch((e) => {
		closeLoading && closeLoading()
		return Promise.reject(e)
	})
}

export function uploadFile(url, params, config, options) {
	const source = CancelToken.source()

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

	const token = store.state.user.token

	const {
		keyName,
		filePath,
		...formData
	} = params

	if (!filePath.startsWith('http://tmp') && !filePath.startsWith('wxfile://tmp')) return Promise.resolve({
		data: filePath
	})

	options.loading && startLoading('上传中...')
	let closeLoading = () => {
		options.loading && endLoading()
		closeLoading = null
	}

	return promisifyRequest('uploadFile', {
			cancelToken: source.token,
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
			...configRes
		})
		.then(res => {
			closeLoading()
			try {
				res.data = JSON.parse(res.data)
				return checkStatus(res, options, () => uploadFile(...argumentsCache))
			} catch (e) {
				return Promise.reject({
					type: 'code error',
					res: e
				})
			}
		})
		.catch(e => {
			closeLoading && closeLoading()
			return Promise.reject(e)
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
	const source = CancelToken.source()

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

	return promisifyRequest('request', {
		cancelToken: source.token,
		method,
		url: BASE_URL + url,
		data: params,
		header: {
			'Content-Type': method.toUpperCase() === 'GET' ? CONTENT_TYPES.JSON : options.qs ?
				CONTENT_TYPES.FORM_URLENCODED : CONTENT_TYPES.JSON,
			'source': 'miniProgram',
			'deliveryType': store.state.deliveryType,
			...(token && {
				[TOKEN_KEY]: token
			}),
			...headers
		},
		...configRes
	}).then(res => {
		closeLoading()
		return checkStatus(res, options, () => request(...argumentsCache))
	}).catch(e => {
		closeLoading && closeLoading()
		return Promise.reject(e)
	})
}

export default request