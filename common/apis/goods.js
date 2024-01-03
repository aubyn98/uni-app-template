import {
	request
} from '@/common/utils'



export function scanGoodsCode(params) {
	return request.get('/fronted/goods/detail/barcode', params)
}
export function get_goods_list(params) {
	return request.get('/fronted/goods/list', params)
}

export function get_goods_detail(params) {
	return request.get('/fronted/goods/detail', params)

}
export function get_goodsCategory_all(params) {
	return request.get('/fronted/goodsCategory/all', params)

}
export function get_goodsCategory_lower(params) {
	return request.get('/fronted/goodsCategory/lower', params)

}
export function get_goodsCategory_tree(params) {
	return request.get('/fronted/goodsCategory/tree', params)
}