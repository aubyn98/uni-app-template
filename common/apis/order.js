import {
	request
} from '@/common/utils'

export function get_order_list(params) {
	return request.get('/fronted/order/list', params)
}

export function get_order_detail(params) {
	return request.get('/fronted/order/detail', params)
}

export function confirm_order(params) {
	return request.post('/fronted/order/confirm', params)
}

export function repurchase_order(params) {
	return request.post('/fronted/order/repurchase', params)
}

export function pretreatment_order(params) {
	return request.post('/fronted/order/pretreatment', params, {}, {
		mobile: true
	})
}

export function submit_order(params) {
	return request.post('/fronted/order/submit', params, {}, {
		mobile: true
	})
}

export function cancel_order(params) {
	return request.post('/fronted/order/cancel', params)
}

export function refund_order(params) {
	return request.get('/fronted/order/refund', params)
}

export function get_order_statistics(params) {
	return request.get('/fronted/order/statistics', params)
}