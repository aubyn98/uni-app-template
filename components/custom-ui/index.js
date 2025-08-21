import mixins from './libs/mixins'
export default {
	install(Vue) {
		Object.values(mixins).forEach(item => Vue.mixin(item))
	}
}
