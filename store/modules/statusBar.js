export default {
	namespaced: true,
	state() {
		return {
			statusBarHeight: 0,
			MenuButton: {},
			titleHeight: 0,
			titleContentHeight: 0,
			windowInfo: {
				pixelRatio: 1, //	设备像素比	
				screenWidth: 0, //	屏幕宽度	
				screenHeight: 0, //	屏幕高度	
				windowWidth: 0, //	可使用窗口宽度	
				windowHeight: 0, //	可使用窗口高度	
				windowTop: 0, //	可使用窗口的顶部位置	
				windowBottom: 0, //	可使用窗口的底部位置	
				statusBarHeight: 0, //	手机状态栏的高度	
				screenTop: 0, //	窗口上边缘的 y 值	
				//	在竖屏正方向下的安全区域	
				safeArea: {
					left: 0, // 安全区域左上角横坐标
					right: 0, // 安全区域右下角横坐标
					top: 0, // 安全区域左上角纵坐标
					bottom: 0, // 安全区域右下角纵坐标
					width: 0, // 安全区域的宽度，单位逻辑像素
					height: 0, // 安全区域的高度，单位逻辑像素
				},
				//	在竖屏正方向下的安全区域插入位置	
				safeAreaInsets: {
					left: 0, //	安全区域左侧插入位置
					right: 0, //	安全区域右侧插入位置
					top: 0, //	安全区顶部插入位置
					bottom: 0, //	安全区域底部插入位置
				}
			}
		}
	},
	mutations: {
		initBarInfo(state) {
			const windowInfo = uni.$u.sys('getWindowInfo')
			let statusBarHeight = windowInfo.statusBarHeight;
			const MenuButton = uni.getMenuButtonBoundingClientRect()
			while (!MenuButton || MenuButton.left == 0 || MenuButton.right == 0 || MenuButton.top == 0 || MenuButton
				.bottom == 0 ||
				MenuButton.width == 0 || MenuButton.height == 0) {
				MenuButton = uni.getMenuButtonBoundingClientRect()
			}
			let marginTop = MenuButton.top - statusBarHeight
			if (marginTop < 0) {
				marginTop = 4
				statusBarHeight = statusBarHeight - marginTop * 2
			}
			state.statusBarHeight = statusBarHeight
			state.MenuButton = {
				marginTop,
				marginRight: windowInfo.screenWidth - MenuButton.right,
				...MenuButton
			};
			state.titleHeight = MenuButton.height + MenuButton.top + state.MenuButton.marginTop
			state.titleContentHeight = state.titleHeight - statusBarHeight
			state.windowInfo = windowInfo
		}
	}
}