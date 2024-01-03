import {
	request
} from '@/common/utils'

export function get_address_list(params) {
	return request.get('/fronted/member/address/list', params)
}

export function add_address(params) {
	return request.post('/fronted/member/address/saveOrUpdate', params)
}

export function get_address_detail(params) {
	return request.get('/fronted/member/address/detail' + '/' + params.id)
}

export function remove_address(params) {
	return request.get('/fronted/member/address/remove' + '/' + params.id)
}