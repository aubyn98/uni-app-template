import {
	request
} from '@/common/utils'

export function get_address_list(params, opts) {
	return request.get('/fronted/member/address/list', params, {}, opts)
}

export function add_address(params, opts) {
	return request.post('/fronted/member/address/saveOrUpdate', params, {}, opts)
}

export function get_address_detail(params, opts) {
	return request.get('/fronted/member/address/detail' + '/' + params.id, {}, {}, opts)
}

export function remove_address(params, opts) {
	return request.post('/fronted/member/address/remove' + '/' + params.id, {}, {}, opts)
}