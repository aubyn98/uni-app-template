<template>
	<u-popup :show="show" :closeOnClickOverlay="options.closeOnClickOverlay" :overlayStyle="options.overlayStyle"
		:safeAreaInsetBottom="false" @close="close" @closed="closed" mode="center" round="16rpx">
		<slot name="container">
			<view class="c-modal">
				<slot name="title">
					<view v-if="options.showTitle" class="c-modal-header">
						{{ options.title }}
					</view>
				</slot>
				<view class="c-modal-content">
					<slot>
						{{ options.content }}
					</slot>
				</view>
				<slot name="footer">
					<view class="c-modal-footer">
						<c-button v-if="options.showConfirm" size="small" @click="confirm"
							:text="options.confirmText" />
					</view>
				</slot>
			</view>
		</slot>
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
			overlayStyle: {
				type: Object,
				default: () => ({})
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
					this.show = true
					this.resolve = resolve
					this.reject = reject
				})
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
					overlayStyle: this.overlayStyle,
					closeOnClickOverlay: this.closeOnClickOverlay,
					onConfirm: (e) => this.$emit('confirm', e),
					onCancel: (e) => this.$emit('cancel', e),
					...opts,
					...config
				}
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
			cancel() {
				this._closeHandle('cancel')
			},
			close() {
				this._closeHandle('close')
			},
			_closeHandle(code) {
				this.show = false
				this.reject(code)
				this.options.onCancel(code)
			},
			closed() {}
		}
	}
</script>

<style lang="scss" scoped>
	.c-modal {
		width: 542rpx;
		padding: 48rpx;
		text-align: center;

		.c-modal-header {
			height: 48rpx;
			line-height: 48rpx;
			font-size: 34rpx;
			color: #333333;
			margin-bottom: 32rpx;

		}

		.c-modal-content {
			line-height: 44rpx;
			font-size: 26rpx;
			color: #666666;
			margin-bottom: 32rpx;
		}

		.c-modal-footer {}
	}
</style>