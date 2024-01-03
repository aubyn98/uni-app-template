import {
	request
} from '@/common/utils'


export function POST_FEEDBACK(params) {
	return request.post('/fronted/submit/feedback', params)

}