function getBottomBlackLineHeight() {
	const mobileInfo = uni.getSystemInfoSync();
	let BottomBlackLineHeight = '0rpx'; //iphoneX底部一条黑线，有些页面要避开
	let iphoneXArr = ['iPhone X', 'iPhone 11', 'iPhone 11 Pro Max'];
	for (let i = 0, l = iphoneXArr.length; i < l; i++) {
		if (mobileInfo.model.search(iphoneXArr[i]) !== -1) {
			BottomBlackLineHeight = '60rpx';
		}
	}
	return BottomBlackLineHeight;
}
export default {
	namespaced: true,
	state() {
		return {
			statusBarHeight: 0,
			MenuButton: {},
			titleHeight: 0,
			bottomBlackLineHeight: ''
		}
	},
	mutations: {
		setBottomBlackLineHeight(state) {
			state.bottomBlackLineHeight = getBottomBlackLineHeight()
		},
		initBarInfo(state) {
			const statusBarHeight = state.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			const MenuButton = uni.getMenuButtonBoundingClientRect()
			while (!MenuButton || MenuButton.left == 0 || MenuButton.right == 0 || MenuButton.top == 0 || MenuButton
				.bottom == 0 ||
				MenuButton.width == 0 || MenuButton.height == 0) {
				MenuButton = uni.getMenuButtonBoundingClientRect()
			}
			state.MenuButton = {
				marginTop: MenuButton.top - statusBarHeight,
				...MenuButton
			};
			state.titleHeight = MenuButton.height + MenuButton.top + 6
		}
	}
}