export default {
	getDate(time = Date.now(), fmt = 'yyyy-MM-dd') {
		typeof time === 'string' && (time = new Date(time).getTime());
		const date = new Date(time + 28800000).toISOString().replace('T',' ')
		if(fmt === 'yyyy-MM-dd hh:mm') return date.slice(0,16)
		if(fmt === 'yyyy-MM-dd hh:mm:ss') return date.slice(0,19)
		return date.slice(0, 10)
	},
	getToday() {
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth() + 1;
		let day = now.getDate();
		let date = now.getFullYear() + "-" + (now.getMonth() > 9 ? (now.getMonth() + 1) : "0" +
			(
				now.getMonth() + 1)) + "-" + (now.getDate() > 9 ? (now.getDate()) : "0" + (
			now.getDate()));
		return date
	},
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
