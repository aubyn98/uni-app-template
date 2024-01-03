import {
	request
} from '@/common/utils'

/* export function get_code(opts) {
	return request.get('/common/sms/token').then(res => {
		request.get('/common/sms/send', {
			mobile: opts.mobile,
			random: res[1].data.data,
			token: md5(md5(res[1].data.data)),
		})
	})
}; */