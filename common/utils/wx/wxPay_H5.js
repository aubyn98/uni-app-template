import apis from '@/common/apis';

export function formatQueryString(url = '') {
	url = decodeURIComponent(url)
	let result = {};
	if (url.includes('?')) {
		const queryString = url.split('?')[1],
			splitQueryString = queryString.includes('&') ? queryString.split('&') : [queryString];
		result = splitQueryString.reduce((before, after) => {
			let field = after.split('=');
			before[field[0]] = field[1];
			return before;
		}, {});
	};
	return result;
}

export function authorize(type = 'snsapi_userinfo') {
	if (!/MicroMessenger/.test(window.navigator.userAgent)) return

	// 重定向url转码
	const currentUrl = encodeURIComponent(window.location.href);
	const queryStringParams = formatQueryString(currentUrl);

	if (!queryStringParams.code) {
		// 获取微信授权url
		return apis.get_authorizeUrl({
			redirectUrl: currentUrl
		}).then(res => {
			const snsapi_userinfo = res.data;
			const snsapi_base = snsapi_userinfo.replace('snsapi_userinfo', 'snsapi_base');
			//跳转微信授权
			window.location.href = type === 'base' ? snsapi_base : snsapi_userinfo;
		})
	} else {
		const data = {
			code: queryStringParams.code,
			inviteCode: uni.getStorageSync('passive_inviteCode') // 邀请码
		};
		if (store.state.hasLogin) {
			return apis.get_openid(data).then((res) => {
				uni.setStorageSync('openid', res.data)
			})
		} else {
			// 登录
			return apis.login(data).then(res => {
				const info = res.data
				uni.setStorageSync('openid', info.openid)
				// store.commit('login', info);
			})

		}
	}
}

export function getOpenid() {
	return new Promise((resolve, reject) => {
		const openid = uni.getStorageSync('openid');
		if (openid) {
			resolve(openid);
		} else {
			authorize()
			reject()
		};
	})
}

export function payment(data, orderSn) {
	uni.showLoading({
		title: "请稍候...",
		mask: true
	})
	return getOpenid().then(openid => apis.payment_h5({
			openid,
			...data
		}))
		.then(res => {
			return wxPayInWxBrowser(res.data, orderSn)
		})
		.finally(() => {
			uni.hideLoading()
		})

}
//微信浏览器支付
export function wxPayInWxBrowser(data, orderSn) {
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
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					resolve(res)
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/orderDetail?sn=' + orderSn,
							fail: (err) => {
								console.log(err)
							}
						})
					}, 300)
				} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
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