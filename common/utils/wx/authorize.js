const scopeDict = {
	userInfo: 'scope.userInfo', // 用户信息 wx.getUserInfo
	userLocation: 'scope.userLocation', // 地理位置 wx.getLocation, wx.chooseLocation	
	userLocationBackground: 'scope.userLocationBackground', // 后台定位 wx.startLocationUpdateBackground	
	address: 'scope.address', // 通讯地址（已取消授权，可以直接调用对应接口） wx.chooseAddress	
	invoiceTitle: 'scope.invoiceTitle', // 	发票抬头（已取消授权，可以直接调用对应接口） wx.chooseInvoiceTitle
	invoice: 'scope.invoice', // 	获取发票（已取消授权，可以直接调用对应接口） wx.chooseInvoice
	werun: 'scope.werun', // 	微信运动步数 wx.getWeRunData
	record: 'scope.record', // 	录音功能 wx.startRecord
	writePhotosAlbum: 'scope.writePhotosAlbum', // 	保存到相册 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
	camera: 'scope.camera' // 摄像头 camera 组件	
}
export function authorize({
	withSubscriptions,
	scope
} = {}) {
	withSubscriptions = withSubscriptions || false
	scope = scopeDict[scope] || ['scope.' + scope]
	return new Promise(function(resolve, reject) {
		wx.getSetting({
			withSubscriptions,
			success(e) {
				if (e.authSetting[scope] === false) return wx.openSetting({
					withSubscriptions,
					success(res) {
						res.authSetting[scope] ? resolve(res) : reject(res)
					},
					fail: reject
				})
				wx.authorize({
					scope,
					success: resolve,
					fail: reject
				})
			},
			fail: reject
		})
	})
}

export default authorize
