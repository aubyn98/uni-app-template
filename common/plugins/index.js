import apis from '../apis'
import utils from '../utils'
import customUI from '@/components/custom-ui'
import uview from '@/components/uview-ui';
import {
	global
} from '../mixins'
export default {
	install(app) {
		const plugins = require.context('./', true, /\.js$/)
		plugins.keys().forEach(pluginPath => {
			// const pluginName = pluginPath.match(/.*\/(.*)\.js$/)[1]
			if (pluginPath !== './index.js') {
				plugins(pluginPath).default(app)
			}
		})
		app.use(apis).use(utils).use(customUI).use(uview)
		app.mixin(global)
	},
}
