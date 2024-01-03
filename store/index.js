import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)

export default new Vuex.Store({
	modules,
	state: {
		showLoading: false,
		currentStore: {},
		storeId: uni.getStorageSync('storeId') || '',
		deliveryType: uni.getStorageSync('deliveryType') || 'store_send'
	},
	getters: {
		hasLogin(state, getters) {
			return getters['user/hasLogin']
		}
	},
	mutations: {
		toggleLoading(state, status) {
			state.showLoading = status;
		},
		setCurrentStore(state, store) {
			state.currentStore = store
		},
		setStoreId(state, storeId = uni.getStorageSync('storeId') || 1) {
			state.storeId = storeId
			uni.setStorageSync('storeId', storeId)
		},
		changeDeliveryType(state, {
			type,
			pageParams,
			storeId
		}) {
			if (state.deliveryType == type) return
			state.deliveryType = type
			uni.setStorageSync('deliveryType', type)
			uni.showToast({
				title: `切换${deliveryTypeDict[type]}后,优惠活动可能发生变化,请核查`,
				icon: 'none',
				duration: 1200,
			});
			setTimeout(() => {
				const pages = getCurrentPages();
				const perpage = pages[pages.length - 1];
				const res = {
					...pageParams,
					id: storeId,
					DeliveryType: true
				}
				perpage.onLoad(res);
			}, 1500)
		},
	},
	actions: {},
})