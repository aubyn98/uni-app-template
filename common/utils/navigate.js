export function toPage(row) {
	let event = (url, params, type = 'navigateTo') => uni.$u.route({
		type,
		url,
		params,
	})
	const {
		targetType,
		targetData
	} = row
	if (targetType == 'None') return
	if (targetType == 'AllCategory') event('/pages/findMedicine/findMedicine', targetData, 'switchTab')
	if (targetType == 'Category') event('/pages/findMedicine/findMedicine', {
		id: targetData.id
	}, 'switchTab')
	if (targetType == 'GoodsDetail') event('/packageGoods/pages/detail/detail', {
		id: targetData.id
	})
	if (targetType == 'DefinePage') event('/packageOther/pages/definePage/definePage', targetData)
	if (targetType == 'Integrate') event('/packageOther/pages/integral/integral', targetData)
	if (targetType == 'Coupon') event('/packageOther/pages/couponCenter/couponCenter', targetData)
	if (targetType == 'Search') event('/packageGoods/pages/search/searchResult', targetData)
	if (targetType == 'MemberCard') event('/packageMine/pages/memberCode/memberCode', targetData)
}