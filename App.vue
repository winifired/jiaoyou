<script>
	import TIM from 'tim-wx-sdk';
	import COS from "cos-wx-sdk-v5";
	import logger from './utils/logger'; // app.js
	import {
		genTestUserSig
	} from './debug/GenerateTestUserSig.js';
	// #ifdef APP-PLUS
	const TUICalling = uni.requireNativePlugin("TUICallingUniPlugin-TUICallingModule");
	console.log('TUICalling ｜ ok........................................')
	console.log(TUICalling)
	// #endif
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import apis from "./utils/requestApi.js";
	import request from "./utils/request.js";
	export default {
		computed: {
			...mapState(['latitude', 'longitude', 'userid', 'userinfo'])
		},
		onLaunch: function() {
			uni.onTabBarMidButtonTap(() => {
				uni.navigateTo({
					url: '/pages/discover/discover'
				});
			});
			let that = this;
			// #ifdef APP-PLUS
			// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
			if (plus.runtime.appid !== 'HBuilder') { // 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
				// uni.request({
				// 	url: 'https://7a3e3fa9-7820-41d0-be80-11927ac2026c.bspapp.com/http/update', //检查更新的服务器地址
				// 	data: {
				// 		appid: plus.runtime.appid,
				// 		version: plus.runtime.version,
				// 		imei: plus.device.imei
				// 	},
				// 	success: (res) => {
				// 		if (res.statusCode == 200 && res.data.isUpdate) {
				// 			// 提醒用户更新
				// 			uni.showModal({
				// 				title: '更新提示',
				// 				content: res.data.note ? res.data.note : '是否选择更新',
				// 				success: (ee) => {
				// 					if (ee.confirm) {
				// 						plus.runtime.openURL(res.data.url);
				// 					}
				// 				}
				// 			})
				// 		}
				// 	}
				// })
			}
			// #endif
			uni.setStorageSync('islogin', false);
			uni.$TUIKit = TIM.create({
				SDKAppID: genTestUserSig('').sdkAppID
			});
			// #ifdef APP-PLUS
			// 将原生插件挂载在 uni 上
			uni.$TUICalling = TUICalling;
			// #endif
			uni.$TUIKit.registerPlugin({
				'cos-wx-sdk': COS
			});
			uni.$TUIKitTIM = TIM;
			uni.$TUIKitEvent = TIM.EVENT;
			uni.$TUIKitVersion = TIM.VERSION;
			uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
			uni.$resetLoginData = this.resetLoginData()

			uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
			uni.$TUIKit.on(uni.$TUIKitEvent.KICKED_OUT, this.onKickedOut);
			uni.$TUIKit.on(uni.$TUIKitEvent.ERROR, this.onTIMError);
			uni.$TUIKit.on(uni.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange);
			uni.$TUIKit.on(uni.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);
			uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
			uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
			if (uni.getStorageSync('cityUserid')) {
				that.setuserid(uni.getStorageSync('cityUserid'));
				that.getUserInfo().then(res => {
					that.setuserinfo(res)
					console.log(res)
					if (res.accountStatus == 2) {
						// 账号状态 1正常 2注销
						that.$toast('您的账号已注销，请重新注册登录');
						uni.clearStorageSync();
						that.clearData();
						uni.reLaunch({
							url: '/pages/login/login'
						})
						return;
					}
					if (res.perfectFlag != 1) {
						that.$toast('请先完善基本资料');
						// 不等于1 跳转完善信息
						uni.redirectTo({
							url: '/pages/login/writeMsg'
						});
					} else {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onShow: function() {
			this.getUserLocation();
		},
		onHide: function() {
			console.log('隐藏了。。。。。。。。。。。。。。')
			// uni.$TUIKit.logout();
			// uni.TUICalling.logout();
		},
		globalData: {},
		methods: {
			...mapMutations(['setuserid', 'setAddress', 'setCity', 'setLatitude', 'setLongitude', 'setuserinfo',
				'clearData',
				'updateAllConversation'
			]),
			...mapActions(['upUserLonAndlat', 'getUserInfo','getUserLocation']),
			resetLoginData() {
				this.globalData.expiresIn = '';
				this.globalData.sessionID = '';
				logger.log(`| app |  resetLoginData | globalData: ${this.globalData}`);
			},
			onTIMError(message) {
				console.log('onTIMErrormessage....................')
				console.log(message)
				if (message.data.code === 2999) {
					// uni.$TUIKit.logout();
					// uni.$TUICalling.logout();
					uni.$TUIKit.login({
						userID: uni.getStorageSync('cityUserid') + '',
						userSig: uni.getStorageSync('cityUserinfo').userSign
					}).then(() => {
						console.log('im一登录')
					}).catch((err) => {
						console.log(err)
					});
					// 登录原生插件
					uni.$TUICalling.login({
						sdkAppID: genTestUserSig('').sdkAppID,
						userID: this.userinfo.id + '',
						userSig: this.userinfo.userSign
					}, (res) => {
						console.log('im原生插件一登录。。。。。。。。。。。。')
					})
				}
			},
			onNetStateChange() {},
			onSDKReload() {},
			onSDKReady() {
				uni.$TUIKit.getConversationList().then(imResponse => {
					logger.log(
						`TUI-conversation | getConversationList | getConversationList-length: ${imResponse.data.conversationList.length}`
					);
					console.log('imResponse.data.conversationList....................')
					console.log(imResponse.data.conversationList)
					this.updateAllConversation(imResponse.data.conversationList);
				});
			},
			onSdkNotReady() {},
			onConversationListUpdated(event) {
				console.log(event)
				// 获取会话列表
				this.updateAllConversation(event.data);
			},
			onKickedOut() {
				uni.showToast({
					title: '您被踢下线',
					icon: 'error'
				});
				uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},

		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/common/public.scss";

	.video-box {
		width: 100%;
		height: 100%;
		background: #000000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 90;

		.image {
			width: 52rpx;
			height: 52rpx;
			position: absolute;
			left: 20rpx;
			top: 0;
			z-index: 100;
		}

		.videoElse {
			width: 100%;
			height: 90%;
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.playIcon {
		width: 80rpx !important;
		height: 80rpx !important;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.ql-container .ql-editor {
		padding: 20rpx 30rpx 0;
	}

	.tipMsgCon {
		width: 582rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		padding-top: 43rpx;

		.center {
			text-align: center;
		}

		.tiptitle {
			text-align: center;
			color: #0A0A0A;
		}

		.contentMsg {
			font-family: PingFang SC;
			font-weight: 400;
			color: #565656;
			line-height: 48rpx;
			padding: 44rpx 48rpx 47rpx;

			text {
				color: #FF4364;
			}
		}

		.bottombrn {
			border-top: 1px solid #EEEFF2;
			width: 100%;

			>view {
				width: 50%;
				text-align: center;
				height: 102rpx;
				line-height: 102rpx;
			}

			>view:nth-child(1) {
				border-right: 1px solid #EEEFF2;
			}
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		background: #FFFFFF;
		width: 100%;
	}

	.loveStatus {
		width: 40rpx;
		height: 40rpx;
	}

	.love {
		width: 38rpx;
		height: 34rpx;
	}

	.love-act {
		box-shadow: 0 3rpx 21rpx 0 rgba(254, 65, 103, 0.63);
	}

	.heart {
		position: relative;
		width: 21rpx;
		height: 21rpx;
		background: #FF4364;
		transform: rotate(-45deg);
	}

	.heart:before {
		content: '';
		position: absolute;
		top: -10.5rpx;
		left: 0;
		width: 21rpx;
		height: 21rpx;
		border-radius: 50%;
		background: #FF4364;
	}

	.heart::after {
		content: '';
		position: absolute;
		top: 0;
		left: 10.5rpx;
		width: 21rpx;
		height: 21rpx;
		border-radius: 50%;
		background: #FF4364;
	}

	.uni-picker-container .uni-picker-action.uni-picker-action-confirm {
		color: #FF4364 !important;
	}

	.fixedBottom {
		position: fixed;
		bottom: 0;
		padding-top: 10rpx;
		z-index: 30;
		width: 100%;
		background: #fff;
	}

	.confirm {
		width: 580rpx;
		height: 97rpx;
		background: #FF4364;
		border-radius: 49rpx;
		margin: 0 auto;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		line-height: 97rpx;
	}
</style>
