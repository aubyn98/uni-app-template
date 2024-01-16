<template>
	<c-fix-top-box :occupySpace="occupySpace" :otherHeight="otherHeight" :position="position" :zIndex="zIndex"
		:statusBar="false" background="transparent">
		<template #default="{ paddingX, paddingY, statusBarHeight, minHeight }">
			<view class="c-page-title" :class="classList" :style="[{ paddingTop: statusBarHeight, background }]">
				<view class="title-container" :style="[{ padding:`${paddingY} ${paddingX}`, minHeight },customStyle]">
					<view class="_left-container" @tap.stop="goBack" v-if="back">
						<image class="_left-icon" :style="imageStyle" :class="imageClass"
							:src="`${imagePath}icon_fh@2x.png`" mode="aspectFit"></image>
					</view>
					<view class="_left-container _left-home" @tap.stop="goHome" v-if="home">
						<image class="_left-icon" :style="imageStyle" :class="imageClass"
							:src="`${imagePath}icon_sy@2x.png`" mode="aspectFit"></image>
					</view>
					<slot name="title">
						<text :style="textStyle" :class="textClass">
							<slot>{{title}}</slot>
						</text>
					</slot>
				</view>
			</view>
			<slot name="other"></slot>
		</template>
	</c-fix-top-box>
</template>

<script>
	export default {
		props: {
			position: {
				type: String,
				default: 'fixed'
			},
			zIndex: {
				type: [String, Number],
				default: 10
			},
			// 是否开启占位
			occupySpace: {
				type: Boolean,
				default: true
			},
			title: String, // 标题
			customClass: { // 自定义类名
				type: String,
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
				type: String,
				default: ''
			},
			home: { // 是否显示图片
				type: Boolean,
				default: false
			},
			back: { // 是否显示图片
				type: Boolean,
				default: false
			},
			customBack: {
				type: Boolean,
				default: false
			},
			customHome: {
				type: Boolean,
				default: false
			},
			imageStyle: { // 自定义图片样式
				type: [String, Object],
				default: ''
			},
			imageClass: { // 自定义图片类名
				type: String,
				default: ''
			},
			imagePath: { // 图片路径
				type: String,
				default: '/static/images/title/'
			},
			bold: { // 是否加粗
				type: Boolean,
				default: true
			},
			background: {
				type: String,
				default: '#fff'
			},
			otherHeight: {
				type: String
			}
		},
		computed: {
			classList() {
				const classList = [];
				this.bold && classList.push('_bold');
				const customClass = this.customClass;
				if (typeof customClass === 'string') classList.push(customClass);
				if (typeof customClass === 'object') Object.keys(customClass).forEach(key => customClass[key] && classList
					.push(key));
				return classList;
			}
		},
		methods: {
			goBack() {
				if (this.customBack) this.$emit('goBack')
				else uni.navigateBack()
			},
			goHome() {
				if (this.customHome) this.$emit('goHome')
				else uni.switchTab({
					url: '/pages/home/home'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.custom-page-title-placeholder {
		flex-shrink: 0;
	}


	.c-page-title {
		width: 100%;

		&._bold {
			font-weight: 500;
		}
	}

	.title-container {
		text-align: center;
		height: 100%;
		position: relative;
		font-size: 32rpx;
		display: flex;
		align-items: center;



		._left-container {
			position: absolute;
			display: block;
			top: 50%;
			transform: translateY(-50%);
			left: 24rpx;
			width: 56rpx;
			height: 56rpx;
			font-size: 0;
			line-height: 56rpx;
		}

		._left-home {
			left: 104rpx;
		}

		._left-icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 12rpx;
			vertical-align: middle;
		}

		text {
			width: 100%;
			display: inline-block;
			line-height: 1;
			@include textLineClamp(1);
		}
	}

	.custom-page-title-bg {
		background: $color-primary !important;
	}
</style>