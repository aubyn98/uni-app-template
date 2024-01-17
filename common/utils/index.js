export * from './export'
import * as utils from './export'

export default {
	install(app) {
		console.log(utils, 'utils')
		app.prototype.$utils = utils
	}
}