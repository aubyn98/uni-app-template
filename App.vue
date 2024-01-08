<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		methods: {
			...mapMutations('statusBar', ['initBarInfo']),
			...mapActions('location', ['onLocationChange'])
		},
		onLaunch: function() {
			this.initBarInfo();
			this.onLocationChange()

			console.log(this.$utils);
			console.log(this.$api);
			console.log(this.$request);
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/components/uview-ui/index.scss';
	@import '@/components/custom-ui/index.scss';
	@import '@/common/styles/index.scss';

	page {
		background-color: #f8f8f8;
		@include safe-padding-bottom(1px);
	}
</style>