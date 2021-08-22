<template>
	<view class="staff-item">
		<view class="_select" @tap.stop="change" v-if="showSelectBox">
			<image src="/static/images/icon_selected.png" mode="" v-if="!itemData.checked"></image>
			<image src="/static/images/icon_selected2.png" mode="" v-else></image>
		</view>
		<view class="staff-item-content">
			<image :src="itemData.avatar" class="avatar" @tap.stop="toDetail"></image>
			<view class="_content" @tap.stop="toDetail">
				<view class="_content_t">
					<text class="_content_t_name color333">{{itemData.realname}}</text>
					<text class="_content_t_number color999">{{itemData.idcard}}</text>
				</view>
				<view class="_content_b">
					<view class="_content_b_often_box">
						<text class="_content_b_text color999">常去食堂</text>
						<text class="_content_b_often color333">{{itemData.canteenName}}</text>
					</view>
					<text class="_content_t_badge" :style="showRight && 'margin-right:30rpx'">{{itemData.roleTypeDesc}}</text>
				</view>
			</view>
			<view class="_right" v-if="showRight">
				<image src="/static/images/icon_arrow.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			showSelectBox: {
				type: Boolean,
				default: true
			},
			showRight: {
				type: Boolean,
				default: true
			},
			itemData: {
				type: Object,
				default: {}
			},
		},
		methods: {
			change() {
				this.$emit('input', !this.itemData.checked)
				// this.$emit('change',!this.itemData.checked)
			},
			toDetail() {
				this.$emit('toDetail', this.itemData)
			}
		}
	}
</script>

<style scoped lang="scss">
	.staff-item {
		margin: 0 24rpx;
		display: flex;
		align-items: center;
		font-weight: 500;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;

		._select {
			margin-left: 24rpx;
			width: 40rpx;
			height: 40rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.staff-item-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-height: 148rpx;
			padding-left: 20rpx;
			padding-right: 24rpx;
			flex: 1;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 8rpx;
				margin-right: 20rpx;
			}

			._content {
				width: 0;
				display: flex;
				flex: 1;
				flex-direction: column;
				margin-right: 4rpx;

				._content_t {
					margin-bottom: 18rpx;
					display: flex;
					align-items: center;



					._content_t_name {
						font-size: 30rpx;
						margin-right: 12rpx;
					}

					._content_t_number {
						font-size: 24rpx;
						@include textLineClamp(1);
						flex: 1;
					}
				}

				._content_b {
					display: flex;
					justify-content: space-between;
					align-items: center;

					._content_b_often_box {
						flex: 1;
						display: flex;
						align-items: center;

						._content_b_text {
							font-size: 24rpx;
							margin-right: 16rpx;
							flex-shrink: 0;
						}

						._content_b_often {
							font-size: 28rpx;
							@include textLineClamp(1);
							max-width: 240rpx;
						}
					}

					._content_t_badge {
						display: inline-block;
						padding: 0 10rpx;
						height: 32rpx;
						line-height: 32rpx;
						text-align: center;
						background: #ffcb45;
						border-radius: 50rpx;
						font-size: 20rpx;
					}
				}
			}

			.color999 {
				color: #999999;
			}

			.color333 {
				color: #333333;
			}

			._right {
				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
	}
</style>
