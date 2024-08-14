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
			// #ifndef H5
				this.initBarInfo();
			// #endif
			this.onLocationChange()
			console.log('this.$utils', this.$utils)
			console.log('this.$apis', this.$apis)
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/components/uview-ui/index.scss';
	@import '@/components/custom-ui/index.scss';
	@import '@/common/styles/index.scss';

	page {
		background: #f8f8fb;
	}
</style>