import apis from '@/common/apis'
import {
	getSearchParams
} from './magic'


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
						/* uni.$u.route(`/pages/subPackage/goodsdetail/goodsdetail`, {
							goodsId: res.data.id,
							formSearch: 1
						}) */
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
			// uni.showToast({
			// 	title: '扫码失败',
			// 	icon: 'none',
			// 	duration: 1000
			// })
		}
	})
}