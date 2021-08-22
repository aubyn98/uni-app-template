import {
	Dev,
	Pro
} from '../config/index.js'
import store from '@/store'


const default_baseURL = process.env.NODE_ENV === 'development' ? Dev.baseURL : Pro.baseURL
// 106
export function downloadFile(url, params) {
	const hasParams = typeof params === 'object' && params !== null
	if (hasParams) {
		params = Object.keys(params).reduce((prev, k) => {
			const val = params[k]
			val && prev.push(encodeURIComponent(k) + '=' + encodeURIComponent(val))
			return prev
		}, []).join('&')
	}
	uni.showLoading({
		mask: true,
		title: '下载中...'
	})
	return new Promise((resolve, reject) => {
		wx.downloadFile({
			url: default_baseURL + url + (hasParams ? '?' + params : ''),
			header: {
				'x-token': store.state.token || uni.getStorageSync('x-token'),
			},
			success(res) {
				resolve(res)
			},
			fail(e) {
				reject(e)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}

export default function http(opt, intercept = false) {
	const {
		header,
		...res
	} = opt
	opt = res
	return new Promise((resolve, reject) => {
		if (intercept) {
			// store.commit('toggleLoading', true);
		}
		uni.request({
			header: {
				'Content-Type': opt.method.toUpperCase === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8',
				'x-token': store.state.token || uni.getStorageSync('x-token'),
				...header
			},
			success(res) {
				// 如果token失效，重定向到授权登录页面
				// console.log(res, '------res')
				const {
					Refresh_Token
				} = res.header
				if (Refresh_Token) store.commit('changeToken', Refresh_Token)
				if (res.data.message == '无效的令牌') {
					store.commit('logout')
				} else {
					resolve(res.data)
				}

			},
			fail(err) {
				console.log("http fail")
				uni.showToast({
					title: "请求失败",
					icon: 'none'
				})
				reject(err)
			},
			complete() {
				if (intercept) {
					// store.commit('toggleLoading', false);
				}
			},
			...opt,
			url: default_baseURL + opt.url,
		})
	})
}
