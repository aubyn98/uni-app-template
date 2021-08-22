const success = ['getUserInfo:ok', 'getUserProfile:ok']
export default {
	onLoad(option) {
		if (wx.getUserProfile) {
			this.canIUseGetUserProfile = true;
		}
	},
	data() {
		return {
			canIUseGetUserProfile: false,
			wxUserInfo: null,
		};
	},
	methods: {
		_getWxUserInfo(res) {
			const isError = success.indexOf(res.errMsg) === -1
			if (!isError) this.wxUserInfo = res.userInfo
			this.getWxUserInfo(res.userInfo, isError, res)
		},
		onUserInfo(res) {
			const detail = res.detail;
			this._getWxUserInfo(detail)
		},
		getUserInfo() {
			wx.getUserProfile({
				desc: '用于完善员工资料',
				success: res => {
					this._getWxUserInfo(res)
				},
				fail: res => {
					this._getWxUserInfo(res)
				},
			});
		},
	}
}
