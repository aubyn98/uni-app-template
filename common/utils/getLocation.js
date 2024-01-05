import {
	getSearchStr
} from './magic'
async function getLocation(check = false) {
	return new Promise((success, reject) => {
		uni.getLocation({
			altitude: true,
			type: 'gcj02',
			success,
			fail: function(err) {
				if (check) {
					uni.getNetworkType({
						success: function(res) {
							if (res.networkType == 'none') {
								//无网络
							} else {
								//有网络没有定位
								const pages = getCurrentPages()
								const page = pages[pages.length - 1];
								if (page.route.indexOf('errorPage') != -1) return
								uni.redirectTo({
									url: '/packageOther/pages/errorPage/errorPage' +
										getSearchStr({
											url: page.$page.fullPath,
											message: '定位失败',
											type: 2
										})
								})
							}
						}
					});
				}
				reject(err)
			}
		})
	})
}