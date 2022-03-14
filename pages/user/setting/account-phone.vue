<template>
	<view>
		<view class="title">修改手机号</view>
		<view class="title-sec font26">请输入您的新手机号</view>
		<view class="input flex row-center">
			<view class="font32 color666">+86</view>
			<input type="text" class="font32" v-model="phoneNumber" />
		</view>
		<view class="input flex row-center btn">
			<input type="text" class="font32" v-model="codeVal" />
			<button class="color364 font32" @click="getCode" :disabled="disabled">{{codeName}}</button>
		</view>
		<view class="confirm " @click="save" :class="noClick?'noClick':''">保存</view>
	</view>
</template>

<script>
	import {
		phone
	} from "../../../utils/check.js";
	import {
		mapState,
		mapMutations
	} from "vuex";
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
				checked: false
			};
		},
		computed: {
			...mapState(['userinfo', 'userid'])
		},
		components: {},
		methods: {
			...mapMutations(['setuserinfo']),
			save() {
				if (phone(this.phoneNumber)) {
					if (!this.codeVal) {
						this.$toast('验证码不能为空');
						return;
					}
					if (this.codeVal != this.onlineCode) {
						this.$toast('验证码错误');
						return;
					}
					this.noClick = true;
					this.post(this.apis.updatephone, {
						userId: this.userid,
						userName: this.phoneNumber
					}).then(res => {
						if (res.code == 0) {
							this.$toast('更换成功！');
							this.userinfo.userName=this.phoneNumber;
							this.setuserinfo(this.userinfo);
							setTimeout(() => {
								uni.navigateBack();
							}, 1000);
						} else {
							this.codeName = '获取验证码';
							this.disabled = false;
							clearInterval(this.timer);
							this.noClick = false;
						}
					});
				}
			},
			getCode() {
				console.log(phone(this.phoneNumber))
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 48rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 42rpx;
		padding: 100rpx 0 0 54rpx;
	}

	.title-sec {
		color: #878787;
		line-height: 42rpx;
		margin: 28rpx 0 140rpx;
		padding: 0 0 0 54rpx;
	}

	.input {
		width: 612rpx;
		margin: 60rpx auto 0;
		border-bottom: 1px solid #DDDDDD;
		padding-bottom: 20rpx;

		input {
			flex: 1;
			text-align: center;
			font-size: 32rpx;
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
		margin-top: 202rpx;
	}
</style>
