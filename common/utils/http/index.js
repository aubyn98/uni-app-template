import {
	BASE_URL,
	TOKEN_KEY
} from '../../config'
import store from '@/store'
import {
	hasOwnProperty,
} from '../object'
import {
	showToast
} from '../project'
import {
	createRequest,
	createUploadFile,
	createDownloadFile
} from './helper'

function errInterceptor(e) {
	const pages = uni.$u.page()
	if ((e.type == 'fail' || e.res.statusCode == 502) && pages != '/pages/errorPage/errorPage') {
		uni.$u.route({
			url: '/pages/errorPage/errorPage',
			type: 'redirectTo',
			params: {
				type: e.res.statusCode == 502 ? '502' : 'fail'
			}
		})
	}
}

function resInterceptor(res, options, reloadFn) {
	const data = res.data
	if (hasOwnProperty(data, 'status') && !data.status) {
		if (['invalidAuthorization' /* , 'parameterMustBeNotnull' */ ].includes(data.responseCode)) {
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



export const downloadFile = createDownloadFile({
	baseURL: BASE_URL,
	headers() {
		const token = store.state.user.token
		return {
			...(token && {
				[TOKEN_KEY]: token
			}),
		}
	}
}, {
	errInterceptor
})



export const uploadFile = createUploadFile({
	baseURL: BASE_URL,
	headers() {
		const token = store.state.user.token
		return {
			...(token && {
				[TOKEN_KEY]: token
			}),
		}
	}
}, {
	resInterceptor,
	errInterceptor
})





export const request = createRequest({
	baseURL: BASE_URL,
	headers() {
		const token = store.state.user.token
		return {
			'source': 'miniProgram',
			'deliveryType': store.state.deliveryType,
			...(token && {
				[TOKEN_KEY]: token
			}),
		}
	}
}, {
	resInterceptor,
	errInterceptor
})

export default request