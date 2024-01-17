export default {
	methods: {
		async loginAdjunct(e) {
			const fromCode = !!e.scene
			if (e.scene) {

				e = {
					...e,
					fromCode,
					...this.$utils.getSearchParams(e.scene)
				}
			}
			if (fromCode && !e.id && this.storeId) {
				e.id = this.storeId
			}
			if (e.storeId) e.id = e.storeId // 兼容
			if (e.id) {
				await this.$store.dispatch('changeCurrentStore', e.id)
			} else if (this.$utils.isEmpty(this.currentStore)) {
				await this.$store.dispatch('getNearbyStore')
					.catch(() => {
						return this.$store.dispatch('changeCurrentStore')
					})
			}
			if (!this.hasLogin) await this.$store.dispatch('user/login')
			this.storeId && this.$store.dispatch('cart/getCartlist')
			return e
		}
	}
}