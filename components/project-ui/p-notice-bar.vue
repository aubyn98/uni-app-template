<template>
	<view class="p-notice-bar">
		<!-- 		<u-notice-bar :autoplay="autoplay" :playState="playState" :speed="speed" @getMore="getMore" :mode="mode" @end="end"
		 :show="show" :type="type" :list="list" :moreIcon="moreIcon" :volumeIcon="volumeIcon" :duration="duration"
		 :isCircular="isCircular" padding="0"></u-notice-bar> -->
		<image class="icon" src="/static/images/icon_message.png"></image>
		<u-row-notice :color="color" :list="list" :volumeIcon="false" :moreIcon="false" :mode="mode" :fontSize="24" :speed="speed"
		 :playState="playState" padding="0 8rpx" @getMore="getMore" @close="close" @click="click" :customStyle="{
				background:'transparent',
				width:'558rpx'
			}"
		 class="notice"></u-row-notice>
		<view class="close" @tap="close">关闭</view>
	</view>

</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared'
		},
		props: {
			list: {
				type: Array,
				default: () => ['锦瑟无端五十弦，一弦一柱思华年', ]
			}
		},
		methods: {
			close() {
				this.$emit('close')
			},
			click() {
				this.$emit('click')
			}
		},
		data() {
			return {
				color: '#333333',
				show: true,
				autoplay: false,
				type: 'warning',
				mode: 'horizontal',
				playState: 'play',
				speed: 160,
				duration: 2000,
				moreIcon: false,
				volumeIcon: false,
				isCircular: true,
				current: 0,
			}
		},
	}
</script>

<style scoped lang="scss">
	.p-notice-bar {
		border: 2rpx solid #fff4dc;
		border-radius: 8rpx;
		width: 674rpx;
		height: 54rpx;
		margin: 0 auto;
		line-height: 54rpx;
		background: #fff9eb;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 12rpx;

		.notice {
			// width: 558rpx;
		}

		.icon {
			left: 12rpx;
			width: 24rpx;
			height: 24rpx;
			flex-shrink: 0;
		}

		.close {

			flex-shrink: 0;
			width: 64rpx;
			height: 28rpx;
			font-size: 20rpx;
			font-weight: 700;
			text-align: center;
			@include flex-c;
			@include borderHalfPxRound(#333333, 84rpx);
		}
	}
</style>
