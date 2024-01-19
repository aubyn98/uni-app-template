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
	/** 门店配送 */
	STORE_SEND: 'store_send',
	/** 门店自提 */
	MEMBER_TAKE: 'member_take',
	/** 微信支付(小程序) */
	PAY_WX_MINI: 'wexpayMiniAppPaymentPlugin',
	/** 货到付款  */
	PAY_CASH: 'cod',
	/** 跳转找药页面参数 存储缓存的键 */
	JUMP_FIND_MEDICINE_KEY: 'jump-findMedicine'
})

export const defaultGoodsImg = "http://image.360hwj.com/store/empty.png";

export default process.env.NODE_ENV === 'development' ? Dev : Pro