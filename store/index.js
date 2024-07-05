import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import {
	getLocation,
	pick
} from '@/common/utils'
import * as apis from '@/common/apis'

Vue.use(Vuex)


export default new Vuex.Store({
	modules,
	state: {},
	getters: {
		hasLogin(state, getters) {
			return getters['user/hasLogin']
		}
	},
	mutations: {

	},
	actions: {

	},
})