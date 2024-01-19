import * as apis from '@/common/apis'
import store from '@/store'
import {
	getSearchParams
} from './magic'
import {
	ENUMS
} from '@/common/config'


export function showToast(title) {
	uni.showToast({
		icon: 'none',
		title
	})
}

export function scanBarcode() {
	uni.scanCode({
		scanType: ['qrCode', 'barCode'],
		success: (e) => {
			if (e.result) {
				apis.scanGoodsCode({
					storeId: store.state.storeId,
					barcode: e.result
				}).then(res => {
					if (res.status) {
						uni.showToast({
							title: '扫码成功！',
							icon: 'none',
							duration: 1000
						})
						toPage({
							targetType: 'GoodsDetail',
							targetData: {
								id: res.data.id
							}
						})
					} else {
						uni.showToast({
							title: '没有找到该商品',
							icon: 'none',
							duration: 1000
						})
					}
				})
			}
		},
		fail: (e) => {
			uni.showToast({
				title: '扫码失败',
				icon: 'none',
				duration: 1000
			})
		}
	})
}

export function toPage(row) {
	let event = (url, params, type = 'navigateTo') => uni.$u.route({
		type,
		url,
		params,
	})
	const {
		targetType,
		targetData
	} = row
	if (targetType == 'None') return
	if (targetType == 'AllCategory') event('/pages/findMedicine/findMedicine', {}, 'switchTab')
	if (targetType == 'Category') {
		uni.setStorageSync(ENUMS.JUMP_FIND_MEDICINE_KEY, targetData.id)
		uni.$emit(ENUMS.JUMP_FIND_MEDICINE_KEY)
		event('/pages/findMedicine/findMedicine', {}, 'switchTab')
	}
	if (targetType == 'GoodsDetail') event('/packageGoods/pages/detail/detail', {
		goodsId: targetData.id
	})
	if (targetType == 'DefinePage') event('/packageOther/pages/definePage/definePage', targetData)
	if (targetType == 'Integrate') event('/packageOther/pages/integral/integral', targetData)
	if (targetType == 'Coupon') event('/packageOther/pages/couponCenter/couponCenter', targetData)
	if (targetType == 'Search') event('/packageGoods/pages/search/searchResult', targetData)
	if (targetType == 'MemberCard') event('/packageMine/pages/memberCode/memberCode', targetData)
}