export default {
	namespaced: true,
	state() {
		return {
			statusBarHeight: 0,
			MenuButton: {},
			titleHeight: 0,
		}
	},
	mutations: {
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