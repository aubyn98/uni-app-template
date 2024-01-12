import {
	request
} from '@/common/utils'

export function get_cart(params, opts) {
	return request.get('/fronted/cart/get', params, {}, loading)
}

export function get_cart_info(params, opts) {
	return request.get('/fronted/cart/info', params, {}, opts)
}

export function update_cart(params, opts) {
	return request.post('/fronted/cart/update', params, {}, opts)
}

export function clean_cart(params, opts) {
	return request.post('/fronted/cart/clean', params, {}, opts)
}