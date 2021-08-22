export default {
	methods: {
		goBack() {
			const pages = getCurrentPages()
			pages.length > 1 ? uni.navigateBack() : uni.switchTab({
				url: '/pages/mine/mine'
			})
		}
	}
}
