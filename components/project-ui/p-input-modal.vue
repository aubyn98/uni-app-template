<template>
	<u-popup :value="value" @input="$emit('input',$event)" mode="center" :width="width" :height="height" border-radius="16"
	 :zoom="false" safe-area-inset-bottom>
		<view class="p-input-modal" >
			<view class="_input-modal-title">
				{{title}}
			</view>
			<input class="_input" type="text" v-model="cacheVal" @input="input" :placeholder="placeholder" placeholder-class="_placeholder-class"  v-if="hasInput"/>
			<view class="_operation-container">
				<c-button type="info" :text-style="{color:cancelColor}" :bold="false" plain size="mini" @click="cancel">{{cancelText}}</c-button>
				<c-button size="mini" :text-style="{color:confirmColor}" :bold="false" @click="confirm">{{confirmText}}</c-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			customStyle: {
				type: Object,
				default: () => ({})
			},
			hasInput:{
				type: Boolean,
				default:true
			},
			width:{
				type: String,
				default:'604rpx'
			},
			height:{
				type: String,
				default:'356rpx'
			},
			
			value: {
				type: Boolean
			},
			inputValue: {
				type: [String, Number],
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			cancelColor: {
				type: String,
				default: '#999999'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			confirmColor: {
				type: String,
				default: '#333333'
			},
		},
		data() {
			return {
				cacheVal: ''
			}
		},
		watch: {
			value(v) {
				if (v) this.cacheVal = this.inputValue
			}
		},
		methods: {
			input(e) {
				this.cacheVal = e.detail.value
			},
			close() {
				this.$emit('input', false)
			},
			confirm() {
				this.close()
				this.$emit('confirm', this.cacheVal)
				this.cacheVal = ''
			},
			cancel() {
				this.close()
				this.$emit('cancel')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.p-input-modal {
		width: 100%;
		height: 100%;
		padding: 32rpx 44rpx;
		color: #333333;
		font-weight: 700;

		._input-modal-title {
			margin: 0 auto 36rpx;
			height: 44rpx;
			line-height: 44rpx;
			font-size: 32rpx;
			text-align: center;
		}

		._input {
			margin: 0 auto 32rpx;
			box-sizing: border-box;
			height: 82rpx;
			line-height: 42rpx;
			padding: 20rpx;
			background: #fafafa;
			border-radius: 8rpx;
			font-size: 30rpx;
			font-weight: 500;
		}

		._placeholder-class {
			color: #B2B2B2;
		}

		._operation-container {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
