import {
	request,
	wx,
	getSearchParams
} from '@/common/utils'
import {
	PAY_METHODS
} from '@/common/config'

export function payment(params, opts) {
	uni.showLoading({
		title: "请稍候...",
		mask: true
	})
	return request.get('/fronted/payment/miniapp_params', {
			...params,
			paymentMethod: PAY_METHODS.WX_MINI
		}, {}, {
			loading: false,
			...opts
		}).then(res => {
			return wx.wxPayInMiniPrograms(res.data)
		})
		.finally(() => {
			uni.hideLoading()
		})

}

export function subscribe_result(params, opts) {
	return wx.subscribeMessage({
		tmplIds: [
			'u4IaMW7Ul75yCRqCSRtu56iWqICRvZf6Py5KrXLDwIg',
			'Qtkw9ljRwNewSyn6EfrFHSiKBJgwgbn3xRvQ0E7UlOk',
			'QGxHqEUOdc5SqrGbgxh7XDQhFA_4RKUpYMGbrfpOiu4'
		]
	}).then((res) => {
		return request.post('/fronted/wechat/subscribe/result', {
			...params,
			...res
		}, {}, opts)
	}).then(() => {
		uni.showToast({
			title: "订阅成功"
		})
	})

}

export function payment_h5(params, opts) {
	uni.showLoading({
		title: "请稍候...",
		mask: true
	})
	return getOpenid()
		.then(openid => apis.payment_h5({
			openid,
			...params
		}))
		.then(res => {
			return wx.wxPayInWxBrowser(res.data)
		})
		.finally(() => {
			uni.hideLoading()
		})

}

export function getOpenid() {
	const openid = uni.getStorageSync('openid');
	return openid ? Promise.resolve(openid) : authorizeInWxBrowser()
}

export function authorizeInWxBrowser(type = 'snsapi_userinfo') {
	if (!/MicroMessenger/.test(window.navigator.userAgent)) return

	// 重定向url转码
	const currentUrl = encodeURIComponent(window.location.href);
	const queryStringParams = getSearchParams(currentUrl);

	if (!queryStringParams.code) {
		// 获取微信授权url
		apis.get_authorizeUrl({
			redirectUrl: currentUrl
		}).then(res => {
			const snsapi_userinfo = res.data;
			const snsapi_base = snsapi_userinfo.replace('snsapi_userinfo', 'snsapi_base');
			//跳转微信授权
			window.location.href = type === 'base' ? snsapi_base : snsapi_userinfo;
		})
		return Promise.reject()
	}
	const data = {
		code: queryStringParams.code,
		inviteCode: uni.getStorageSync('passive_inviteCode') // 邀请码
	};
	if (store.state.hasLogin) {
		return apis.get_openid(data).then((res) => {
			uni.setStorageSync('openid', res.data)
			return res.data
		})
	} else {
		// 登录
		return apis.login(data).then(res => {
			const info = res.data
			uni.setStorageSync('openid', info.openid)
			// store.commit('login', info);
			return info.openid
		})

	}
}