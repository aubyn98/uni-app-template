<template>
	<u-popup :value="value" @input="$emit('input',$event)" mode="bottom" height="auto" safe-area-inset-bottom>
		<view class="p-action-sheet">
			<view class="_action-sheet-item" v-for="item in list" :key="item.text" @tap.click="actionClick(item)">
				<image v-if="item.image" :src="`/static/images/${item.image}.png`"></image>
				<text>{{item.text}}</text>
			</view>
			<view class="_cancel" @tap.stop="cancel">
				取消
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			value: { // 双向绑定 是否显示
				type: Boolean
			},
			list: { // 动作列表
				type: Array,
				default: () => []
			}
		},
		methods: {
			actionClick(item) {
				this.$emit('action-click', item)
				this.close()
			},
			cancel() {
				this.close()
				this.$emit('cancel')
			},
			close() {
				this.$emit('input', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.p-action-sheet {
		background: #f8f8f8;
		text-align: center;
		color: #333333;
		font-size: 32rpx;
		font-weight: 500;

		._action-sheet-item {
			line-height: 96rpx;
			background-color: white;

			text,
			image {
				line-height: 1;
				vertical-align: middle;
			}

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 14rpx;
			}
		}

		._cancel {
			margin-top: 20rpx;
			line-height: 88rpx;
			background-color: white;
		}
	}
</style>
