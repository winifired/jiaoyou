<template>
	<view class="widthdraw">
		<view class="recharge">
			<view class="card">
				<view class="font30 title">提现金额 <text
						class="font28 color999">（提现将收取{{cashOutFee}}%手续费，提现比例1:1）</text> </view>
				<input type="digit" v-model="number" placeholder="0.00" placeholder-class="placeholder" />
				<view class="font28 color666">申请提现审核通过后48小时内到账</view>
			</view>
			<view class="pay-type">
				<view class="name font34 colo">提现方式</view>
				<view class="pay flex area-around">
					<view class="type flex area-center" @click="choosed=2" :class="choosed==2?'choosed':''">
						<image src="../../../static/image/wx-pay.png" mode="" class="payIcon"></image>微信提现
						<image src="../../../static/image/right-bottom.png" mode="" class="right-bottom"
							v-if="choosed==2">
						</image>
					</view>
					<view class="type flex area-center" @click="choosed=3" :class="choosed==3?'choosed':''">
						<image src="../../../static/image/zfb.png" mode="" class="payIcon"></image>支付宝提现
						<image src="../../../static/image/right-bottom.png" mode="" class="right-bottom"
							v-if="choosed==3">
						</image>
					</view>
				</view>
				<view class="flex area-between bindAccount" @click="bindAccount">
					<view class="font32 color101">绑定{{choosed==2?'微信':'支付宝'}}</view>
					<view class="flex row-center font32 color666" v-if="choosed==2">{{userinfo&&userinfo.wechatOpenid?'已':'去'}}绑定
						<image src="../../../static/image/right-gray.png" mode="" class="right-gray"></image>
					</view>
					<view class="flex row-center font32 color666" v-if="choosed==3">{{userinfo&&userinfo.alipayCode?'已':'去'}}绑定
						<image src="../../../static/image/right-gray.png" mode="" class="right-gray"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="fixedBottom safeBottom flex area-between">
			<view class="font30 color333">提现金额：<text class="font26 color364">¥</text><text
					class="font38 color364">{{number||0}}</text></view>
			<view class="confirm" @click="confirm" :class="isClick?'noClick':''">立即提现</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				choosed: 2,
				number: '',
				total: 0,
				cashOutFee: 0, //提现手续费
				isClick: false
			};
		},
		onLoad() {
			this.getData();
		},
		computed:{
			...mapState(['userinfo'])
		},
		methods: {
			getData() {
				this.post(this.apis.paramInfo).then(res => {
					this.cashOutFee = res.data.cashOutFee;
				})
			},
			confirm() {
				if (!this.number) {
					this.$toast('请输入提现金额');
					return;
				}
				this.isClick = true;
				this.post(this.apis.balanceCash, {
					userId: uni.getStorageSync('cityUserid'),
					monery: this.number,
					cashWay: this.choosed, //2微信3支付宝复
				}).then(res => {
					this.$toast(res.msg);
					this.isClick = false;
					if (res.code == 0) {
						setTimeout(() => {
							uni.navigateBack();
						}, 1500)
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2];
						prevPage.$vm.getData();
					}
				})
			},
			bindAccount() {
				uni.navigateTo({
					url: '/pages/user/wallet/bindAccount?type=' + this.choosed
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bindAccount {
		margin: 50rpx 16rpx 0;
	}

	.right-gray {
		width: 13rpx;
		height: 23rpx;
		margin-left: 12rpx;
	}

	.fixedBottom {
		padding-top: 20rpx;
		padding-right: 30rpx;
		padding-left: 40rpx;
	}

	.confirm {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0;
	}

	.pay-type {
		height: 311rpx;
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

	.widthdraw {
		min-height: calc(100vh - var(--window-top));
		background: #F4F6F7;
	}

	.recharge {
		padding: 26rpx 21rpx 0;

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
				margin: 36rpx 0 24rpx;
				height: 70rpx;
				line-height: 70rpx;
			}

			.placeholder {
				color: #E9E9E9;
			}
		}
	}
</style>
