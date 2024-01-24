import * as apis from '@/common/apis'
import {
	TOKEN_KEY
} from '@/common/config'
let loginPromise = null
export default {
	namespaced: true,
	state() {
		return {
			info: uni.getStorageSync('userInfo') || {},
			token: uni.getStorageSync(TOKEN_KEY) || '',
			openid: uni.getStorageSync('openid') || '',
			memberCardInfo: uni.getStorageSync('memberCardInfo') || '',
		}
	},
	getters: {
		hasLogin(state) {
			return !!state.token
		}
	},
	mutations: {
		clearMemberCardInfo(state) {
			state.memberCardInfo = ''
			uni.removeStorageSync('memberCardInfo')
		},
		setMemberCardInfo(state, provider) {
			state.memberCardInfo = provider
			uni.setStorageSync(
				'memberCardInfo',
				provider
			)
		},
		clearLoginInfo(state) {
			state.token = ''
			state.info = {}
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync(TOKEN_KEY)
		},
		setOpenid(state, openid) {
			state.openid = openid
			uni.setStorageSync(
				'openid',
				openid
			)
		},
		setLoginInfo(state, provider) {
			state.info = provider.info;
			uni.setStorageSync('userInfo', provider.info)

			state.token = provider.token
			uni.setStorageSync(
				TOKEN_KEY,
				provider.token
			)
		},
	},
	actions: {
		getMemberCardInfo({
			state,
			commit,
			rootState
		}) {
			return apis.get_myself({}, {
				showError: false
			}).then(res => {
				commit('setMemberCardInfo', res.data)
				return res
			}).catch((rej) => {
				commit('clearMemberCardInfo')
				return rej
			})
		},
		logout({
			commit
		}) {
			commit('clearLoginInfo')
			commit('cart/clearCartInfo', null, {
				root: true
			})
		},
		login({
			state,
			getters,
			rootState,
			commit,
			dispatch
		}, storeId) {
			if (loginPromise) return loginPromise
			loginPromise = wx.login({
				provider: 'weixin',
			}).then(result => apis.get_openid({
				code: result.code
			})).then(res => {
				const openid = res.data.openid
				if (!openid) {
					uni.showToast({
						icon: 'none',
						title: 'openid为空'
					})
					return
				}

				commit('setOpenid', openid)

				return apis.wechat_login({
					openId: openid,
					nickname: '',
					avatarUrl: '',
					storeId: storeId || rootState.storeId
				})
			}).then(result => {
				// 获取用户基本信息
				const provider = result.data
				commit('setLoginInfo', provider)


				const userInfo = provider.info;
				if (!userInfo.nickname || userInfo.nickname.indexOf(
						'微信用户') > -1) {
					uni.$u.route('/packageMine/pages/editUserInfo/editUserInfo')
				}
				// dispatch('getMemberCardInfo')
			}).finally(() => {
				loginPromise = null
			})
			return loginPromise
		},
		mobileLogin({
			state,
			getters,
			rootState,
			commit,
			dispatch
		}, mobileData) {
			return wx.login({
				provider: 'weixin',
			}).then(result => apis.get_openid({
				code: result.code
			})).then(res => {
				const openid = res.data.openid
				if (!openid) {
					uni.showToast({
						icon: 'none',
						title: 'openid为空'
					})
					return
				}
				commit('setOpenid', openid)
				return apis.member_binding_mobile({
					encryptedData: mobileData.encryptedData,
					iv: mobileData.iv,
					sessionKey: res.data.session_key
				})

			}).then(result => {
				return apis.wechat_login({
					openId: state.openid,
					nickname: '',
					avatarUrl: '',
					storeId: rootState.storeId
				})
			}).then(result => {
				// 获取用户基本信息
				const provider = result.data
				commit('setLoginInfo', provider)
				const userInfo = provider.info;
				// dispatch('getMemberCardInfo')
			})
		},
	},
}