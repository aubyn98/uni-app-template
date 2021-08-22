<template>
	<view class="p-eat-item" :style="[customStyle]">
		<c-cell bold :line="line" bgColor="white" :customStyle="{margin:'0',paddingRight:0,width:'100%',paddingLeft:line==false && '0'}">
			{{title}}
			<template #right>
				<view class="time" v-if="subscribe.mealTime">
					<image src="/static/images/icon_dining.png"></image>
					<text>用餐时间:</text>
					<text style="position: relative;margin-left: 2rpx;">{{subscribe.mealTime}}</text>
				</view>
			</template>
		</c-cell>
		<slot name="content">
		</slot>
		<view class="eat-list" :style="[bottomStyle]">
			<c-tag class="item" plain :bold="false" v-for="item in list">{{item}}</c-tag>
		</view>
		<slot name="bottom"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			customStyle: {
				type: Object,
				default: () => ({})
			},
			bottomStyle: {
				type: Object,
				default: () => ({})
			},
			line: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
			},
			time: {
				type: String,
			},
			list: {
				type: Array,
			},
			subscribe: {
				type: Object,
				default: () => ({})
			}

		},
		data() {
			return {}
		}
	}
</script>

<style scoped lang="scss">
	.p-eat-item {
		width: 686rpx;
		background-color: #fff;
		margin: 0 auto;
		padding: 0 28rpx;
		border-radius: 28rpx;
		padding-bottom: 31rpx;

		.time {
			display: flex;
			align-items: center;
			font-weight: 400;
			color: #666666;
			font-size: 26rpx;

			image {
				width: 26rpx;
				height: 26rpx;
				margin-right: 10rpx;
			}
		}

		.eat-list {
			overflow: hidden;
			padding-top: 28rpx;

			.item {
				float: left;
				white-space: nowrap;
				margin-right: 22rpx;
				margin-bottom: 28rpx;
			}
		}
	}
</style>
