import {
	request
} from '@/common/utils'



export function scanGoodsCode(params, opts) {
	return request.get('/fronted/goods/detail/barcode', params, {}, opts)
}
export function get_goods_list(params, opts) {
	return request.get('/fronted/goods/list', params, {}, opts)
}
export function get_goods_multi(params, opts) {
	return request.get('/fronted/goods/multi', params, {}, opts)
}

export function get_goods_recommend(params, opts) {
	return request.get('/fronted/goods/recommend', params, {}, opts)
}


export function get_goods_detail(params, opts) {
	return request.get('/fronted/goods/detail', params, {}, opts)

}
export function get_goodsCategory_all(params, opts) {
	return request.get('/fronted/goodsCategory/all', params, {}, opts)

}
export function get_goodsCategory_lower(params, opts) {
	return request.get('/fronted/goodsCategory/lower', params, {}, opts)

}
export function get_goodsCategory_tree(params, opts) {
	return request.get('/fronted/goodsCategory/tree', params, {}, opts)
}