<template>
	<u-popup :show="show" :closeOnClickOverlay="closeOnClickOverlay" @close="close" @closed="closed" mode="center"
		round="16rpx" :safeAreaInsetBottom="false" :z-index="options.zIndex" :overlayStyle="options.overlayStyle">
		<view class="c-modal-input-wrapper">
			<view class="c-model-title" v-if="options.showTitle">{{ options.title }}</view>
			<view class="c-model-input">
				<slot :options="options" :focus="focus" :confirm="confirm">
					<input ref="input" :type="options.type" :focus="focus" :value="options.value" @input="onInput"
						:placeholder="options.placeholder" @confirm="confirm" />
				</slot>
			</view>
			<view v-if="options.showConfirm" class="c-modal-input-confirm" @click="confirm">
				{{ options.confirmText }}
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				focus: false,
				show: false,
				options: this.getOptions(),
				resolve: () => void 0,
				reject: () => void 0,
				closeOnClickOverlay: true
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
		computed: {

		},
		methods: {
			onInput(e) {
				this.options.value = e.detail.value
			},
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
				const res = {
					value: this.options.value
				}
				if (this.options.asyncClose) {
					res.close = close
					this.resolve(res)
					this.options.onConfirm(res)
				} else {
					close()
					this.resolve(res)
					this.options.onConfirm(res)
				}
			},
			getOptions(opts) {
				return {
					title: '',
					showTitle: true,
					confirmText: '确定',
					showConfirm: true,
					zIndex: 10075,
					overlayStyle: {},
					value: '',
					placeholder: '',
					type: 'text', // 'text', 'number', 'idcard', 'digit', 'safe-password', 'nickname'
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

		.c-modal-input-confirm {
			width: 448rpx;
			height: 72rpx;
			line-height: 72rpx;
			background: $color-primary;
			border-radius: 44rpx;


			font-size: 28rpx;
			text-align: center;
			color: #ffffff;
		}
	}
</style>