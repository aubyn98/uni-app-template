import * as apis from '@/common/apis';

/** 微信小程序支付 */
export function wxPayInMiniPrograms(data) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.sign,
			complete: function(res) {
				if (res.errMsg === 'requestPayment:ok') {
					resolve(res)
				} else {
					reject(res)
				}
			}
		});
	})
}

/** 微信小程序消息订阅 */
export function subscribeMessage(opts) {
	return new Promise((resolve, reject) => {
		// opts.tmplIds
		wx.requestSubscribeMessage({
			...opts,
			success(res) {
				if (res.errMsg === 'requestSubscribeMessage:ok') {
					const allowTemplateIds = []
					const rejectTemplateIds = []
					for (let key in res) {
						if (res[key] === 'accept') {
							allowTemplateIds.push(key)
						} else if (res[key] === 'reject') {
							rejectTemplateIds.push(key)
						}
					}
					resolve({
						allowTemplateIds,
						rejectTemplateIds,
					})
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

/** 微信浏览器支付 */
export function wxPayInWxBrowser(data) {
	//使用微信浏览器API调用微信支付
	return new Promise((resolve, reject) => {
		WeixinJSBridge && WeixinJSBridge.invoke('getBrandWCPayRequest', {
				appId: data.appId,
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				paySign: data.sign,
				timeStamp: data.timeStamp
			},
			function(res) {
				if (res.err_msg === 'get_brand_wcpay_request:ok') {
					resolve(res)
				} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
					reject(res)
				} else {
					reject(res)
					uni.showToast({
						title: '支付失败',
						icon: 'none',
						duration: 2000
					});
				}
			}
		)
	})
}