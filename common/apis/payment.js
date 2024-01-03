import {
	request
} from '@/common/utils'

export function payment(params) {
	return request.get('/fronted/payment/miniapp_params', params, {}, {
		loading: false
	})
}

export function subscribe_result(params) {
	return request.post('/fronted/wechat/subscribe/result', params)
}