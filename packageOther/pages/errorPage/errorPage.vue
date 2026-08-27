<template>
	<view>
		<c-page-title home>{{ type == 'fail' ? '网络出错' : '服务器错误'}}</c-page-title>
		<view class="un-network">
			<image class="un-network-img" src="/packageOther/static/images/errorPage/ann.wl.png" />
			<view v-if="type == '502'" class="un-network-title">
				服务器崩溃了
			</view>
			<view class="un-network-content">
				{{ type == 'fail' ? '网络出错，请重新加载或检查网络' : '服务器发生了一点小问题请稍后重试~'}}
			</view>
			<view class="un-network-btn">
				<c-button type="info" :bold="false" customClass="mar-0" :plain="true" width="240rpx"
					@click="repositionHandle">重新加载</c-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				redirectUrl: '/pages/home/home'
			}
		},
		onLoad(option) {
			this.type = option.type
			this.redirectUrl = decodeURIComponent(option.redirectUrl)
		},
		methods: {
			repositionHandle() {
				const isTab = this.redirectUrl.startsWith('/pages')
				uni[isTab ? 'switchTab' : 'redirectTo']({
					url: this.redirectUrl,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.un-network {
		margin: 0 110rpx 0 108rpx;
		text-align: center;

		.un-network-img {
			margin-top: 240rpx;
			width: 268rpx;
			height: 268rpx;
		}

		.un-network-content {
			margin-top: 40rpx;
			font-size: 28rpx;
			color: #999999;
		}

		.un-network-btn {
			display: flex;
			margin-top: 40rpx;
			justify-content: center;
		}

		.un-network-title {
			font-size: 36rpx;
			margin-top: 40rpx;
			font-weight: bold;
			color: #333333;
		}
	}
</style>