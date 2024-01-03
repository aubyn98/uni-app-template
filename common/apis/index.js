import {
	request
} from '@/common/utils'
let apis = require.context('./', true, /\.js$/)
apis = apis.keys().reduce((total, apiPath) => {
	// const apiName = apiPath.match(/.*\/(.*)\.js$/)[1]
	if (apiPath !== './index.js') {
		return { ...total,
			...apis(apiPath)
		}
	}
	return total
}, {})
module.exports = {
	install(app) {
		console.log(request)
		app.prototype.$api = apis
		app.prototype.$request = request
	},
	...apis,
}
