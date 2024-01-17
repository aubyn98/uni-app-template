import {
	request,
	uploadFile
} from '@/common/utils'

// 图片上传
export function file_common_upload(params, opts) {
	return uploadFile('/common/file/common/upload', params, {}, {
		'user': 'test',
		...opts
	})
}