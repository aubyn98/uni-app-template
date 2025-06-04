import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters('cart', ['goodsCount']),
	},
	watch: {
		storeId: {
			handler(v, oldV) {
				if (oldV && v) this.init()
			}
		},
		goodsCount() {
			this.$mp.page.getTabBar().setData({
				goodsCount: this.goodsCount
			})
		}
	},
	onShow() {
		this.$store.dispatch('cart/updateTabarCount')
		if (typeof this.$mp.page.getTabBar == 'function') {
			this.$mp.page.getTabBar().setData({
				selected: this.tabBarIndex,
				goodsCount: this.goodsCount
			})
		}
	}
}