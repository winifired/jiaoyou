<template>
	<view class="invite-detail" v-if="info">
		<view class="flex area-between user-msg">
			<view class="user flex row-center">
				<image :src="info.headImg" mode=""></image>
				<view class="name">
					<view class="font38 colorfff ">{{info.nickName}}</view>
					<!-- <view class="code flex row-center">
						<text class="font24 colorfff">邀请码：{{info.inviteCode}}</text>
						<view class="font24 copy" @click="copy">复制</view>
					</view> -->
				</view>
			</view>
			<image :src="info.dowQrCode" mode="" class="code-img"></image>
		</view>
		<view class="flex area-between acount">
			<view class="number flex area-center">
				<view class="color000">{{info.inviteNum}}</view>
				<view class="color333 font24">我邀请的用户</view>
			</view>
			<view class="number flex area-center">
				<view class="color000">{{info.totalProfit}}</view>
				<view class="color333 font24">我的总收益</view>
			</view>
		</view>
		<view class="flex area-between acount">
			<view class="number flex area-center">
				<view class="color000 font30">一级用户</view>
				<view class="color000 font38">{{info.oneUserNum}}人</view>
			</view>
			<view class="number flex area-center">
				<view class="color000 font30">一级收益</view>
				<view class="color000 font38">{{info.oneUserProfit}}</view>
			</view>
		</view>
		<view class="flex area-between acount">
			<view class="number flex area-center">
				<view class="color000 font30">二级用户</view>
				<view class="color000 font38">{{info.twoUserNum}}人</view>
			</view>
			<view class="number flex area-center">
				<view class="color000 font30">二级收益</view>
				<view class="color000 font38">{{info.twoUserProfit}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				this.post(this.apis.meinvite, {
					userId: uni.getStorageSync('cityUserid'),
				}).then(res => {
					if (res.code == 0) {
						this.info = res.data;
					} else {
						this.$toast(res.msg);
					}
				})
			},
			copy() {
				let that = this;
				uni.setClipboardData({
					data: this.info.inviteCode,
					success: function() {}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.acount {
		margin: 53rpx auto 22rpx;
		width: 690rpx;
		height: 210rpx;
		background: #FFFFFF;
		border-radius: 20rpx;

		.number {
			width: 50%;
			position: relative;
			flex-direction: column;

			>view:nth-child(1) {
				font-size: 60rpx;
				font-family: DIN;
				font-weight: 500;
				margin-bottom: 22rpx;
			}
		}

		.number:nth-child(1):after {
			position: absolute;
			content: '';
			width: 1rpx;
			height: 50rpx;
			background: #E7E7E7;
			top: 50%;
			transform: translateY(-50%);
			right: 0;
		}
	}

	.acount:not(:nth-child(2)) {
		margin-top: 0 !important;

		.number {
			>view:nth-child(1) {
				font-size: 30rpx !important;
			}
		}
	}

	.user-msg {
		padding: 0 30rpx;
		padding-top: calc(var(--window-top) + 30rpx);

		.code-img {
			width: 102rpx;
			height: 102rpx;
		}

		.user {
			>image {
				width: 122rpx;
				height: 122rpx;
				margin-right: 22rpx;
			}

			.name {
				.code {
					margin: 29rpx 0 0;
					padding: 0 0 0 25rpx;
					height: 38rpx;
					border: 1px solid rgba(255, 255, 255, .5);
					border-radius: 19rpx;

					.copy {
						width: 73rpx;
						height: 38rpx;
						background: rgba(255, 255, 255, .8);
						border-radius: 0 19rpx 19rpx 0;
						color: #FD245E;
						line-height: 38rpx;
						text-align: center;
						margin-left: 17rpx;
					}
				}
			}
		}
	}

	.invite-detail {
		background: linear-gradient(180deg, #FC4A73, #FD0E51) no-repeat;
		background-size: 100% 434rpx;
		background-color: #F5F5F5;
		min-height: 100vh;
	}
</style>
