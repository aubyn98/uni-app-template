<template>
	<u-popup :show="show" :closeOnClickOverlay="options.closeOnClickOverlay" @close="close" @closed="closed"
		mode="center" round="16rpx" :safeAreaInsetBottom="false" :z-index="options.zIndex"
		:overlayStyle="options.overlayStyle">
		<view class="c-modal-input-wrapper">
			<view class="c-model-title" v-if="options.showTitle">{{ options.title }}</view>
			<view class="c-model-input">
				<slot :options="options" :focus="focus" :confirm="confirm">
					<input ref="input" :type="options.type" :focus="focus" :value="options.value" @input="onInput"
						:placeholder="options.placeholder" @confirm="confirm" />
				</slot>
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
			type: {
				type: String,
				default: 'text',
				validator(v) {
					return ['text', 'number', 'idcard', 'digit', 'safe-password', 'nickname'].includes(v)
				}
			},
			zIndex: {
				type: [Number, String],
				default: 10075
			},
			title: {
				type: String,
				default: ''
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
			placeholder: {
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
				focus: false,
				show: false,
				options: this.getOptions(),
				resolve: () => void 0,
				reject: () => void 0,
			}
		},
		watch: {
			show(v) {
				this.focus = false
				if (v) {
					setTimeout(() => {
						this.focus = true
					}, 500)
				}
			}
		},
		methods: {
			onInput(e) {
				this.options.value = e.detail.value
			},
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
						value: opts || (opts === 0 ? 0 : '')
					}
				}
				return {
					title: this.title,
					showTitle: this.showTitle,
					confirmText: this.confirmText,
					showConfirm: this.showConfirm,
					zIndex: this.zIndex,
					overlayStyle: this.overlayStyle,
					placeholder: this.placeholder,
					type: this.type,
					asyncClose: this.asyncClose,
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
				const res = {
					value: this.options.value
				}
				if (this.options.asyncClose) {
					res.close = close
					this.confirmRes(res)
				} else {
					close()
					this.confirmRes(res)
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
<style lang="scss">
	.c-model-input {

		input {
			min-height: 68rpx;
			height: 68rpx;
			line-height: 68rpx;
			border: none;
			font-size: 28rpx;
			color: #333;

			&::placeholder {
				background: #b2b2b2;
				color: #b2b2b2;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.c-modal-input-wrapper {
		width: 542rpx;
		height: 332rpx;
		padding: 40rpx 48rpx 56rpx;

		.c-model-title {
			height: 44rpx;
			line-height: 44rpx;
			font-size: 32rpx;
			color: #333333;
			text-align: center;
			margin-bottom: 24rpx;
		}

		.c-model-input {
			width: 448rpx;
			border: 2rpx solid #f0f0f0;
			border-radius: 4rpx;
			padding: 0 20rpx;
			margin-bottom: 24rpx;
			height: 72rpx;
		}

	}
</style>