<template>
	<view class="custom-cell" @tap.stop="$emit('click')" :style="[{'background-color':bgColor,'min-height':height,width},customStyle]"
	 :class="[{'border-bottom':borderBottom,'border-top':borderTop,_bold:bold,_line:line,_fullBorder:fullBorder}]">
		<view class="_cell-left" :style="[leftFontSize ? {fontSize:leftFontSize} : {}]" @tap="$emit('cell-left-click')">
			<slot></slot>
		</view>
		<view class="_cell-right" :style="[rightFontSize ? {fontSize:rightFontSize} : {}]" @tap="$emit('cell-right-click')">
			<slot name="right"></slot>
		</view>
		<view class="_line" v-if="line"></view>
	</view>
</template>

<script>
	export default {
		props: {
			customStyle: { // 自定义样式
				type: Object,
				default: () => ({})
			},
			width: { // cell宽度
				type: String,
				default: '686rpx'
			},
			height: { // cell高度
				type: String,
				default: '100rpx'
			},
			leftFontSize: { // 左边的文字大小
				type: String,
				default: ''
			},
			rightFontSize: { // 右边的文字大小
				type: String,
				default: ''
			},
			bgColor: { // 背景颜色
				type: String,
				default: 'transparent'
			},
			fullBorder: { // 边框是否与宽度相等
				type: Boolean,
				default: false
			},
			borderBottom: { // 是否有下边框
				type: Boolean,
				default: true
			},
			borderTop: { // 是否有上边框
				type: Boolean,
				default: false
			},
			bold: { // 是否加粗字体
				type: Boolean,
				default: false
			},
			line: { // 是否有左边的黄线
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../theme.scss';

	.custom-cell {
		margin: 0 auto;
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #999999;
		font-weight: 500;
		position: relative;
		font-size: 30rpx;

		._line {
			width: 8rpx;
			height: 36rpx;
			background: $warning-color;
			border-radius: 8rpx;
			position: absolute;
			left: 4rpx;
			top: 50%;
			transform: translateY(-50%);
		}

		&.border-top,
		&.border-bottom {

			&::before,
			&::after {
				display: block;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 622rpx;
				height: 1px;
				background: #f0f0f0;
			}
		}

		&._fullBorder {

			&::before,
			&::after {
				left: 0;
				transform: translateX(0);
				width: 100%;
				height: 1px;
			}
		}

		&.border-top {
			&::before {
				content: '';
				top: 0;
			}
		}

		&.border-bottom {

			&::after {
				content: '';
				bottom: 0;
			}
		}

		&._bold {
			font-weight: 700;
			color: #333333;

			._cell-left {
				font-size: 32rpx;
			}
		}

		&._line {
			._cell-left {
				font-size: 36rpx;
			}
		}

		._cell-left,
		._cell-right {
			display: flex;
			align-items: center;
		}

		._cell-left {
			flex-shrink: 0;
			justify-content: flex-start;

		}

		._cell-right {
			flex: 1;
			justify-content: flex-end;
		}
	}
</style>
