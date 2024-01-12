import {
	request
} from '@/common/utils'

export function payment(params, opts) {
	return request.get('/fronted/payment/miniapp_params', params, {}, {
		loading: false,
		...opts
	})
}

export function subscribe_result(params, opts) {
	return request.post('/fronted/wechat/subscribe/result', params, {}, opts)
}