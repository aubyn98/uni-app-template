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
			if (fromCode && !e.storeId && this.storeId) {
				e.storeId = this.storeId
			}
			if (e.storeId) {
				await this.$store.dispatch('changeCurrentStore', {
					id: e.storeId
				})
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