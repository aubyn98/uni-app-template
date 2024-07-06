export default {
	namespaced: true,
	state() {
		return {
			isAuthorized: false,
			location: null
		}
	},
	mutations: {
		changeAuthorize(state, payload) {
			state.isAuthorized = payload
		},
		changeLocation(state, payload) {
			state.location = payload
		}
	},
	actions: {
		startLocationUpdate({
			commit
		}) {
			uni.startLocationUpdate({
				success() {
					commit('changeAuthorize', true)
				},
				fail() {
					commit('changeAuthorize', false)
				}
			})
		},
		stopLocationUpdate({
			commit
		}) {
			uni.stopLocationUpdate({
				success() {

				},
				fail() {

				}
			})
		},
		onLocationChange({
			commit
		}, fn) {
			uni.onLocationChange(function(res) {
				commit('changeLocation', res)
				typeof fn === 'function' && fn(res)
			})
		},
		offLocationChange() {
			uni.offLocationChange()
		}
	},
}
