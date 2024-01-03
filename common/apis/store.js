import {
	request
} from '@/common/utils'






export function get_store_nearby(params) {
	return request.get('/fronted/store/nearby', params)
}

export function get_store_all(params) {
	return request.get('/fronted/store/all', params)
}

export function get_store_address(params) {
	return request.get('/fronted/store/address', params)
}

export function get_store_frequent(params) {
	return request.get('/fronted/store/frequent', params)
}

export function get_store_detail(params) {
	return request.get('/fronted/store/detail', params)
}

export function get_store_activity(params) {
	return request.get('/fronted/store/activity', params)
}

export function activity_receive_coupon(params) {
	return request.post('/fronted/activity/receive/coupon', params)
}

export function get_activity_category(params) {
	return request.get('/fronted/activity/category', params)
}