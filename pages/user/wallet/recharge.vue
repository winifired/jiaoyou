<template>
	<view class="recharge">
		<view class="card">
			<view class="font30 title">请输入充值数量</view>
			<input type="digit" v-model="number" placeholder="0" placeholder-class="placeholder" />
			<view class="font28 color666">充值比例1个/元</view>
		</view>
		<view class="pay-type">
			<view class="name font34 colo">充值方式</view>
			<view class="pay flex area-around">
				<view class="type flex area-center" @click="choosed=2" :class="choosed==2?'choosed':''">
					<image src="../../../static/image/wx-pay.png" mode="" class="payIcon"></image>微信充值
					<image src="../../../static/image/right-bottom.png" mode="" class="right-bottom" v-if="choosed==2">
					</image>
				</view>
				<view class="type flex area-center" @click="choosed=3" :class="choosed==3?'choosed':''">
					<image src="../../../static/image/zfb.png" mode="" class="payIcon"></image>支付宝充值
					<image src="../../../static/image/right-bottom.png" mode="" class="right-bottom" v-if="choosed==3">
					</image>
				</view>
			</view>
		</view>

		<view class="confirm" @click="confirm">立即充值</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex";
	export default {
		data() {
			return {
				choosed: 2,
				number: ''
			};
		},
		onLoad() {},
		methods: {
			...mapActions(['getUserInfo']),
			confirm() {
				if (!this.number) {
					this.$toast('请输入充值金额');
					return;
				}
				this.post(this.apis.rechargeGold, {
					userId: uni.getStorageSync('cityUserid'),
					monery: this.number,
					payType: this.choosed, //2微信3支付宝复
				}).then(res => {
					if (res.code == 0) {
						console.log(res)
						this.opratePay(res.orderString);
					} else {
						this.$toast(res.msg);
					}
				})
				// this.$toast('充值成功，金币 +100')
			},
			opratePay(orderString) {
				let _this = this;
				let data = {
					provider: _this.choosed == 2 ? 'wxpay' : 'alipay',
					orderInfo: orderString,
				}
				console.log(data)
				uni.requestPayment({
					provider: _this.choosed == 2 ? 'wxpay' : 'alipay',
					orderInfo: orderString,
					success: function(value) {
						_this.$toast('充值成功，金币 +'+_this.number);
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
						let pages = getCurrentPages();
						let prevpage = pages[pages.length - 2];
						prevpage.$vm.getData();
						_this.uploadMoney();
					},
					fail: function(err) {
						_this.clickPay = false;
						console.log(err)
						_this.$toast('充值失败');
					}
				})
			},
			uploadMoney() {
				that.getUserInfo().then(res => {
					that.setuserinfo(res)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm {
		width: 600rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 94rpx;
	}

	.pay-type {
		height: 230rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 22rpx 0 0;
		padding: 25rpx 19rpx 0;
	}

	.pay {
		margin: 40rpx 0 0;

		.type {
			position: relative;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #010E1F;
			width: 301rpx;
			height: 78rpx;
			background: #F5F5F5;
			border-radius: 10rpx;

			.payIcon {
				width: 48rpx;
				height: 48rpx;
				margin-right: 10rpx;
			}

			.right-bottom {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 41rpx;
				height: 41rpx;
			}
		}

		.choosed {
			background: #FFFFFF;
			border: 1px solid #FF4364;
		}
	}

	.recharge {
		padding: 26rpx 21rpx 0;
		min-height: calc(100vh - var(--window-top));
		background: #F4F6F7;

		.card {
			width: 708rpx;
			height: 342rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 38rpx 35rpx 0;

			.title {
				color: #111111;
			}

			input {
				font-size: 72rpx;
				width: 409rpx;
				border-bottom: 1px solid #B4B4B4;
				margin: 57rpx 0 24rpx;
			}

			.placeholder {
				color: #E9E9E9;
			}
		}
	}
</style>
