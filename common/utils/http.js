import {
	BASE_URL,
	TOKEN_KEY
} from '../config'
import store from '@/store'
import {
	showToast
} from './project'
import {
	hasOwnProperty,
	getCurrentPage,
	createRequest,
	createUploadFile,
	createDownloadFile
} from 'utils-uniapp'

function errInterceptor({
	err
}) {
	const page = getCurrentPage()
	if ((err.type == 'fail' || err.res.statusCode == 502) && page.navUrl != '/pages/errorPage/errorPage') {
		uni.$u.route({
			url: '/packageOther/pages/errorPage/errorPage',
			type: 'redirectTo',
			params: {
				type: err.res.statusCode == 502 ? '502' : 'fail',
				redirectUrl: encodeURIComponent(page.navUrl)
			}
		})
	}
}

function resInterceptor({
	res,
	options,
	reload
}) {
	let data = res.data
	if (res.header['x-encrypt-response']) {
		const aseData = decryptAesCbc(data.encrypted, AesKey)
		data = JSON.parse(aseData)
	}
	if (hasOwnProperty(data, 'status') && data.status !== 200) {
		if (['TokenInvalidException'].includes(data.data)) {
			return store.dispatch('user/login').then(() => reload())
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



function uploadResInterceptor({
	res
}, next) {
	try {
		res.data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
		return next()
	} catch (err) {
		return Promise.reject({
			type: 'code error',
			res: err
		})
	}
}

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
	resInterceptor: [resInterceptor, uploadResInterceptor],
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