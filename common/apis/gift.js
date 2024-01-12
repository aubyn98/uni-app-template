import {
	request
} from '@/common/utils'


//活动列表
export function get_gift_center(params, opts) {
	return request.get('/fronted/gift/center', params, {}, opts)
}

//活动详情
export function get_gift_detail(params, opts) {
	return request.get('/fronted/gift/detail', params, {}, opts)
}

//兑换
export function exchange_gift(params, opts) {
	return request.post('/fronted/gift/exchange', params, {}, opts)
}

export function get_member_gift_integral(params, opts) {
	return request.get('/fronted/member_gift/integral', params, {}, opts)
}

export function get_member_gift_list(params, opts) {
	return request.get('/fronted/member_gift/list', params, {}, opts)
}

export function get_member_gift_detail(params, opts) {
	return request.get('/fronted/member_gift/detail', params, {}, opts)
}

export function get_member_gift_judge(params, opts) {
	return request.get('/fronted/member_gift/judge', params, {}, opts)
}