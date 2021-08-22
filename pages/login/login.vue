<template>
	<view>
		<c-page-title>快捷登陆</c-page-title>
		<image src="/static/images/icon_logo@2x.png" class="logo"></image>
		<c-button size="big" image="icon_wechat" open-type="getUserInfo" @getuserinfo="onUserInfo" @click="canIUseGetUserProfile && getUserInfo()">微信授权一键登录</c-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			canIUseGetUserProfile: false
		};
	},
	onLoad(option) {
		if (wx.getUserProfile) {
			this.canIUseGetUserProfile = true;
		}
	},
	methods: {
		/* onUserInfo() {
			const userInfo = res.detail.userInfo;
			if (!userInfo) return false;
		},
		getUserInfo() {
			wx.getUserProfile({
				desc: '用于完善会员资料',
				success: res => {
					const userInfo = res.userInfo;
				}
			});
		}, */
		login() {
			uni.login({
				provider: 'weixin',
				success: result => {
					that.$api
						.post_login({
							code: result.code
						})
						.then(res => {
							if (!res.data.openid) {
								uni.showToast({
									icon: 'none',
									title: 'openid为空'
								});
								return;
							}
						});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.logo {
	margin: 262rpx auto 216rpx;
	width: 236rpx;
	height: 236rpx;
	display: block;
}
</style>
