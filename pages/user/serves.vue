<template>
	<view class="tab-else">
		<navigator hover-class="none" url="/pages/user/servesCode" class="flex area-between colorb1b font32">
			<text>微信公众号客服</text>
			<view class="flex row-center color666">
				<image src="../../static/image/serveice.png" mode="" class="icon48"></image>
				<image src="../../static/image/right-gray.png" mode="" class="right"></image>
			</view>
		</navigator>
		<view class="flex area-between colorb1b font32" @click="open">
			<text>官方客服电话</text>
			<view class="flex row-center color666">
				{{customerPhone}}
			</view>
		</view>
		<view class="flex area-between colorb1b font32">
			<text>官服微信号</text>
			<view class="flex row-center color666">
				{{customerWechat}}
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="model safeBottom">
				<view class="item">
					<view class="font34 color000">{{customerPhone}}</view>
					<view class="font34 color000" @click="makePhone">呼叫</view>
				</view>
				<view class="close font34 color666" @click="close">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customerPhone: '',
				customerWechat: '',
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				this.post(this.apis.paramInfo).then(res => {
					if (res.code == 0) {
						this.customerPhone = res.data.customerPhone;
						this.customerWechat = res.data.customerWechat;
					}
				})
			},
			makePhone(){
				uni.makePhoneCall({
					 phoneNumber: this.customerPhone
				})
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model {
		.item {
			width: 689rpx;
			height: 200rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			margin: 0 auto;

			>view {
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
			}

			>view:nth-child(1) {
				border-bottom: 1px solid #F0F0F0
			}
		}

		.close {
			width: 689rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			background: #F0F0F0;
			border-radius: 30rpx;
			margin: 5rpx auto 0;
		}
	}

	.tab-else {
		.right {
			width: 16rpx;
			height: 30rpx;
			margin-left: 13rpx;
		}

		>.flex {
			padding: 0 30rpx;
			height: 109rpx;

			text {
				font-weight: 500;
			}
		}

		>.flex:not(:last-child) {
			border-bottom: 1px solid #F8F8F8;
		}
	}
</style>
