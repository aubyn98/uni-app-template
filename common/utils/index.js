export * from './export'
import * as utils from './export'
export default {
	install(app) {
		app.prototype.$utils = utils
	}
}