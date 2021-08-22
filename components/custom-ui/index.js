import mixins from './lib/mixins'
export default {
	install(Vue) {
		Object.values(mixins).forEach(item => Vue.mixin(item))
	}
}
