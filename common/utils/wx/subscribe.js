function collectHandle(tmplIds, res) {
	return tmplIds.reduce((collect, k) => {
		const val = res[k]
		collect[val] ? collect[val].push(k) : collect[val] = [k]
		return collect
	}, {
		accept: [],
		reject: []
	})
}
export function subscribe(tmplIds, complete) {
	return new Promise(function(resolve, reject) {
		wx.requestSubscribeMessage({
			tmplIds,
			success(res) {
				if (res.errMsg !== 'requestSubscribeMessage:ok') return reject(res)
				resolve(collectHandle(tmplIds, res))
			},
			fail: reject,
			complete(res) {
				const err = res.errMsg !== 'requestSubscribeMessage:ok'
				const message = {
					err,
					info: res,
					subscribe: err ? {} : collectHandle(tmplIds, res)
				}
				typeof complete === 'function' && complete(message)
			}
		})
	})
}