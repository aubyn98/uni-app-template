import {
	request
} from '@/common/utils'

export function get_coupon_list(params) {
	return request.get('/fronted/mem/coupon/list', params)
}

export function get_coupon_center(params) {
	return request.get('/fronted/activity/coupon/center', params)
}
export function receive_coupon(params) {
	return request.post('/fronted/mem/coupon/receive', params)
}