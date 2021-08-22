import {
	mapState,
} from 'vuex';
export default {
	computed: {
		...mapState(['userInfo', 'isLogin', 'acls', 'isManager'])
	}
}
