import apis from '@/common/apis'
import {
	STORAGE_KEY_ENUMS
} from '@/common/config'

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
		},
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
		}, storeId = rootState.storeId) {
			return apis.clean_cart({
				storeId
			}).then(() => {
				return dispatch('getCartlist')
			})
		},
		updateCart({
			dispatch,
			rootState
		}, params) {
			return apis.update_cart(params).then(() => {
				return dispatch('getCartlist')
			})
		},
		getCartlist({
			state,
			commit,
			rootState
		}, storeId = rootState.storeId) {
			apis.get_cart({
				storeId,
			}).then(res => {
				commit('setCartInfo', res.data)
				const count = res.data ? res.data.count : 0
				uni.setTabBarBadge({
					index: 2,
					text: String(count)
				})
				if (count) {
					uni.setTabBarBadge({
						index: 2,
						text: String(count)
					})
					// uni.showTabBarRedDot()
				} else {
					init && uni.hideTabBarRedDot({
						index: 2
					})
				}
				init = true
			})
		}
	},
}