import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import {
	getLocation,
	pick
} from '@/common/utils'
import * as apis from '@/common/apis'
import {
	DELIVERY_TYPES
} from '@/common/config'
Vue.use(Vuex)

const deliveryTypeDict = {
	[DELIVERY_TYPES.SEND]: '配送',
	[DELIVERY_TYPES.TAKE]: '自提'
}
export default new Vuex.Store({
	modules,
	state: {
		showLoading: false,
		currentStore: {},
		location: uni.getStorageSync('location') || {},
		storeId: uni.getStorageSync('storeId') || '',
		deliveryType: uni.getStorageSync('deliveryType') || DELIVERY_TYPES.SEND,
	},
	getters: {
		hasLogin(state, getters) {
			return getters['user/hasLogin']
		},
		deliveryTypeName(state) {
			return deliveryTypeDict[state.deliveryType]
		}
	},
	mutations: {
		toggleLoading(state, status) {
			state.showLoading = status;
		},
		setLocation(state, location) {
			state.location = location
			uni.setStorageSync('location', location)
		},
		setCurrentStore(state, store) {
			state.currentStore = store
		},
		setStoreId(state, storeId) {
			state.storeId = storeId
			uni.setStorageSync('storeId', storeId)
		},
		toggleDeliveryType(state, {
			pageParams,
			storeId
		} = {}) {
			state.deliveryType = state.deliveryType === DELIVERY_TYPES.SEND ? DELIVERY_TYPES.TAKE : DELIVERY_TYPES.SEND
			uni.setStorageSync('deliveryType', state.deliveryType)
			/* setTimeout(() => {
				const pages = getCurrentPages();
				const perpage = pages[pages.length - 1];
				const res = {
					...pageParams,
					id: storeId,
					DeliveryType: true
				}
				perpage.onLoad(res);
			}, 1500) */
		},
	},
	actions: {
		changeCurrentStore({
			commit
		}, {
			id = uni.getStorageSync('storeId') || 1,
			distanceDesc = ''
		} = {}) {
			commit('setStoreId', id)
			return apis.get_store_detail({
				id
			}).then(res => {
				res.data.images = res.data.images ? res.data.images.split(',') : []
				res.data.distanceDesc = distanceDesc
				commit('setCurrentStore', res.data)
				return res
			})
		},
		getLocation({
			commit,
			dispatch
		}) {
			return getLocation()
				.then(res => {
					res = pick(res, ['latitude', 'longitude'])
					commit('setLocation', res)
					return res
				})
		},
		getNearbyStore({
			commit,
			dispatch
		}) {
			return dispatch('getLocation')
				.then(res => {
					return apis.get_store_nearby({
						latitude: res.latitude,
						longitude: res.longitude
					})
				}).then(res => {
					if (res.responseCode === 'allOfStoreIsClose') {
						/* uni.redirectTo({
							url: '/maintain/maintain'
						}); */
						return
					}
					const data = res.data ? res.data : {
						id: 1
					}
					return data
				}).then(store => {
					return dispatch('changeCurrentStore', store)
				})
		}
	},
})