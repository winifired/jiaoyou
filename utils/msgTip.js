const reportArray=[
	'色情低俗','涉嫌诈骗','广告引流','骚扰谩骂','血腥暴力','违法行为','未成年','其他'
]
function toast(title,duration=3000,icon='none',image=''){
	uni.showToast({
	    title,
		icon,
		image,
	    duration
	});
}
module.exports={reportArray,toast}