export const $fs = wx.getFileSystemManager();
/* const encodingList = ['ascii', 'base64', 'binary', 'hex', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'utf-8', 'utf8',
	'latin1'
]
 */
export function writeFile({
	filePath,
	data,
	encoding,
	sync
}) {
	encoding = encoding || 'binary'
	typeof sync === 'undefined' && (sync = true);
	if (sync === true) {
		try {
			$fs.writeFileSync(filePath, data, encoding)
			return {
				tempFilePath: filePath,
				unlink: () => $fs.unlinkSync(filePath)
			}
		} catch (e) {
			console.error(e)
			return {}
		}
	}
	return new Promise(function(resolve, reject) {
		$fs.writeFile({
			filePath,
			encoding,
			data,
			success(res) {
				if (res.errMsg !== 'writeFile:ok') return reject(new Error(res.errMsg))
				resolve({
					tempFilePath: filePath,
					unlink: () => $fs.unlinkSync(filePath)
				})
			},
			fail: reject
		})
	})
}
writeFile.sync = function(opt) {
	return writeFile({
		opt,
		sync: true
	})
}

export function getArraybufferTempPath({
	arraybuffer,
	fileType,
	method,
	canvasId,
	width,
	height,
	ctx,
	sync,
}) {
	if (typeof arraybuffer !== 'object' || arraybuffer.toString().slice(8, -1) !== 'ArrayBuffer') return reject(new Error(
		'ArrayBuffer must be a ArrayBuffer'))
	method = method || 'canvas'
	fileType = fileType || 'png'
	if (method === 'fs') {
		const filePath = wx.env.USER_DATA_PATH + '/' + Date.now() + '.' + fileType
		return writeFile({
			filePath,
			data: arraybuffer,
			sync
		})
	}
	if (method === 'canvas') {
		return new Promise(function(resolve, reject) {
			if (!['canvas', 'fs'].includes(method)) return reject(new Error('method must be canvas | fs'))
			const base64Url = `data:image/${fileType};base64,${uni.arrayBufferToBase64(arraybuffer)}`
			if (typeof canvasId !== 'string') return reject(new Error('canvasId must be a string [#id]'))
			const query = wx.createSelectorQuery()
			if (ctx) query.in(ctx)
			query.select(canvasId).fields({
				node: true,
				size: true,
			}).exec(async res => {
				res = res[0]
				if (!res) return reject(new Error('No canvas nodes were obtained'))
				width = width || res.width
				height = height || res.height
				const canvas = res.node
				if (!canvas) return reject(new Error('No canvas instances were obtained'))
				const context = canvas.getContext('2d')
				const image = canvas.createImage()
				await new Promise(resolve => {
					image.onload = resolve
					image.src = base64Url
				}).catch(reject)
				context.clearRect(0, 0, width, height)
				context.drawImage(image, 0, 0, width, height)
				wx.canvasToTempFilePath({
					canvas,
					width,
					height,
					fileType,
					success: resolve,
					fail: reject
				})
			})
		})
	}
}
export default {
	getArraybufferTempPath,
	writeFile
}
