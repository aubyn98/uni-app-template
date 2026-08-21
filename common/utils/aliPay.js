import {
	get_payment_order_params,
	get_payment_charge_params,
	get_order_supplement_payment_params
} from '@/common/apis';
import {
	alipaySubmit
} from 'utils-uniapp'

const PAYMENT_PARAM_APIS = {
	'order/payment/order/params': get_payment_order_params,
	'order/payment/charge/params': get_payment_charge_params,
	'order/orderSupplement/payment/params': get_order_supplement_payment_params
};

export function aliPay(opts) {
	const type = opts.type || 'pay' //pay,charge
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '请稍候...'
		});
		return PAYMENT_PARAM_APIS[opts.url](opts.data).then(body => {
			let data = body.data;
			delete data.alipayUrl
			alipaySubmit(data, {
				type
			})
			uni.hideLoading()
		}).catch(e => {
			uni.hideLoading()
		})
	})
}