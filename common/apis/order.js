import {
	request
} from '@/common/utils'

export function get_order_list(params, opts) {
	return request.get('/fronted/order/list', params, {}, opts)
}

export function get_order_detail(params, opts) {
	return request.get('/fronted/order/detail', params, {}, opts)
}

export function confirm_order(params, opts) {
	return request.post('/fronted/order/confirm', params, {}, opts)
}

export function repurchase_order(params, opts) {
	return request.post('/fronted/order/repurchase', params, {}, opts)
}

export function pretreatment_order(params, opts) {
	return request.post('/fronted/order/pretreatment', params, {}, {
		mobile: true,
		...opts
	})
}

export function submit_order(params, opts) {
	return request.post('/fronted/order/submit', params, {}, {
		mobile: true,
		...opts
	})
}

export function cancel_order(params, opts) {
	return request.post('/fronted/order/cancel', params, {}, opts)
}

export function refund_order(params, opts) {
	return request.get('/fronted/order/refund', params, {}, opts)
}

export function get_order_statistics(params, opts) {
	return request.get('/fronted/order/statistics', params, {}, {
		loading: false,
		...opts
	})
}