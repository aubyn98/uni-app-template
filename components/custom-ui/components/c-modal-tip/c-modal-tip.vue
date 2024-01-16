<template>
	<u-popup :show="show" :closeOnClickOverlay="options.closeOnClickOverlay" :safeAreaInsetBottom="false" @close="close"
		@closed="closed" mode="center" round="16rpx">
		<view class="c-modal-tip">
			<view v-if="options.showTitle" class="modal-tip-header">
				{{ options.title }}
			</view>
			<view class="modal-tip-content">
				{{ options.content }}
			</view>
			<c-button v-if="options.showConfirm" width="448rpx" size="small" @click="confirm"
				:text="options.confirmText" />
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			closeOnClickOverlay: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: '提示'
			},
			showTitle: {
				type: Boolean,
				default: true
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			showConfirm: {
				type: Boolean,
				default: true
			},
			content: {
				type: String,
				default: ''
			},
			asyncClose: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				show: false,
				options: this.getOptions(),
				resolve: () => void 0,
				reject: () => void 0,
			}
		},
		methods: {
			open(opts, config) {
				return new Promise((resolve, reject) => {
					this.options = this.getOptions(opts, config)
					console.log(this.options)
					this.show = true
					this.resolve = resolve
					this.reject = reject
				})
			},
			confirmRes(res) {
				this.resolve(res)
				this.options.onConfirm(res)
			},
			confirm() {
				const close = () => this.show = false
				if (this.options.asyncClose) {
					this.confirmRes(close)
				} else {
					close()
					this.confirmRes()
				}
			},
			getOptions(opts, config) {
				if (typeof config !== 'object') config = {}
				if (typeof opts !== 'object') {
					opts = {
						content: opts
					}
				}
				return {
					title: this.title,
					showTitle: this.showTitle,
					showConfirm: this.showConfirm,
					confirmText: this.confirmText,
					content: this.content,
					asyncClose: this.asyncClose,
					closeOnClickOverlay: this.closeOnClickOverlay,
					onConfirm: (e) => this.$emit('confirm', e),
					onCancel: (e) => this.$emit('cancel', e),
					...opts,
					...config
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