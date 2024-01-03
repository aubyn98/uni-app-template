import {
	request
} from '@/common/utils'

export function save_history(params) {
	return request.post('/fronted/history/save', params)
}

export function get_goods_keyword(params) {
	return request.get('/fronted/goods/keyword', params, {}, {
		mobile: true
	})
}