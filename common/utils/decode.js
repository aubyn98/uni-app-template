export default {
	encodeURIParams(params) {
		return encodeURIComponent(JSON.stringify(params || {}))
	},
	decodeURIParams(params) {
		return JSON.parse(decodeURIComponent(params || '{}'))
	}
}
