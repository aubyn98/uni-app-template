export const IS_DEV = process.env.NODE_ENV === 'development'

export const API_ADDRESS = Object.freeze({
	DEV: 'http://192.168.42.106:11081',
	PRO: 'https://mp.api.360hwj.com'
})

export const BASE_URL = API_ADDRESS[IS_DEV ? 'DEV' : 'PRO']

/** token的键名 */
export const TOKEN_KEY = 'x-fronted-token'

/** 支付方式 */
export const PAY_METHODS = Object.freeze({
	/** 微信支付(小程序) */
	WX_MINI: 'wexpayMiniAppPaymentPlugin',
	/** 货到付款  */
	CASH: 'cod',
})