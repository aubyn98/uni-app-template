<template>
	<view class="p-tabs">
		<!-- bar-width="138" -->
		<u-tabs font-size="32" bg-color="#fff" inactiveColor="#999999" :bold="bold" :active-color="activeColor" :list="getList" @change="change" bar-width="138" 
		 :current="current" :is-scroll="isScroll" :offset="offset" height="88" :bar-style="{height:'4rpx',bottom:'-4rpx'}" ></u-tabs>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared'
		},
		props: {
			list: {
				type: Array,
				default: () => [{
					name: '待审核',
					count: 4
				}, {
					name: '已启用',
					count: 1
				}, {
					name: '已禁用',
					count: 0
				}]
			},
		},
		computed: {
			getList() {
				let _ = this.list
				_.map(item => {
					item.name = `${item.name}(${item.count||0}) `
					delete item.count
				})
				return _
			}
		},
		data() {
			return {
				isScroll: false,
				current: 0,
				activeColor: '#FFCB45',
				control: true,
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.$emit('change-tabs', index)
			},
		}
	}
</script>

<style scoped lang="scss">
	.p-tabs {
		padding-bottom: 2rpx;

		/deep/ .u-tabs {
			box-shadow: 0px 2rpx 0px 0px #f0f0f0;
		}
	}
</style>
