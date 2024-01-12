import {
	request
} from '@/common/utils'

export function save_history(params, opts) {
	return request.post('/fronted/history/save', params, {}, opts)
}

export function get_goods_keyword(params, opts) {
	return request.get('/fronted/goods/suggestion', params, {}, {
		mobile: true,
		loading: false,
		...opts
	})
}