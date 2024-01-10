<template>
	<view class="custom-checkbox" @tap.stop="change(!value)">
		<image :style="[cur.style,customStyle]"
			:src="`/static/images/check-box/${cur.img[value ? 'selected' : 'noSelect'] || 'checked'}.png`"
			class="custom-checkbox">
		</image>
		<view>
			<slot>{{ label }}</slot>
		</view>
	</view>
</template>

<script>
	const dict = {
		round: { // 圆形
			img: {
				noSelect: 'check',
				selected: 'checked'
			},
			style: {
				width: '26rpx',
				height: '26rpx',
			}
		},
		square: { // 方形
			img: {
				noSelect: 'check',
				selected: 'checked'
			},
			style: {
				width: '26rpx',
				height: '26rpx',
				borderRadius: '4rpx'
			}
		}
	}
	export default {
		options: {
			virtualHost: true
		},
		props: {
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
			type: { // checkbox类型
				type: String,
				validator(val) {
					return ['round', 'square'].indexOf(val) !== -1;
				},
				default: 'square'
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
		computed: {
			cur() {
				return dict[this.type]
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