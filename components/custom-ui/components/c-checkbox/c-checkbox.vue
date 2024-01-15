<template>
	<view class="custom-checkbox" :style="[customStyle]" @tap.stop="change(!value)">
		<image :style="[{ width:size, height:size }, iconStyle]"
			:src="`${imagePath}${value ? checkedIcon : checkIcon}.png`" class="custom-checkbox">
		</image>
		<slot>
			<view v-if="label">
				{{ label }}
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		options: {
			virtualHost: true
		},
		props: {
			size: {
				type: String,
				default: '26rpx'
			},
			imagePath: {
				type: String,
				default: '/static/images/check-box/'
			},
			checkIcon: {
				type: String,
				default: 'check'
			},
			checkedIcon: {
				type: String,
				default: 'checked'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			label: {
				type: String
			},
			value: {
				type: Boolean,
				default: false
			}, // 双向绑定的值
			iconStyle: { // 自定义样式
				type: Object,
				default: () => ({})
			},
			customStyle: { // 自定义样式
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {

			}
		},
		methods: {
			change(val) {
				if (this.disabled) return
				this.$emit('input', val)
				this.$emit('change', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-checkbox {
		display: flex;
		align-items: center;

		image {
			margin-right: 10rpx;
		}
	}
</style>