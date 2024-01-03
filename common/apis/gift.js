import {
	request
} from '@/common/utils'


//活动列表
export function get_gift_center(params) {
	return request.get('/fronted/gift/center', params)
}

//活动详情
export function get_gift_detail(params) {
	return request.get('/fronted/gift/detail', params)
}

//兑换
export function exchange_gift(params) {
	return request.post('/fronted/gift/exchange', params)
}

export function get_member_gift_integral(params) {
	return request.get('/fronted/member_gift/integral', params)
}

export function get_member_gift_list(params) {
	return request.get('/fronted/member_gift/list', params)
}

export function get_member_gift_detail(params) {
	return request.get('/fronted/member_gift/detail', params)
}

export function get_member_gift_judge(params) {
	return request.get('/fronted/member_gift/judge', params)
}