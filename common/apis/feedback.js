import {
	request,
	uploadFile
} from '@/common/utils'



export function post_feedback(params, opts) {
	return request.post('/fronted/submit/feedback', params, {}, opts)
}