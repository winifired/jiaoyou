var dayjs = require('dayjs');
dayjs.locale('zh-cn');
import apis from "./requestApi.js"
function phone(number) {
	var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
	if (number == '' || !reg.test(number)) {
		return false;
	} else {
		return true;
	}
}

function timeago(dateTimeStamp) {
	console.log(dateTimeStamp)
	// dateTimeStamp 时间戳
	var result = "";
	var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
	var hour = minute * 60;
	var day = hour * 24;
	var week = day * 7;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime(); //获取当前时间毫秒
	var diffValue = now - dateTimeStamp; //时间差
	if (diffValue < 0) {
		return result= "刚刚";
	}
	var minC = diffValue / minute; //计算时间差的分，时，天，周，月
	var hourC = diffValue / hour;
	var dayC = diffValue / day;
	var weekC = diffValue / week;
	var monthC = diffValue / month;
	if (monthC >= 1 && monthC <= 3) {
		result = parseInt(monthC) + "月前"
	} else if (weekC >= 1 && weekC <= 3) {
		result = parseInt(weekC) + "周前"
	} else if (dayC >= 1 && dayC <= 6) {
		result = parseInt(dayC) + "天前"
	} else if (hourC >= 1 && hourC <= 23) {
		result = parseInt(hourC) + "小时前"
	} else if (minC >= 1 && minC <= 59) {
		result = parseInt(minC) + "分钟前"
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = "刚刚"
	} else {
		var datetime = new Date();
		datetime.setTime(dateTimeStamp);
		var Nyear = datetime.getFullYear();
		var Nmonth = addZeroPrefix(datetime.getMonth() + 1);
		var Ndate = addZeroPrefix(datetime.getDate());
		var Nhour = addZeroPrefix(datetime.getHours());
		var Nminute = addZeroPrefix(datetime.getMinutes());
		var Nsecond = addZeroPrefix(datetime.getSeconds());
		result = Nyear + "-" + Nmonth + "-" + Ndate
	}
	return result;
}

function humandate(time1, time2) {
	time1 = time1 / 1000;
	time2 = time2 / 1000;
	var s = time1 - time2;
	if (s < 0) {
		s = Math.abs(s);
	}
	if (s > 2592000) {
		return (s / 2592000).toFixed(2) + '月';
	} else if (s > 86400) {
		return (s / 86400).toFixed(2) + '天';
	} else if (s > 3600) {
		return (s / 3600).toFixed(2) + '小时';
	} else if (s > 60) {
		return (s / 60).toFixed(2) + '分钟';
	} else {
		return (s) + '秒';
	}
}
//时间戳转换方法    date:时间戳数字
function formatDate(date) {
	var date = new Date(date);
	var YY = date.getFullYear() + '-';
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return YY + MM + DD + " " + hh + mm + ss;
}

function getDay(day) {
	// 获取未来day天的每一天
	var betweentDay = [];
	for (let i = 1; i <= day; i++) {
		let dd = new Date();
		dd.setDate(dd.getDate() + i);
		let y = dd.getFullYear();
		let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
		let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
		betweentDay.push({
			value: y + '-' + m + '-' + d,
			label: y + '-' + m + '-' + d
		})
	}
	return betweentDay;
}

function formatTime(date) {
	if (isToday(date)) {
		return dayjs(date).format('A HH:mm').replace('PM', '下午').replace('AM', '上午')
	}
	return getDates(date)
}

function isToday(date) {
	return date.toDateString() === new Date().toDateString()
}

function getDates(date, splitor = '/') {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return `${year}${splitor}${addZeroPrefix(month)}${splitor}${addZeroPrefix(day)}`
}
/**
 * 个位数，加0前缀
 * @param {*} number
 * @returns
 */
function addZeroPrefix(number) {
	return number < 10 ? `0${number}` : number
}

function constellation(months, days) {
	let month = Math.abs(months),
		day = Math.abs(days);
	if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
		return "水瓶座"
	}
	if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
		return "双鱼座"
	}
	if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
		return "白羊座"
	}
	if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
		return "金牛座"
	}
	if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
		return "双子座"
	}
	if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
		return "巨蟹座"
	}
	if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
		return "狮子座"
	}
	if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
		return "处女座"
	}
	if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
		return "天秤座"
	}
	if ((month == 19 && day >= 23) || (month == 11 && day <= 21)) {
		return "天蝎座"
	}
	if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
		return "射手座"
	}
	if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
		return "摩羯座"
	}
}

function chooseImg() {
	let that = this;
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1,
			success: (chooseImageRes) => {
				let tempFilePaths = chooseImageRes.tempFilePaths;
				uni.uploadFile({
					url: apis.upload,
					filePath: tempFilePaths[0],
					name: 'file',
					success: (uploadFileRes) => {
						resolve(JSON.parse(uploadFileRes.data).url)
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			fail(err) {
				console.log(err)
			}
		});
	})
}
module.exports = {
	chooseImg,
	constellation,
	formatTime,
	phone,
	timeago,
	humandate,
	formatDate,
	getDay
}
