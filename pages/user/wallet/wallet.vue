<template>
	<view class="wallet">
		<view class="card">
			<view class="font24 colorfff">余额</view>
			<view class="number colorfff">{{userinfo.balance}}</view>
			<view class="flex column-end btns">
				<navigator url="/pages/user/wallet/recharge" hover-class="none" class="item font28 colorfff">充值
				</navigator>
				<navigator url="/pages/user/wallet/withdraw" hover-class="none" class="item font28 colorfff">提现
				</navigator>
			</view>
		</view>
		<view class="title font34">账单明细</view>
		<view class="list">
			<view v-for="(item,index) in list" :key="index">
				<view class="name flex area-between">
					<text class="font30 color333">{{item.recordType}}</text>
					<text class="font38 color364">{{item.money}}</text>
				</view>
				<view class="flex area-between font28 color999">
					<text>{{item.createTime}}</text>
					<text>余额 {{item.balance}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				list: []
			};
		},
		computed: {
			...mapState(['userinfo', 'userid'])
		},
		onLoad() {
			this.getData();
		},
		methods:{
			getData() {
				this.post(this.apis.billdetails, {
					userId: this.userid
				}).then(res => {
					if (res.code == 0) {
						this.list = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		>view {
			padding: 28rpx 0 20rpx;
			border-bottom: 1px solid #EBEBEB;

			.name {
				margin: 0 0 14rpx;
			}
		}
	}

	.wallet {
		padding: 26rpx 30rpx 0;
		min-height: calc(100vh - var(--window-top));
		background: #F9F9F9;

		.title {
			color: #141414;
			margin: 42rpx 0 0;
		}

		.card {
			width: 689rpx;
			height: 308rpx;
			background: no-repeat url(../../../static/image/wallet-bg.png);
			background-size: 100% 100%;
			box-shadow: 0px 11rpx 36rpx 4rpx rgba(255, 67, 100, 0.3);
			padding: 30rpx 25rpx 0 47rpx;
			border-radius: 30rpx;

			.number {
				font-size: 72rpx;
				font-family: DIN;
				font-weight: 500;
				margin: 13rpx 0 0;
			}

			.btns {
				margin: 23rpx 0 0;

				.item {
					width: 130rpx;
					height: 66rpx;
					background: rgba(255, 255, 255, .25);
					border-radius: 33rpx;
					line-height: 66rpx;
					text-align: center;
				}

				.item:nth-child(2) {
					border: 2px solid rgba(255, 255, 255, .5);
					background: none;
					margin-left: 13rpx;
				}
			}
		}
	}
</style>
