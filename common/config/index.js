export const Dev = {
	baseURL: 'http://192.168.42.106:11081'
	// baseURL: 'https://mp.api.360hwj.com'
}

export const Pro = {
	baseURL: 'https://mp.api.360hwj.com',
}

export const ENUMS = Object.freeze({
	/** token的键名 */
	TOKEN_KEY: 'x-fronted-token',
})

export default process.env.NODE_ENV === 'development' ? Dev : Pro