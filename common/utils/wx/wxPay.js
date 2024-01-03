import apis from '@/common/apis';


export function payment(openId, orderSn) {
	uni.showLoading({
		title: "请稍候...",
		mask: true
	})
	return apis.payment({
		openId,
		paymentMethod: 'wexpayMiniAppPaymentPlugin'
	}).then(res => {
		return wexpayMiniAppPayment(res.data, orderSn)
	}).finally(() => {
		uni.hideLoading()
	})
}

export function wexpayMiniAppPayment(data, orderSn) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.sign,
			complete: function(res) {
				if (res.errMsg == 'requestPayment:ok') {
					resolve(res)
					const pages = getCurrentPages()
					const page = pages[pages.length - 1];
					if (page.route != 'packageA/pages/orderDetail/orderDetail') {
						uni.navigateTo({
							url: '/packageA/pages/orderDetail/orderDetail?sn=' + orderSn,
							fail: (err) => {
								console.log(err)
							},
						})
					}
				} else {
					reject(res)
				}
			}
		});
	})
}

export function subscribeMessage(openId) {
	return new Promise((resolve, reject) => {
		wx.requestSubscribeMessage({
			tmplIds: ['u4IaMW7Ul75yCRqCSRtu56iWqICRvZf6Py5KrXLDwIg',
				'Qtkw9ljRwNewSyn6EfrFHSiKBJgwgbn3xRvQ0E7UlOk',
				'QGxHqEUOdc5SqrGbgxh7XDQhFA_4RKUpYMGbrfpOiu4'
			],
			success(res) {
				if (res.errMsg == "requestSubscribeMessage:ok") {
					const allowTemplateIds = []
					const rejectTemplateIds = []
					for (let key in res) {
						if (res[key] == "accept") {
							allowTemplateIds.push(key)
						} else if (res[key] == "reject") {
							rejectTemplateIds.push(key)
						}
					}
					apis.subscribe_result({
						allowTemplateIds,
						rejectTemplateIds,
						openId
					}).then(r => {
						if (r.status) {
							uni.showToast({
								title: "订阅成功"
							})
							resolve(r)
						} else {
							reject(r)
						}
					}).catch(reject)
				} else {
					reject(res)
				}
			},
			fail(e) {
				reject(e)
			}
		})
	})
}



export default {
	payment,
	wexpayMiniAppPayment,
	subscribeMessage
}