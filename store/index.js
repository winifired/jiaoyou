import Vue from 'vue'
import Vuex from 'vuex'
import apis from "../utils/requestApi.js"
import request from "../utils/request.js"
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		address: null,
		latitude: 0,
		longitude: 0,
		userid: uni.getStorageSync('cityUserid'),
		userinfo: uni.getStorageSync('cityUserinfo'),
		userMatchinglist: [], //匹配列表
		conversationList: []
	},
	mutations: {
		updateAllConversation(state, data) {
			let unread = 0;
			state.conversationList = data;
			if (data.length > 0) {
				data.map(item => {
					unread += (item.unreadCount - 0)
				});
				if (unread == 0) {
					uni.removeTabBarBadge({
						index: 2,
					});
					return;
				}
				uni.setTabBarBadge({
					index: 2,
					text: String(unread)
				})
			}
		},
		setuserid(state, data) {
			state.userid = data;
			uni.setStorageSync('cityUserid', data);
		},
		setuserinfo(state, data) {
			const promise = uni.$TUIKit.updateMyProfile({
				nick: data.nickName,
				avatar: data.headImg,
			});
			promise.then(imResponse => {
				console.warn('updateMyProfile success:', imResponse);
			}).catch(imError => {
				console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
			});
			uni.setStorageSync('cityUserinfo', data);
			state.userinfo = data;
		},
		setAddress(state, data) {
			state.address = data;
		},
		setLatitude(state, data) {
			state.latitude = data;
		},
		setLongitude(state, data) {
			state.longitude = data;
		},
		setuserMatchinglist(state, data) {
			state.userMatchinglist = data;
		},
		clearData(state) {
			state.userid = '';
			state.userinfo = null;
			state.userMatchinglist = [];
		},
	},
	actions: {
		getUserLocation({
			state,
			dispatch,
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				uni.getLocation({
					geocode: true,
					type: 'gcj02',
					altitude: true,
					isHighAccuracy:true,
					success: function(res) {
						commit('setLatitude', res.latitude);
						commit('setLongitude', res.longitude);
						commit('setAddress', res.address);
						if (state.userid) {
							dispatch('upUserLonAndlat', {
								longitude: res.longitude,
								latitude: res.latitude,
								currentCity: res.address?.city
							})
						}
						resolve({
							city: res.address.city,
							latitude: res.latitude,
							longitude: res.longitude
						})
					},
					fail(err) {
						if(err.message.indexOf('权限验证失败')!=-1){
							uni.showToast({
								title:'请确认是否开启了定位权限',
								icon:'none'
							})
						}else{
							dispatch('getUserLocation')
						}
					}
				});
			})
		},
		upUserLonAndlat({
			state
		}, {
			longitude,
			latitude,
			currentCity
		}) {
			request.post(apis.upUserLonAndlat, {
				userId: state.userid,
				longitude,
				latitude,
				currentCity
			}).then(res => {
				if (res.code == 0) {
					uni.setStorageSync('isUpLocation', true)
				}
			})
		},
		getHintgold({
			state
		}, {
			costId,
			targetUserId = ''
		}) {
			// 非会员操作需要支付的金币数
			return new Promise((resolve, reject) => {
				console.log(targetUserId)
				request.post(apis.hintgold, {
					userId: state.userid, //用户id
					costId: costId, //费用id  1发起私聊  2匹配次数 5评论点赞
					targetUserId: targetUserId
				}).then(res => {
					resolve(res); //300用金币购买 0可以操作 500提示开通会员
				})
			})
		},
		getGoldPay({
			state
		}, {
			costId,
			targetUserId = ''}
		) {
			// 非会员的金币支付
			return new Promise((resolve, reject) => {
				let data = {
					userId: state.userid, //用户id
					costId: costId, //费用id  1发起私聊  2匹配次数 5评论点赞...
					targetUserId: targetUserId
				};
				console.log(data)
				request.post(apis.goldPay, data).then(res => {
					resolve(res);
				})
			})
		},
		getUserAlbum({
			state
		}, checkUserId) {
			// 用户相册
			return new Promise((resolve, reject) => {
				request.post(apis.albumList, {
					userId: checkUserId,
				}).then(res => {
					if (res.code == 0) {
						resolve(res.data);
					} else {
						reject(res.msg);
					}
				})
			})
		},
		getElseUserInfo({
			state,
			commit
		}, checkUserId) {
			// 用户信息
			return new Promise((resolve, reject) => {
				request.post(apis.userInfo, {
					userId: state.userid,
					latitude: state.latitude,
					longitude: state.longitude,
					checkUserId: checkUserId,
				}).then(res => {
					if (res.code == 0) {
						resolve(res.data);
					} else {
						reject(res.msg);
					}
				})
			})
		},
		getUserInfo({
			state,
			commit
		}) {
			// 用户信息
			return new Promise((resolve, reject) => {
				request.post(apis.myuserInfo, {
					userId: state.userid,
				}).then(res => {
					if (res.code == 0) {
						resolve(res.data);
					} else {
						reject(res.msg);
					}
				})
			})
		},
		isFocusUser({
			state
		}, focusUserId) {
			//关注/取消关注用户
			return new Promise((resolve, reject) => {
				request.post(apis.focusUser, {
					userId: state.userid,
					focusUserId: focusUserId, //对方用户id
				}).then(res => {
					resolve(res)
				})
			})
		},
		getLabelList(context, type) {
			return new Promise((resolve, reject) => {
				request.post(apis.labelList, {
					labelType: type, //1、日常爱好2、性格3、交友目的4、职业5、评价
				}).then(res => {
					if (res.code == 0 && res.data.length > 0) {
						res.data.map(item => {
							item.checked = false;
						})
						resolve(res.data)
					} else {
						reject(res)
					}
				})
			})
		},
	}
})
export default store
