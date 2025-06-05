<template>
	<view class="goods-list-item">
		<view class="goods-image">
			<image :src="source.image || DEFAULT_GOODS_IMG" lazy-load></image>
		</view>
		<view class="goods-info">
			<view class="goods-name">
				{{ source.name }}
			</view>
			<view class="goods-tag-list">
				<view class="goods-tag">{{ source.intro }}</view>
			</view>
			<view class="goods-price-list">
				<view class="goods-price">
					<text class="goods-price-sign">￥</text>
					<text>{{ source.price }}</text>
				</view>
				<view class="goods-original-price">￥{{ source.marketPrice }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		DEFAULT_GOODS_IMG
	} from '@/common/config'
	export default {
		options: {
			virtualHost: true
		},
		props: {
			source: {
				type: Object,
				default: () => ({})
			},
		},
		data() {
			return {

			}
		},
		computed: {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.goods-list-item {
		flex-shrink: 0;
		display: flex;

		.goods-image {
			flex-shrink: 0;
			position: relative;
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-info {
			width: 0;
			flex: 1;
			display: flex;
			flex-direction: column;
		}



		.goods-name {
			flex-shrink: 0;
			height: 70rpx;
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 8rpx;
			@include textLineClamp(2);
		}

		.goods-tag-list {
			flex-shrink: 0;
			font-size: 0;
			.goods-tag {
				display: inline-block;
				padding: 0 8rpx;
				height: 32rpx;
				line-height: 32rpx;
				background: #ffeeee;
				border-radius: 4rpx;
				font-size: 20rpx;
				color: #ff0000;
				margin-right: 8rpx;
				margin-bottom: 8rpx;
			}
		}

		.goods-price-list {
			flex-shrink: 0;
			height: 40rpx;
			line-height: 40rpx;
			display: flex;
			align-items: center;

			.goods-price {
				font-size: 28rpx;
				color: #ff0a0a;
			}

			.goods-price-sign {
				font-size: 18rpx;
			}

			.goods-original-price {
				margin-left: 4rpx;
				color: #aaaaaa;
				font-size: 20rpx;
				text-decoration: line-through;
			}
		}
	}
</style>