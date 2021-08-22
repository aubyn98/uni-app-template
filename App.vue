<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['logined']),
			...mapMutations('statusBar', ['initBarInfo']),
			...mapActions('location', ['onLocationChange'])
		},
		onLaunch: function() {
			this.initBarInfo();
			this.logined()
			this.onLocationChange()
			// uni.clearStorageSync()
			// uni.setStorageSync('openid','o039Xs39BBKNuxZSbO2WtKd-bCaU')
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/components/uview-ui/index.scss';
	@import '@/components/custom-ui/index.scss';
	@import '@/common/styles/common.scss';

	page {
		background-color: #f8f8f8;
		@include safe-padding-bottom;

		.meal-release-record,
		.manage-company,
		.release-record-edit,
		.manage-canteen,
		.meal-subscribe {
			padding-bottom: 60rpx;
		}

		// >view {
		// 	padding: 0 0 150rpx 0;
		// }
	}
</style>
