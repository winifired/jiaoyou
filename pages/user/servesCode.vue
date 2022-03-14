<template>
	<view class="servesCode flex row-center">
		<view class="title colorfff">微信公众号客服</view>
		<image :src="qrCode" mode="" class="serveice"></image>
		<view class="font30 colorfff">扫一扫</view>
		<view class="font30 colorfff bottom">关注城市猎人微信公众号</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrCode:''
			};
		},
		onLoad() {
			this.getData();
		},
		methods:{
			getData(){
				this.post(this.apis.paramInfo).then(res => {
					if (res.code == 0) {
						this.qrCode=res.data.qrCode;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.servesCode {
		min-height: 100vh;
		background: linear-gradient(0deg, #FC4A73, #FD0E51);
		flex-direction: column;
		padding-top: calc(var(--window-top) + 100rpx);

		.title {
			font-size: 56rpx;
		}

		.serveice {
			margin: 85rpx 0 28rpx;
		}

		.bottom {
			margin: 11rpx 0 0;
		}
	}
</style>
