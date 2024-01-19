export const IS_DEV = process.env.NODE_ENV === 'development'

export const API_ADDRESS = Object.freeze({
	DEV: 'http://192.168.42.106:11081',
	PRO: 'https://mp.api.360hwj.com'
})

export const BASE_URL = API_ADDRESS[IS_DEV ? 'DEV' : 'PRO']

/** token的键名 */
export const TOKEN_KEY = 'x-fronted-token'

/** 默认商品图片 */
export const DEFAULT_GOODS_IMG = 'http://image.360hwj.com/store/empty.png'

/** 配送类型 */
export const DELIVERY_TYPES = Object.freeze({
	/** 门店配送 */
	SEND: 'store_send',
	/** 门店自提 */
	TAKE: 'member_take'
})

/** 支付方式 */
export const PAY_METHODS = Object.freeze({
	/** 微信支付(小程序) */
	WX_MINI: 'wexpayMiniAppPaymentPlugin',
	/** 货到付款  */
	CASH: 'cod',
})

/** tabBar页面跳转键名 */
export const PAGE_JUMP_KEYS = Object.freeze({
	/** 跳转找药页面参数 存储缓存的键 */
	FIND_MEDICINE: 'jump-findMedicine',
})