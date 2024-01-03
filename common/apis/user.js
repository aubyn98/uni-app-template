import {
	request
} from '@/common/utils'

export function createQRCode(params) {
	return request.post('/fronted/createQRCode', params, {}, {
		qs: false
	})
}

export function editUserInfo(params) {
	return request.post('/fronted/member/wechat/update', params)
}

export function createCardParams() {
	return {
		"card_type": "MEMBER_CARD",
		"member_card": {
			"activate_app_brand_pass": "",
			"activate_app_brand_user_name": "",
			"activate_url": "",
			"advanced_info": {
				"_abstract": {
					"_abstract": "",
					"icon_url_list": []
				},
				"business_service": [],
				"text_image_list": [{
					"image_url": "",
					"text": ""
				}],
				"time_limit": [{
					"begin_hour": 0,
					"begin_minute": 0,
					"end_hour": 0,
					"end_minute": 0,
					"type": ""
				}],
				"wechatAdvancedInfoUseConditionParam": {
					"accept_category": "",
					"can_use_with_other_discount": true,
					"least_cost": 0,
					"object_use_for": "",
					"reject_category": ""
				}
			},
			"auto_activate": true,
			"background_pic_url": "",
			"balance_rules": "",
			"balance_url": "",
			"base_info": {
				"bind_openid": false,
				"brand_name": "好万家门店",
				"can_give_friend": true,
				"can_share": true,
				"center_sub_title": "",
				"center_title": "",
				"center_url": "",
				"code_type": "",
				"color": "#333333",
				"custom_url": "",
				"custom_url_name": "",
				"custom_url_sub_title": "",
				"date_info": {
					"begin_timestamp": 0,
					"end_timestamp": 0,
					"fixed_begin_term": "",
					"fixed_term": 0,
					"type": "DATE_TYPE_PERMANENT"
				},
				"description": "好万家门店会员卡",
				"get_limit": 1,
				"location_id_list": [],
				"logo_url": "http://haowanjia.oss-cn-shenzhen.aliyuncs.com/store/20210301/c808f0fe847949b7b1127c2d79bc76be.png",
				"need_push_on_view": false,
				"notice": "经常使用有优惠",
				"pay_info": {
					"swipe_card": {
						"is_pay_and_qrcode": true,
						"is_swipe_card": true
					}
				},
				"promotion_url": "",
				"promotion_url_name": "",
				"promotion_url_sub_title": "",
				"service_phone": "",
				"sku": {
					"quantity": 10000
				},
				"title": "好万家门店会员卡",
				"use_all_locations": true,
				"use_custom_code": false
			},
			"bonus_cleared": "",
			"bonus_rule": {
				"cost_bonus_unit": 0,
				"cost_money_unit": 0,
				"increase_bonus": 0,
				"init_increase_bonus": 0,
				"least_money_to_use_bonus": 0,
				"max_increase_bonus": 0,
				"max_reduce_bonus": 0,
				"reduce_money": 0
			},
			"bonus_rules": "",
			"bonus_url": "",
			"custom_cell1": {
				"name": "好万家门店",
				"tips": "好万家",
				"url": "pages/mainPackage/home/index"
			},
			"custom_field1": {
				"name": "",
				"name_type": "",
				"url": ""
			},
			"custom_field2": {
				"name": "",
				"name_type": "",
				"url": ""
			},
			"custom_field3": {
				"name": "",
				"name_type": "",
				"url": ""
			},
			"discount": 0,
			"prerogative": "8折优惠",
			"supply_balance": true,
			"supply_bonus": true,
			"wx_activate": true
		}
	}
}
export function create_member_card(params) {
	return request.post('/fronted/wechat/create/member/card', createCardParams(), {}, {
		qs: false
	})
}

export function member_mobile_login(params) {
	return request.post('/fronted/member/mobile/login', params)
}

export function receive_member_card(params) {
	return request.get('/fronted/wechat/receive/card/params', params)
}

export function get_myself(params) {
	return request.get('/fronted/member/myself', params)
}

export function bind_member_card(params) {
	return request.post('/fronted/member/bind/card', params)
}

export function member_bind_card(params) {
	return request.post('/fronted/member/bind_card', params)
}

export function get_openid(params) {
	return request.get('/fronted/wechat/mini/openid', params)
}

export function wechat_login(params) {
	return request.post('/fronted/member/wechat/login', params)
}

export function member_binding_mobile(params) {
	return request.post('/fronted/member/binding_mobile', params)
}