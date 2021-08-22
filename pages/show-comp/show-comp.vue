<template>
	<view>
		<c-button image="icon_scanning" @click="testhandle" :throttleTime="500">扫码核销</c-button>
		<c-button type="info" image="icon_timeout" disabled>核销时间已过</c-button>
		<c-button type="success" image="icon_timeout">核销成功</c-button>
		<c-button type="danger" image="icon_down-1">取消预约</c-button>
		<c-button type="info" image="icon_timeout" disabled>预约时间已过</c-button>
		<c-button size="big" image="icon_wechat">微信授权一键登录</c-button>
		<c-button size="middle">提交信息</c-button>
		<view style="display:flex;justify-content: space-around;">
			<c-button type="info" plain size="smallest">禁用员工</c-button>
			<c-button size="small">设置权限</c-button>
		</view>
		<view style="display:flex;justify-content: space-around;">
			<c-button type="info" :bold="false" plain size="mini">取消</c-button>
			<c-button size="mini" :bold="false">添加</c-button>
		</view>
		<c-button size="search">搜索</c-button>
		<c-button size="add" image="icon_add">添加</c-button>
		<c-button size="large">保存公司信息</c-button>
		<c-button size="large">保存</c-button>
		<c-button size="large">发布</c-button>
	</view>
</template>

<script>
export default {
	created() {
		console.log(this.$utils);
		console.log(this.$api);
		console.log(this.$request);
	},
	methods: {
		testhandle(e){
			console.log(55)
		}
	}
};
</script>

<style lang="scss">
.custom-button {
	margin: 12px auto;
}
</style>
