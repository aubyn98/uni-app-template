<template>
	<u-popup :show="show" :closeOnClickOverlay="options.closeOnClickOverlay" :overlayStyle="options.overlayStyle"
		:z-index="options.zIndex" :safeAreaInsetBottom="false" @close="close" @closed="closed" mode="center"
		round="16rpx">
		<slot name="container" :options="options">
			<view class="c-modal">
				<slot name="title" :options="options">
					<view v-if="options.showTitle" class="c-modal-header">
						{{ options.title }}
					</view>
				</slot>
				<slot name="content" :options="options">
					<view class="c-modal-content">
						<slot :options="options">
							{{ options.content }}
						</slot>
					</view>
				</slot>
				<slot name="footer" :options="options">
					<view class="c-modal-footer">
						<slot name="cancel" :options="options">
							<c-button v-if="options.showCancel" width="100%" :text="options.cancelText" size="small"
								type="info" plain @click="cancel" />
						</slot>
						<slot name="confirm" :options="options">
							<c-button v-if="options.showConfirm" :text="options.confirmText" size="small"
								@click="confirm" />
						</slot>
					</view>
				</slot>
			</view>
		</slot>
	</u-popup>
</template>

<script>
	export default {
		props: {
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
			cancelText: {
				type: String,
				default: '取消'
			},
			showCancel: {
				type: Boolean,
				default: true
			},
			zIndex: {
				type: [Number, String],
				default: 10075
			},
			overlayStyle: {
				type: Object,
				default: () => ({})
			},
			closeOnClickOverlay: {
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
					this.show = true
					this.resolve = resolve
					this.reject = reject
				})
			},
			getOptions(opts, config) {
				if (typeof config !== 'object') config = {}
				if (opts && typeof opts !== 'object') {
					opts = {
						content: opts
					}
				}
				return {
					title: this.title,
					showTitle: this.showTitle,
					confirmText: this.confirmText,
					showConfirm: this.showConfirm,
					cancelText: this.cancelText,
					showCancel: this.showCancel,
					zIndex: this.zIndex,
					overlayStyle: this.overlayStyle,
					closeOnClickOverlay: this.closeOnClickOverlay,
					content: this.content,
					asyncClose: this.asyncClose,
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
<style>
	.c-modal-button {
		flex: 1;
	}
</style>
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

		.c-modal-footer {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 48rpx;
		}
	}
</style>