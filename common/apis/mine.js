import {
	request
} from '@/common/utils'



export function get_member_balance_detail(params) {
	return request.get('/fronted/member/balance/detail', params)
}



// 处方用药人
export function get_memberHealthy_list(params) {
	return request.get('/fronted/memberHealthy/list', params)
}

export function delete_memberHealthy(params) {
	return request.post('/fronted/memberHealthy/delete', params)
}

export function save_memberHealthy(params) {
	return request.post('/fronted/memberHealthy/save', params)
}

export function update_memberHealthy(params) {
	return request.post('/fronted/memberHealthy/update', params)
}

export function create_memberRecipel(params) {
	return request.post('/fronted/memberRecipel/create', params, {}, {
		qs: false
	})
}

export function get_memberRecipel_detail(params) {
	return request.get('/fronted/memberRecipel/detail', params)
}

export function get_memberRecipel_list(params) {
	return request.get('/fronted/memberRecipel/list', params)
}

export function get_memberRecipel_query(params) {
	return request.get('/fronted/memberRecipel/query', params)
}