import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)

export default new Vuex.Store({
	modules,
	state: {
		userInfo: {},
		isLogin: false,
		acls: [],
		isManager: false,
		token: null
	},
	mutations: {
		login(state, {
			token,
			acls,
			status,
			...userInfo
		}) {
			state.isLogin = true
			state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)

			state.isManager = acls.length !== 0
			state.acls = acls
			uni.setStorageSync('acls', acls)

			state.token = token
			uni.setStorageSync('x-token', token)
			
			uni.switchTab({
				url: '/pages/meal-subscribe/meal-subscribe'
			})
		},
		logout(state) {
			state.isLogin = false
			state.userInfo = {}
			uni.removeStorageSync('userInfo')

			state.isManager = false
			state.acls = []
			uni.removeStorageSync('acls')

			state.token = null
			uni.removeStorageSync('x-token')
			
			uni.redirectTo({
				url: '/pages/login/login'
			})
		},
		logined(state) {
			const token = uni.getStorageSync('x-token')
			if (!token) return
			state.token = token

			state.isLogin = true
			state.userInfo = uni.getStorageSync('userInfo')

			state.acls = uni.getStorageSync('acls')
			state.isManager = state.acls.length !== 0

		}
	},
	actions: {},
})
