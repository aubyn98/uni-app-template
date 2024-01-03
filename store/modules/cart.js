import apis from '@/common/apis'
import {
	STORAGE_KEY_ENUMS
} from '@/common/config'
export default {
	namespaced: true,
	state() {
		return {
			goodsList: [],
			goodsCount: ''
		}
	},
	getters: {

	},
	mutations: {
		clearCartInfo(state) {
			state.goodsList = []
			state.goodsCount = ''
		},
		setGoodsList(state, payload) {
			state.goodsList = payload
		},
		setGoodsCount(state, payload) {
			state.goodsCount = payload
		}
	},
	actions: {
		getCartlist({
			state,
			commit
		}, storeId) {
			apis.get_cart({
				storeId
			}).then(res => {
				commit('setGoodsList', res.data)
				commit('setGoodsCount', res.data ? res.data.count : 0)
			})
		},
	},
}