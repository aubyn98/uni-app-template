import apis from '@/common/apis'
import {
	STORAGE_KEY_ENUMS
} from '@/common/config'
export default {
	namespaced: true,
	state() {
		return {
			info: uni.getStorageSync('userInfo') || {},
			token: uni.getStorageSync(STORAGE_KEY_ENUMS.token) || '',
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
			uni.removeStorageSync(STORAGE_KEY_ENUMS.token)
		},
		setOpenid(state, provider) {
			state.openid = provider.openid
			uni.setStorageSync(
				'openid',
				provider.openid
			)
		},
		setLoginInfo(state, provider) {
			state.info = provider.info;
			uni.setStorageSync('userInfo', provider.info)

			state.token = provider.token
			uni.setStorageSync(
				STORAGE_KEY_ENUMS.token,
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
			return apis.get_myself().then(res => {
				if (res.status && res.responseCode === 'success') {
					commit('setMemberCardInfo', res.data)
				} else {
					commit('clearMemberCardInfo')
				}
				return res
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
			rootState,
			commit,
			dispatch
		}, storeId) {
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
					uni.$u.route('/packageA/pages/subPackage/editUserInfo/editUserInfo')
				}
				dispatch('getMemberCardInfo')
			})
		},
	},
}