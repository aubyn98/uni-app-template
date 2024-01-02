function _formatNormalize(formatter) {
	if (typeof formatter === 'function') return formatter
	if (typeof formatter !== 'string') throw new TypeError('formatter must be a string')
	if (formatter === 'date') formatter = 'yyyy-MM-dd'
	else if (formatter === 'datetime') formatter = 'yyyy-MM-dd HH:mm:ss'
	const formatterFunc = dateInfo => {
		const {
			yyyy,
			MM,
			dd,
			HH,
			mm,
			ss,
			ms
		} = dateInfo
		return formatter.replaceAll('yyyy', yyyy).replaceAll('MM', MM).replaceAll('dd', dd).replaceAll('HH', HH)
			.replaceAll('mm', mm).replaceAll('ss', ss).replaceAll('ms', ms)
	}
	return formatterFunc
}

export function getDate(date = new Date(), formatter = 'date', isPad = true) {
	if (typeof date === 'number' || typeof date === 'string') date = new Date(date)
	formatter = _formatNormalize(formatter)
	const dataInfo = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		date: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
		millisecond: date.getMilliseconds()
	}
	dataInfo.yyyy = dataInfo.year.toString()
	dataInfo.MM = dataInfo.month.toString()
	dataInfo.dd = dataInfo.date.toString()
	dataInfo.HH = dataInfo.hour.toString()
	dataInfo.mm = dataInfo.minute.toString()
	dataInfo.ss = dataInfo.second.toString()
	dataInfo.ms = dataInfo.millisecond.toString()

	function _pad(prop, len) {
		dataInfo[prop] = dataInfo[prop].padStart(len, '0')
	}
	if (isPad) {
		_pad('yyyy', 4)
		_pad('MM', 2)
		_pad('dd', 2)
		_pad('HH', 2)
		_pad('mm', 2)
		_pad('ss', 2)
		_pad('ms', 3)
	}
	return formatter(dataInfo)
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