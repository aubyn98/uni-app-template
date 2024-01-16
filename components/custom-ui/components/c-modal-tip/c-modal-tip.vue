<template>
	<u-popup :show="show" :closeOnClickOverlay="closeOnClickOverlay" :safeAreaInsetBottom="false" @close="close"
		@closed="closed" mode="center" round="16rpx">
		<view class="c-modal-tip">
			<view v-if="options.showTitle" class="modal-tip-header">
				{{ options.title }}
			</view>
			<view class="modal-tip-content">
				{{ options.content }}
			</view>
			<c-button v-if="options.showConfirm" width="448rpx" size="small"
				@click="confirm">{{ options.confirmText }}</c-button>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				options: this.getOptions(),
				resolve: () => void 0,
				reject: () => void 0,
				closeOnClickOverlay: true
			}
		},
		created() {

		},
		onLoad() {

		},
		methods: {
			open(opts) {
				this.closeOnClickOverlay = true
				return new Promise((resolve, reject) => {
					this.options = this.getOptions(opts)
					this.show = true
					this.resolve = resolve
					this.reject = reject
				})
			},
			confirm() {
				this.closeOnClickOverlay = false
				const close = () => this.show = false
				if (this.options.asyncClose) {
					this.resolve(close)
					this.options.onConfirm(close)
				} else {
					close()
					this.resolve()
					this.options.onConfirm()
				}
			},
			getOptions(opts) {
				return {
					title: '提示',
					showTitle: true,
					content: '',
					showConfirm: true,
					confirmText: '确定',
					asyncClose: false,
					closeOnClickOverlay: true,
					onConfirm: () => void 0,
					onCancel: () => void 0,
					...opts
				}
			},
			close() {
				this.show = false
				this.reject('close')
				this.options.onCancel()
			},
			closed() {}
		}
	}
</script>

<style lang="scss" scoped>
	.c-modal-tip {
		width: 542rpx;
		padding: 40rpx 48rpx 56rpx;
		text-align: center;

		.modal-tip-header {
			height: 48rpx;
			line-height: 48rpx;
			font-size: 34rpx;
			color: #333333;
			margin-bottom: 24rpx;

		}

		.modal-tip-content {
			line-height: 44rpx;
			font-size: 26rpx;
			color: #666666;
			margin-bottom: 24rpx;
		}

		.modal-tip-button {}
	}
</style>