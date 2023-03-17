export function getDate(time = Date.now(), fmt = 'yyyy-MM-dd', join = '-') {
	typeof time === 'string' && (time = new Date(time).getTime())
	let date = new Date(time + 28800000).toISOString().replace('T', ' ')
	if (join !== '-' && typeof join === 'string') date = date.replaceAll('-', join)
	if (fmt === 'yyyy-MM-dd hh:mm') return date.slice(0, 16)
	if (fmt === 'yyyy-MM-dd hh:mm:ss') return date.slice(0, 19)
	if (fmt === 'yyyyMMdd') return date.slice(0, 10).replaceAll(join, '')
	if (fmt === 'yyyyMMddhhmm') return date.slice(0, 16).replaceAll(join, '').replaceAll(' ', '').replaceAll(':', '')
	if (fmt === 'yyyyMMddhhmmss') return date.slice(0, 19).replaceAll(join, '').replaceAll(' ', '').replaceAll(':', '')
	return date.slice(0, 10)
}
export default {
	getDate,
	initDate(date) {
		let fdate = date.split('-');
		return {
			year: Number(fdate[0] || 1920),
			month: Number(fdate[1] || 1),
			day: Number(fdate[2] || 1)
		}
	},
	nextAndprevDate(paramDay, type = "next") {
		const time = type == 'next' ? Number((new Date(paramDay)).getTime()) + Number(24 * 60 * 60 * 1000) :
			Number((new Date(paramDay)).getTime()) - Number(24 * 60 * 60 * 1000)
		let d = new Date(time);
		const month = d.getMonth();
		const day = d.getDate();
		d = d.getFullYear() + "-" + (d.getMonth() > 9 ? (d.getMonth() + 1) : "0" +
			(
				d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? (d.getDate()) : "0" + (
			d.getDate()));
		let obj = {
			date: d,
			...this.initDate(d)
		}
		return obj
	},
}
