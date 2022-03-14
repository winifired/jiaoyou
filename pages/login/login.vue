<template>
	<view class="login">
		<view class="">
			<image src="../../static/image/appIcon.png" mode="" class="logo"></image>
			<view class="text-t">Z世代的高品质社交</view>
			<view class="input flex row-center">
				<view class="font32 color666">+86</view>
				<input type="text" class="font32" v-model="phoneNumber" />
			</view>
			<view class="input flex row-center btn">
				<input type="text" class="font32" v-model="codeVal" :focus="focus" />
				<button class="color364 font32" @click="getCode" :disabled="disabled">{{codeName}}</button>
			</view>
			<view class="confirm " @click="confirmPhone">一键登录/注册</view>
			<!-- #ifdef APP-PLUS -->
			<view class="confirm " style="margin-top: 30rpx;" @click="getPhone('univerify')">本机号码一键登录</view>
			<!-- #endif -->
			
			<view class="flex font24 color8a8 radio area-center">
				<image src="../../static/image/choose.png" mode="" class="icon31" v-if="!checked" @click="checked=!checked">
				</image>
				<image src="../../static/image/choosed.png" mode="" class="icon31" v-else @click.stop="checked=!checked">
				</image>
				我已阅读并同意<navigator class="color0f4" hover-class="none" url="/pages/user/setting/asidePage/asidePage?type=1">
					《用户协议》</navigator>和
				<navigator class="color0f4" hover-class="none" url="/pages/user/setting/asidePage/asidePage?type=2">《隐私条款》
				</navigator>
			</view>
			<view class="elseLogin">
				<view class="flex title area-center">
					<view class="line"></view>
					<text class="color8a8 font26">其他方式登录</text>
					<view class="line"></view>
				</view>
				<view class="flex area-center">
					<image src="../../static/image/wx.png" mode="" @click="wxLogin()"></image>
					<image src="../../static/image/apple.png" mode="" class="wx" v-if="model_platform=='ios'"
						@click="appleLogin()"></image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :safe-area="false" :mask-click="false">
			<jigsaw @closep="closep" @jigsawStatus="jigsawStatus"></jigsaw>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex';
	import {
		phone
	} from "../../utils/check.js";
	import jigsaw from "../../components/jigsaw/jigsaw.vue";
	import {
		genTestUserSig
	} from '../../debug/GenerateTestUserSig.js';
	const app = getApp();
	export default {
		data() {
			return {
				codeName: '获取验证码',
				phoneNumber: '',
				disabled: false,
				codeVal: '',
				timer: null,
				noClick: false,
				onlineCode: '',
				checked: false,
				model_platform: '',
				isJigsaw: false,
				focus: false
			};
		},
		watch: {
			// codeVal(newData) {
			// 	if (newData.length >= 4) {
			// 		if (newData == this.onlineCode) {
			// 			this.focus = false;
			// 			uni.hideKeyboard();
			// 			this.$refs.popup.open();
			// 		} else {
			// 			this.focus = true;
			// 			this.$toast('验证码错误');
			// 			this.codeName = '获取验证码';
			// 			this.disabled = false;
			// 			this.$refs.popup.close();
			// 			clearInterval(this.timer)
			// 		}
			// 	}
			// }
		},
		components: {
			jigsaw
		},
		onLoad() {
			let system = uni.getSystemInfoSync();
			console.log(system)
			this.model_platform = system.platform;
			// // #ifdef APP-PLUS
			// this.getPhone('univerify');
			// // #endif
		},
		methods: {
			...mapMutations(['setuserid', 'setuserinfo']),
			wxLogin() {
				let that = this;
				if (!this.checked) {
					this.$toast('请阅读并同意条款');
					return
				};
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success: function(loginRes) {
						that.postLogin({
							code: loginRes.code
						})
						console.log(loginRes);
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			getPhone(provider) {
				if (!this.checked) {
					this.$toast('请阅读并同意条款');
					return
				};
				let that = this;
				uni.login({
					provider: provider,
					univerifyStyle: {
						"fullScreen": false, // 是否全屏显示
						"icon": {
							"path": "/static/image/appIcon.png"
						},
						"authButton": {
							"normalColor": "#FF4364", // 授权按钮正常状态背景颜色 默认值：#3479f5  
							"highlightColor": "#FF4364", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
							"disabledColor": "#ff7287", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
							"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
						},
						"privacyTerms": {
							"defaultCheckBoxState": false, // 条款勾选框初始状态 默认值： true
							// "uncheckedImage": "/static/image/choose.png",
							// "checkedImage": "/static/image/choosed.png",
							"checkBoxSize": 12, // 可选 条款勾选框大小，仅android支持
							"textColor": "#A9A8A8", // 文字颜色 默认值：#BBBBBB  136
							"termsColor": "#33A0F4", //  协议文字颜色 默认值： #5496E3  
							"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”
							"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”
						},
					},
					success(res) {
						that.loginByUniverify(res);
					},
					fail(err) { // 登录失败
						console.log(err)
						if (err.code == '30002') {
							uni.closeAuthView();
						}
						// 一键登录预登陆失败
						if (err.code == '30005') {
							uni.showModal({
								showCancel: false,
								title: '预登录失败',
								content: err.errMsg
							});
							return;
						}
						// 未开通
						if (err.code == 1000) {
							uni.showModal({
								title: '登录失败',
								content: `${err.errMsg}\n，错误码：${err.code}`,
								confirmText: '开通指南',
								cancelText: '确定',
								success: (res) => {
									if (res.confirm) {
										setTimeout(() => {
											plus.runtime.openWeb(
												'https://ask.dcloud.net.cn/article/37965')
										}, 500)
									}
								}
							});
							return;
						}
					}
				})
			},
			loginByUniverify(res) {
				let that = this;
				uniCloud.callFunction({
					name: 'univerify', // 你的云函数名称
					data: res.authResult
				}).then(result => {
					that.postLogin({
						userName: result.result.data.phoneNumber
					})
					uni.closeAuthView();
					// 登录成功，可以关闭一键登录授权界面了
				}).catch(err => {
					that.$toast('连接本地调试服务失败，请检查客户端是否和主机在同一局域网下');
					console.log(err)
					// 处理错误
				})
			},
			appleLogin() {
				if (!this.checked) {
					this.$toast('请阅读并同意条款');
					return
				};
				let system = uni.getSystemInfoSync().system;
				let systemNum = system.split(' ')[1];
				console.log(systemNum)
				if ((systemNum - 0) < 13) {
					this.$toast('iOS13以下暂不支持苹果登录');
					return;
				}
				let that = this;
				uni.login({
					provider: 'apple',
					success: function(loginRes) {
						that.postLogin({
							appleId: loginRes.authResult.openid
						})
					},
					fail: function(err) {
						// 登录失败  
						console.log(err)
					}
				});
			},
			postLogin(data) {
				this.post(this.apis.user_login, data).then(res => {
					uni.closeAuthView();
					if (res.code == 0) {
						this.loginSuccess(res.data)
					} else {
						this.$toast(res.msg);
					}
				});
			},
			closep() {
				this.$refs.popup.close();
			},
			jigsawStatus() {
				this.isJigsaw = true;
				this.getCode()
			},
			confirmPhone() {
				if (!this.phoneNumber) {
					this.$toast('请输入手机号');
					return
				}
				if (!this.onlineCode || this.onlineCode != this.codeVal) {
					this.$toast('验证码错误');
					return
				}
				if (!this.checked) {
					this.$toast('请阅读并同意条款');
					return
				};
				this.noClick = true;
				this.post(this.apis.user_login, {
					userName: this.phoneNumber,
				}).then(res => {
					if (res.code == 0) {
						this.loginSuccess(res.data)
					} else {
						this.$toast(res.msg);
						this.codeName = '获取验证码';
						this.disabled = false;
						clearInterval(this.timer);
						this.noClick = false;
					}
				});
			},
			getCode() {
				if (!this.isJigsaw) {
					this.$refs.popup.open();
					return;
				}
				if (phone(this.phoneNumber)) {
					this.setTimer();
					this.post(this.apis.sendMessage, {
						phone: this.phoneNumber,
					}).then(res => {
						if (res.code != 0) {
							this.codeName = '获取验证码';
							this.disabled = false;
							clearInterval(this.timer)
						} else {
							console.log(res.msg)
							this.onlineCode = res.msg;
						}
					})
				} else {
					this.$toast('手机号错误')
				}
			},
			setTimer() {
				let num = 60;
				this.disabled = true;
				this.timer = setInterval(() => {
					if (num > 1) {
						num--;
						this.codeName = num + 's';
					} else {
						this.codeName = '获取验证码';
						this.disabled = false;
						clearInterval(this.timer)
					}
				}, 1000)
			},
			loginSuccess(data) {
				console.log(data)
				this.imLogin(data.id, data.userSign, data.perfectFlag);
				this.setuserid(data.id);
				this.setuserinfo(data);
			},
			imLogin(userID, userSig, perfectFlag) {
				let that = this;
				console.log(perfectFlag)
				uni.$TUIKit.login({
					userID: userID + '',
					userSig: userSig
				}).then(() => {
					console.log('im一登录')
				}).catch(() => {});
				// 登录原生插件
				uni.$TUICalling.login({
					sdkAppID: genTestUserSig('').sdkAppID,
					userID: userID + '',
					userSig: userSig
				}, (res) => {
					console.log('im原生插件一登录。。。。。。。。。。。。')
					console.log(JSON.stringify(res.msg))
					if (perfectFlag != 1) {
						// 不等于1 跳转完善信息
						uni.redirectTo({
							url: '/pages/login/writeMsg'
						});
					} else {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.text-t {
		text-align: center;
		font-family: fontlogin;
		color: #FF4364;
		font-size: 36rpx;
	}

	@font-face {
		font-family: fontlogin;
		src: url('~@/static/login-title.ttf');
	}

	.login {
		padding-top: 200rpx;
	}

	.logo {
		width: 175rpx;
		height: 175rpx;
		border-radius: 20rpx;
		margin: 30rpx auto 37rpx;
	}

	.input {
		width: 612rpx;
		margin: 60rpx auto 0;
		border-bottom: 1px solid #DDDDDD;
		padding-bottom: 20rpx;

		input {
			flex: 1;
			text-align: center;
		}
	}

	.btn {
		button {
			line-height: 42rpx;
		}

		input {
			text-align: left;
		}
	}

	.confirm {
		margin-top: 102rpx;
	}

	.radio {
		margin: 42rpx 0 0;

		.icon31 {
			margin-right: 16rpx;
		}
	}

	.elseLogin {
		margin: 50rpx 0 0;
		padding: 0 0 100rpx;

		.line {
			width: 180rpx;
			height: 1px;
			background: #F1F1F1;
			margin: 0 20rpx;
		}

		.title {
			margin: 0 0 57rpx;
		}

		image {
			width: 57rpx;
			height: 57rpx;
		}

		.wx {
			margin-left: 100rpx;
		}
	}
</style>
