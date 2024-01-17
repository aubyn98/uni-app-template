import {
	request
} from '@/common/utils'






export function get_fixture_current(params, opts) {
	return request.get('/fronted/fixture/current', params, {}, opts)
}
export function get_definePage_detail(params, opts) {
	return request.get('/fronted/definePage/detail', params, {}, opts)
}

export function get_store_nearby(params, opts) {
	return request.get('/fronted/store/nearby', params, {}, opts)
}

export function get_store_all(params, opts) {
	return request.get('/fronted/store/all', params, {}, opts)
}

export function get_store_address(params, opts) {
	return request.get('/fronted/store/address', params, {}, opts)
}

export function get_store_frequent(params, opts) {
	return request.get('/fronted/store/frequent', params, {}, opts)
}

export function get_store_detail(params, opts) {
	return request.get('/fronted/store/detail', params, {}, opts)
}

export function get_store_activity(params, opts) {
	return request.get('/fronted/store/activity', params, {}, opts)
}

export function activity_receive_coupon(params, opts) {
	return request.post('/fronted/activity/receive/coupon', params, {}, opts)
}

export function get_activity_category(params, opts) {
	return request.get('/fronted/activity/category', params, {}, opts)
}