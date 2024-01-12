import {
	request
} from '@/common/utils'



export function get_member_balance_detail(params, opts) {
	return request.get('/fronted/member/balance/detail', params, {}, opts)
}



// 处方用药人
export function get_memberHealthy_list(params, opts) {
	return request.get('/fronted/memberHealthy/list', params, {}, opts)
}

export function delete_memberHealthy(params, opts) {
	return request.post('/fronted/memberHealthy/delete', params, {}, opts)
}

export function save_memberHealthy(params, opts) {
	return request.post('/fronted/memberHealthy/save', params, {}, opts)
}

export function update_memberHealthy(params, opts) {
	return request.post('/fronted/memberHealthy/update', params, {}, opts)
}

export function create_memberRecipel(params, opts) {
	return request.post('/fronted/memberRecipel/create', params, {}, {
		qs: false,
		...opts
	})
}

export function get_memberRecipel_detail(params, opts) {
	return request.get('/fronted/memberRecipel/detail', params, {}, opts)
}

export function get_memberRecipel_list(params, opts) {
	return request.get('/fronted/memberRecipel/list', params, {}, opts)
}

export function get_memberRecipel_query(params, opts) {
	return request.get('/fronted/memberRecipel/query', params, {}, opts)
}