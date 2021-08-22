<template>
	<image :style="[cur.style,customStyle]" :src="`/static/images/${cur.img[value ? 'selected' : 'noSelect'] || 'icon_selected'}.png`"
	 class="custom-checkbox" @tap.stop="change(!value)">
	</image>
</template>

<script>
	const dict = {
		round: { // 圆形
			img: {
				noSelect: 'icon_selected',
				selected: 'icon_selected2'
			},
			style: {
				width: '40rpx',
				height: '40rpx'
			}
		},
		square: { // 方形
			img: {
				noSelect: 'icon_chose',
				selected: 'icon_chose_acon'
			},
			style: {
				width: '28rpx',
				height: '28rpx',
				borderRadius: '4rpx'
			}
		}
	}
	export default {
		props: {
			value: {}, // 双向绑定的值
			type: { // checkbox类型
				type: String,
				validator(val) {
					return ['round', 'square'].indexOf(val) !== -1;
				},
				default: 'round'
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
				this.$emit('input', val)
				this.$emit('change', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-checkbox {}
</style>
