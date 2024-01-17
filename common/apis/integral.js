import {
	request
} from '@/common/utils'

export function get_gift_center(params, opts) {
	return request.get('/fronted/gift/center', params, {}, opts)
}
export function get_gift_detail(params, opts) {
	return request.get('/fronted/gift/detail', params, {}, opts)
}
export function get_gift_exchange(params, opts) {
	return request.post('/fronted/gift/exchange', params, {}, opts)
}

