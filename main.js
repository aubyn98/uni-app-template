import Vue from 'vue'
import App from './App'
import store from '@/store'
import * as apis from '@/common/apis'
import * as utils from '@/common/utils'
import * as CONFIG from '@/common/config'
import customUI from '@/components/custom-ui'
import uview from '@/components/uview-ui';
import {
	global
} from '@/common/mixins'

Vue.prototype.$utils = utils
Vue.prototype.$apis = apis
Vue.prototype.$CONFIG = CONFIG
Vue.use(customUI).use(uview).mixin(global)


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()