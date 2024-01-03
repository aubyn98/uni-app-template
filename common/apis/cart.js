import {
	request
} from '@/common/utils'

export function get_cart(params) {
	return request.get('/fronted/cart/get', params)
}

export function get_cart_info(params) {
	return request.get('/fronted/cart/info', params)
}

export function delete_cart_item(params) {
	return request.post('/fronted/cart/delete', params)
}

export function add_cart(params) {
	return request.post('/fronted/cart/add', params)
}

export function update_cart(params) {
	return request.post('/fronted/cart/update', params)
}

export function clean_cart(params) {
	return request.post('/fronted/cart/clean', params)
}