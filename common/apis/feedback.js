import {
	request,
	uploadFile
} from '@/common/utils'

// 图片上传
export function file_common_upload(params) {
	return uploadFile('/common/file/common/upload', params, {
		'user': 'test'
	})
}

export function post_feedback(params, opts) {
	return request.post('/fronted/submit/feedback', params, {}, opts)
}