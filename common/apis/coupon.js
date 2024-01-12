import {
	request
} from '@/common/utils'

export function get_coupon_list(params, opts) {
	return request.get('/fronted/mem/coupon/list', params, {}, opts)
}

export function get_coupon_center(params, opts) {
	return request.get('/fronted/activity/coupon/center', params, {}, opts)
}
export function receive_coupon(params, opts) {
	return request.post('/fronted/mem/coupon/receive', params, {}, opts)
}