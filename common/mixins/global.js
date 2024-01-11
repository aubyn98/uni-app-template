export default {
	data() {
		return {
			onShowEventKey: `[${uni.$u.page()}]onShow`
		}
	},
	onShow() {
		uni.$emit(this.onShowEventKey)
	},
	methods: {
		goBack() {
			const pages = getCurrentPages()
			pages.length > 1 ? uni.navigateBack() : uni.switchTab({
				url: '/pages/mine/mine'
			})
		}
	}
}