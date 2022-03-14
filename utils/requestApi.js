const host = "http://121.196.193.184:8080/jy";
// const host = "http://192.168.0.146:8081";
const api = {
	upload:host+'/common/upload', //上传图片
	thumbUpload:host+'/common/thumbUpload', //上传图片
	user_login:host+'/api/user/login', //用户登录注册
	sendMessage:host+'/api/param/send-message', //发送验证码
	userInfo:host+'/api/user/userInfo', //用户信息
	editUser:host+'/api/user/editUser', //编辑用户信息
	labelList:host+'/api/param/labelList', //标签列表
	userList:host+'/api/user/userList', //用户列表（条件搜索）
	focusUser:host+'/api/user/focusUser', //关注/取消关注用户
	albumList:host+'/api/user/albumList', //用户相册列表
	dynamicList:host+'/api/dynamic/dynamicList', //用户动态列表
	commentList:host+'/api/dynamic/commentList', //动态评论列表
	dynamicPraise:host+'/api/dynamic/dynamicPraise', //动态点赞、取消点赞
	addComment:host+'/api/dynamic/addComment', //动态添加评论
	userEvaluate:host+'/api/evaluate/userEvaluate', //个人中心用户评价信息
	giftList:host+'/api/param/giftList', //礼物列表
	reportUser:host+'/api/user/reportUser', //举报用户
	memberPrice:host+'/api/param/memberPrice', //会员价格
	memberPrivilege:host+'/api/param/memberPrivilege', //会员特权
	sendGifts:host+'/api/user/sendGifts', //赠送礼物
	dynamicListByState:host+'/api/dynamic/dynamicListByState', //动态列表（动态）
	goldPay:host+'/api/user/goldPay', //非会员的金币消费
	hintgold:host+'/api/user/hintgold', //非会员操作需要购买的金币数
	dynamicInfo:host+'/api/dynamic/dynamicInfo', //动态/节目 详情
	userMatchinglist:host+'/api/user/userMatchinglist', //用户匹配列表+精准匹配
	likeme:host+'/api/user/likeme', //喜欢我的
	updatephone:host+'/api/user/updatephone',
	logout:host+'/api/user/logout',
	privacySet:host+'/api/user/privacySet',
	questionList:host+'/api/param/questionList',
	questioninfo:host+'/api/param/questioninfo',
	addfeedback:host+'/api/param/addfeedback',
	protocolInfo:host+'/api/param/protocolInfo',
	meinvite:host+'/api/user/meinvite',
	invite:host+'/api/param/invite',
	fillincode:host+'/api/user/fillincode',
	addUserAudit:host+'/api/user/addUserAudit',
	paramInfo:host+'/api/param/paramInfo',
	myuserInfo:host+'/api/user/myuserInfo',
	removeUre:host+'/api/user/removeUre',
	billdetails:host+'/api/user/billdetails',
	addAlbum:host+'/api/user/addAlbum',
	delalbum:host+'/api/user/delalbum',
	addDynamic:host+'/api/dynamic/addDynamic',
	dynamicdel:host+'/api/dynamic/dynamicdel',
	rechargeGold:host+'/api/pay/rechargeGold',
	delEvaluateNum:host+'/api/evaluate/delEvaluateNum',
	getAndsendGift:host+'/api/user/getAndsendGift',
	convertGift:host+'/api/user/convertGift',
	userPraiseDy:host+'/api/user/userPraiseDy',
	delGift:host+'/api/user/delGift',
	lookBrow:host+'/api/user/lookBrow',
	focusUserList:host+'/api/user/focusUserList',
	delBrow:host+'/api/user/delBrow',
	addresslist:host+'/api/user/addresslist',
	defriend:host+'/api/user/defriend',
	blackUser:host+'/api/user/blackUser',
	addEvaluate:host+'/api/evaluate/addEvaluate',
	matching:host+'/api/user/matching',
	balanceCash:host+'/api/user/balanceCash',
	dismissRoom:host+'/api/im/dismissRoom',
	uploadVideo:host+'/common/uploadVideo',
	openVIP:host+'/api/pay/openVIP',
	userBindAccount:host+'/api/user/userBindAccount',
	upUserLonAndlat:host+'/api/user/upUserLonAndlat',
};
module.exports = api;
