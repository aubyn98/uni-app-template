import * as apis from '@/common/apis'
import {
	debouncePromise
} from '@/common/utils'
let init = false
export default {
	namespaced: true,
	state() {
		return {
			cartInfo: {},
		}
	},
	getters: {
		goodsCount(state) {
			return state.cartInfo?.count || ''
		},
		goodsList(state) {
			return state.cartInfo?.items || []
		},
		activityInfos(state) {
			return state.cartInfo?.activityInfos || []
		},
		cartGoodsDict(state, getters) {
			return getters.goodsList.reduce((dict, item) => {
				dict[item.goodsId] = item.quantity
				return dict
			}, {})
		}
	},
	mutations: {
		clearCartInfo(state) {
			state.cartInfo = {}
		},
		setCartInfo(state, payload) {
			state.cartInfo = payload
		}
	},
	actions: {
		goSettle({
			state,
			dispatch,
			rootState
		}) {
			return apis.pretreatment_order({
				storeId: rootState.storeId,
				deliveryType: rootState.deliveryType
			}).then(() => {
				uni.$u.route('/packageGoods/pages/orderSubmit/orderSubmit', {
					storeId: rootState.storeId,
				});
			})
		},
		clearCart({
			dispatch,
			rootState
		}, {
			storeId = rootState.storeId,
			loading = false,
		} = {}) {
			return apis.clean_cart({
				storeId
			}, {
				loading
			}).then(() => {
				return dispatch('getCartlist')
			})
		},
		updateCart({
			dispatch,
			rootState
		}, {
			loading = false,
			...params
		} = {}) {
			return apis.update_cart(params, {
				loading
			}).then(() => {
				return dispatch('getCartlistDebounce')
			})
		},
		getCartlistDebounce: debouncePromise(function({
			dispatch
		}) {
			return dispatch('getCartlist')
		}, 300),
		getCartlist({
			state,
			commit,
			dispatch,
			rootState
		}, {
			storeId = rootState.storeId,
			loading = false
		} = {}) {
			return apis.get_cart({
				storeId,
			}, {
				loading
			}).then(res => {
				commit('setCartInfo', res.data)
				dispatch('updateTabarCount')
				return res.data
			})
		},
		updateTabarCount({
			getters
		}) {
			const count = getters.goodsCount
			if (count) {
				uni.setTabBarBadge({
					index: 2,
					text: String(count)
				})
			} else {
				uni.hideTabBarRedDot({
					index: 2
				})
			}
		}
	},
}