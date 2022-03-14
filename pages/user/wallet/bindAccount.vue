<template>
	<view class="bindPAGE">
		<view class="wx flex row-center" v-if="choosed==2">
			<image :src="userinfo&&userinfo.wechatHeadImg?userinfo.wechatHeadImg:'../../../static/image/avatar.png'"
				mode="" class="avatar"></image>
			<view class="wechatNickName font32 color101">
				{{userinfo&&userinfo.wechatNickName?userinfo.wechatNickName:'未绑定微信'}}
			</view>
			<view class="wx-bind confirm" @click="bindWX">绑定微信</view>
		</view>
		<view class="zfb" v-else>
			<view class="input flex row-center">
				<view class="font32 color101">姓名</view>
				<input type="text" class="font32" v-model="alipayName" placeholder="请输入姓名" />
			</view>
			<view class="input flex row-center">
				<view class="font32 color101">支付宝账号</view>
				<input type="text" class="font32" v-model="alipayCode" placeholder="请输入支付宝账号" />
			</view>
			<view class="input flex row-center btn">
				<view class="font32 color101">验证码</view>
				<input type="text" class="font32" v-model="codeVal" placeholder="请输入验证码" />
				<button class="color364 font32" @click="getCode" :disabled="disabled">{{codeName}}</button>
			</view>
			<view class="wx-bind confirm" @click="bindZFB" :class="noClick?'noClick':''">绑定支付宝</view>
		</view>
	</view>
</template>

<script>
	import {
		phone
	} from "../../../utils/check.js";
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				choosed: '',//2 微信
				codeName: '获取验证码',
				alipayName:'',
				alipayCode: '',
				disabled: false,
				codeVal: '',
				timer: null,
				noClick: false,
				onlineCode: '',
			};
		},
		onLoad(options) {
			console.log(options)
			this.choosed = options.type;
			if (options.type == 2) {
				uni.setNavigationBarTitle({
					title: '绑定微信'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '绑定支付宝'
				})
			}
		},
		computed: {
			...mapState(['userinfo'])
		},
		methods: {
			...mapMutations(['setuserinfo']),
			...mapActions(['getUserInfo']),
			bindWX() {
				let that = this;
				console.log(that.userinfo)
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes.userInfo);
								that.getBind({
									userId: that.userinfo.id, //用户id
									wechatHeadImg: infoRes.userInfo.avatarUrl, //微信头像(提现)		
									wechatOpenid: infoRes.userInfo.openId, //微信openid(提现)		
									wechatNickName: infoRes.userInfo.nickName, //微信昵称(提现)
								})
							},
							fail(err) {
								console.log(err);
							}
						});
					}
				});
			},
			getCode() {
				console.log(phone(this.alipayCode))
				if (phone(this.alipayCode)) {
					this.setTimer();
					this.post(this.apis.sendMessage, {
						phone: this.alipayCode,
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
				}else{
					this.$toast('请输入正确的手机号')
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
			bindZFB(){
				let that = this;
				if (!this.alipayName) {
					this.$toast('请输入姓名');
					return;
				}
				if (phone(this.alipayCode)) {
					if (!this.codeVal) {
						this.$toast('验证码不能为空');
						return;
					}
					if (this.codeVal != this.onlineCode) {
						this.$toast('验证码错误');
						return;
					}
					this.noClick = true;
					that.getBind({
						userId: that.userinfo.id, //用户id
						alipayName:that.alipayName,//阿里姓名
						alipayCode:that.alipayCode,//阿里手机号
					});
				}else{
					this.$toast('请输入正确的手机号')
				}
			},
			getBind(data) {
				this.post(this.apis.userBindAccount, data).then(res => {
					if (res.code == 0) {
						console.log(res)
						this.noClick = false;
						this.getUserinfo();
					} else {
						this.$toast(res.msg);
						this.noClick = false;
					}
				})
			},
			getUserinfo() {
				let that = this;
				that.getUserInfo().then(res => {
					that.setuserinfo(res)
					that.$toast('绑定成功');
					setTimeout(() => {
						uni.navigateBack();
					}, 1000)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input {
		width: 680rpx;
		margin: 60rpx auto 0;
		border-bottom: 1px solid #F2F2F2;
		padding-bottom: 20rpx;
		>view{
			width: 200rpx;
		}
		input {
			flex: 1;
			font-size: 32rpx;
		}
	}
	.wx {
		flex-direction: column;
		padding-top: 100rpx;
	}

	.avatar {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}

	.wechatNickName {
		margin: 37rpx 0 0;
	}

	.wx-bind {
		width: 600rpx;
		height: 90rpx;
		line-height: 90rpx;
	}
	.confirm{
		margin-top:222rpx;
	}
</style>
