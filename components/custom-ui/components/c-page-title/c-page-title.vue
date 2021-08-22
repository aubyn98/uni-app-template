<template>
	<view class="custom-page-title-placeholder" :style="{height:titleHeight+'px'}">
		<view id="_custom-page-title" class="custom-page-title" :class="classList" :style="[getStyle]">
			<view class="title-container" :style="{'min-height':getStyle['min-height']}">
				<view class="_left-container"  @tap.stop="$emit('go')">
					<image class="_left-icon" :style="imageStyle" :class="imageClass" v-if="image" :src="`${imagePath}icon_fh.png`"
					 mode="aspectFit"></image>
				</view>
				<slot name="title">
					<text :style="textStyle" :class="textClass">
						<slot>{{title}}</slot>
					</text>
				</slot>
			</view>
			<slot name="other"></slot>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			title: String, // 标题
			customClass: { // 自定义类名
				type: [String, Object],
				default: ''
			},
			customStyle: { // 自定义样式
				type: Object,
				default: () => ({})
			},
			textStyle: { // 自定义字体样式
				type: [String, Object],
				default: ''
			},
			textClass: { // 自定义字体类目
				type: [String, Object],
				default: ''
			},
			image: { // 是否显示图片
				type: Boolean,
				default: false
			},
			imageStyle: { // 自定义图片样式
				type: [String, Object],
				default: ''
			},
			imageClass: { // 自定义图片类名
				type: [String, Object],
				default: ''
			},
			imagePath: { // 图片路径
				type: String,
				default: '/static/images/'
			},
			bold: { // 是否加粗
				type: Boolean,
				default: true
			}
		},
		computed: {
			...mapState('statusBar', ['statusBarHeight', 'MenuButton', 'titleHeight']),
			getStyle() {
				const statusBarHeight = this.statusBarHeight;
				const MenuButton = this.MenuButton;
				return {
					'padding-top': statusBarHeight + MenuButton.marginTop + 'px',
					'min-height': MenuButton.height + 'px',
					'line-height': MenuButton.height + 'px',
					...this.customStyle
				};
			},
			classList() {
				const classList = [];
				this.bold && classList.push('_bold');
				const customClass = this.customClass;
				if (typeof customClass === 'string') classList.push(customClass);
				if (typeof customClass === 'object') Object.keys(customClass).forEach(key => customClass[key] && classList.push(key));
				return classList;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.custom-page-title-placeholder {
		flex-shrink: 0;
	}

	.custom-page-title {
		position: fixed;
		z-index: 9001;
		top: 0;
		left: 0;
		right: 0;
		padding-bottom: 6px;
		box-sizing: content-box;
		text-align: center;
		font-size: 0;
		font-weight: 500;
		color: #333333;
		background-color: white;
		transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

		&._bold {
			font-weight: 700;
		}

		.title-container {
			width: 100%;
			position: relative;
			font-size: 36rpx;
			._left-container{
				position: absolute;
				display: block;
				top: 50%;
				transform: translateY(-50%);
				left: 28rpx;
				width: 56rpx;
				height: 56rpx;
				font-size: 0;
				line-height: 56rpx;
			}
			._left-icon {
				width: 28rpx;
				height: 28rpx;
				margin-right: 12rpx;
				vertical-align: middle;
			}

			text {
				// vertical-align: middle;
				display: inline-block;
				line-height: 1;
			}
		}
	}
</style>
