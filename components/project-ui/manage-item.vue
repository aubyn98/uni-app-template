<template>
	<view class="project-manage-item radius" @tap.stop="$emit('click')">
		<view class="_top">
			<view class="_company-name-container">
				<image :style="[leftIconStyle]" class="_title-left-icon" :src="`/static/images/${titleLeftIcon}.png`"></image>
				<text class="_company-name">{{title}}</text>
			</view>
			<view class="_right-img-container" @tap.stop="$emit('right-icon-click')">
				<image :style="[rightIconStyle]" class="_title-right-icon" :src="`/static/images/${titleRightIcon}.png`"></image>
			</view>
		</view>
		<slot></slot>
		<view class="_bottom" :style="[bottomStyle]">
			<view class="_label-container">
				<slot name="bottom"></slot>
			</view>
			<c-tag :type="disabled ? 'info' : 'warning'" :text="disabled ? '当前禁用' : '正在启用'"></c-tag>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			bottomStyle: {
				type: Object,
				default: () => ({})
			},
			titleLeftIcon: {
				type: String,
				default: 'icon_unit'
			},
			leftIconStyle: {
				type: Object,
				default: () => ({})
			},
			titleRightIcon: {
				type: String,
				default: 'icon_arrow'
			},
			rightIconStyle: {
				type: Object,
				default: () => ({})
			},
			disabled: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.project-manage-item {
		width: 686rpx;
		min-height: 176rpx;
		padding: 32rpx 32rpx 20rpx;
		background: #ffffff;
		margin: 20rpx auto;

		&:first-child {
			margin-top: 24rpx;
		}

		._top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			._company-name-container {
				font-size: 0;
				line-height: 44rpx;

				._title-left-icon {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
					vertical-align: middle;
				}

				._company-name {
					width: 416rpx;
					font-size: 32rpx;
					font-weight: 700;
					color: #333333;
					vertical-align: middle;
				}
			}

			._right-img-container {
				width: 60rpx;
				text-align: right;
				font-size: 0;
			}

			._title-right-icon {
				width: 24rpx;
				height: 24rpx;
			}


		}

		._bottom {
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			._label-container {
				font-size: 0;
			}
		}

	}
</style>
