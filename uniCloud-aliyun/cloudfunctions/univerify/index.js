'use strict';
exports.main = async (event, context) => {
	// event里包含着客户端提交的参数
	const res = await uniCloud.getPhoneNumber({
		appid: '__UNI__697F922', // 替换成自己开通一键登录的应用的DCloud appid
		provider: 'univerify',
		apiKey: 'e663974d882abecf040abaa11eb6471a', // 在开发者中心开通服务并获取apiKey
		apiSecret: '16c03517863997a188e93576aec83020', // 在开发者中心开通服务并获取apiSecret
		access_token: event.access_token,
		openid: event.openid
	})
	console.log(res); 
	return {
		data:res,
		code: 0,
		message: '获取手机号成功'
	}
}
