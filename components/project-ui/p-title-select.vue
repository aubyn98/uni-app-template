<template>
	<view class="p-title-select">
		<c-page-title image @go="$emit('go')">
			<template #title>
				<view class="_title-select" @tap.stop="!disabled && titleClick()" :style="type=='left'&& getStyle" v-if="value">
					<text :class="{'_title-text':type=='left'}">{{value}}</text>
					<image src="/static/images/icon_three.png" v-if="!disabled"></image>
				</view>
			</template>
		</c-page-title>
		<u-select :label-name="labelName" :value-name="valueName" :default-value="[index]" v-model="show" confirm-color="#ffcb45"
		 cancel-color="#aaaaaa" mode="single-column" :list="list" @confirm="confirm">
		</u-select>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		props: {
			value: { // 双向绑定
				type: String,
			},
			labelName: { // select项名称的键名
				type: String,
				default: 'name'
			},
			valueName: { // select项值的键名
				type: String,
				default: 'id'
			},
			list: { // 列表
				type: Array,
				default: () => ([])
			},
			type: {
				type: String,
				default: ''
			},
			disabled: { // 是否禁用
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapState('statusBar', ['MenuButton']),
			getStyle() {
				let w = this.MenuButton.left - 42 - 16
				let h = this.MenuButton.height
				return `display: flex;align-items: center;width: ${w}px;margin-left:42px;line-height:${h}px;height:${h}px`
			}
		},
		data() {
			return {
				show: false,
				index: 0
			}
		},
		methods: {
			// 点击标题显示select 弹窗
			titleClick() {
				this.show = true
				this.$emit('click')
			},
			// 确认
			confirm(e) {
				if (!e || !e.length) return
				this.show = false;
				this.index = this.list.findIndex(it => e[0].value === it[this.valueName])
				this.$emit('change', e[0], this.list[this.index]);
				this.$emit('input', e[0].label);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.p-title-select {
		._title-select {
			font-size: 0;
			width: fit-content;
			margin: 0 auto;

			image {
				width: 16rpx;
				height: 16rpx;
				margin-left: 16rpx;
				vertical-align: middle;
				flex-shrink: 0;
			}

			text {
				font-size: 34rpx;
				line-height: 1;
				display: inline-block;
				vertical-align: middle;
			}

			._title-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
