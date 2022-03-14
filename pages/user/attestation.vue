<template>
	<view class="attestation">
		<view class="flex area-between tags">
			<view class="item" @click="openCamera">
				<image src="../../static/image/attestation-01.png" mode=""></image>
				<view class="font32 colorfff">{{userinfo.realFlag==0?'真人认证':(userinfo.realFlag==1?'已认证':'认证失败')}}</view>
			</view>
			<navigator hover-class="none" :url="userinfo.idolFlag!=1?'/pages/user/attestation-img':''" class="item">
				<image src="../../static/image/attestation-02.png" mode="" v-if="userinfo.sex=='女'"></image>
				<image src="../../static/image/attestation-03.png" mode="" v-if="userinfo.sex=='男'"></image>
				<view class="font32 colorfff">
					{{userinfo.idolFlag==0?userinfo.sex+'神认证':(userinfo.idolFlag==1?'已认证':'认证失败')}}
				</view>
			</navigator>
		</view>
		<view class="tip font36 color000">认证特权</view>
		<view class="flex rule">
			<image src="../../static/image/show.png" mode=""></image>
			<view class="content">
				<view class="font32 color000">真人认证特权</view>
				<view class="font28 color333 flex">
					<text>真人醒目标识</text>
					<text>优先推荐匹配</text>
					<text>更易获得信任</text>
					<text>线下免费沙龙</text>
				</view>
			</view>
		</view>
		<view class="flex rule" style="margin-top:70rpx;">
			<image src="../../static/image/show.png" mode=""></image>
			<view class="content">
				<view class="font32 color000">{{userinfo.sex}}神认证特权</view>
				<view class="font28 color333 flex">
					<text>{{userinfo.sex}}神醒目标识</text>
					<text>优先推荐匹配</text>
					<text>更易获得青睐</text>
					<text>线下免费沙龙</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				msg: {
					realGiveCoin: '', //真人认证赠送金币
					manGiveCoin: '', //男神认证赠送金币
					womanGiveCoin: '', //女神认证赠送金币
				},
				auditType: '',
				videoUrl: '',
				// 女神/男神标识  0未认证 1已认证 2认证失败
			};
		},
		computed: {
			...mapState(['userinfo']),
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				this.post(this.apis.paramInfo).then(res => {
					if (res.code == 0) {
						this.msg = {
							realGiveCoin: res.data.realGiveCoin, //真人认证赠送金币
							manGiveCoin: res.data.manGiveCoin, //男神认证赠送金币
							womanGiveCoin: res.data.womanGiveCoin, //女神认证赠送金币
						}
					}
				})
			},
			openCamera() {
				if (this.userinfo.realFlag == 1) {
					this.$toast('真人认证已通过');
					return;
				}
				// #ifdef APP-PLUS
				let that = this;
				var cmr = plus.camera.getCamera({
					index: 2
				});
				console.log(cmr);
				var res = cmr.supportedVideoResolutions[0];
				var fmt = cmr.supportedVideoFormats[0];
				cmr.startVideoCapture(function(path) {
						console.log(path)
						uni.showLoading({
							mask: true
						})
						uni.uploadFile({
							url: that.apis.upload,
							filePath: path,
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								that.videoUrl = JSON.parse(uploadFileRes.data).url;
								that.auditType = 1;
								that.uploadAtt();
							},
							fail(err) {
								console.log(err)
								uni.hideLoading();
							}
						});
					},
					function(error) {
						console.log(error)
					}, {
						resolution: res,
						format: fmt
					}
				);
				// #endif
				// #ifndef APP-PLUS
				let that = this;
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: function(res) {
						uni.showLoading();
						uni.uploadFile({
							url: that.apis.uploadVideo,
							filePath: res.tempFilePath,
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								that.videoUrl = JSON.parse(uploadFileRes.data).url;
								that.auditType = 1;
								that.uploadAtt();
							},
							fail(err) {
								uni.hideLoading();
							}
						});
					}
				});
				// #endif
			},
			uploadAtt() {
				this.post(this.apis.addUserAudit, {
					userId: uni.getStorageSync('cityUserid'),
					auditType: this.auditType, //认证类型 1、真人认证 2、男女神认证
					videoUrl: this.videoUrl
				}).then(res => {
					uni.hideLoading();
					if (res.code == 0) {
						this.$toast('真人认证已上传，请等待审核');
					} else {
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rule {
		padding-left: 40rpx;

		>image {
			width: 42rpx;
			height: 42rpx;
			margin-right: 19rpx;
		}

		.content {
			flex:1;
			>view:nth-child(1) {
				font-weight: 500;
				margin-bottom: 23rpx;
			}

			>view:nth-child(2) {
				text {
					position: relative;
					padding-left: 19rpx;
					margin-right: 47rpx;
				}
				text:before {
					position: absolute;
					left: 0;
					content: '';
					top: 14rpx;
					width: 10rpx;
					height: 10rpx;
					background: #FFD73A;
					border-radius: 50%;
				}
			}
		}
	}

	.attestation {
		padding: 18rpx 30rpx 0;

		.tip {
			position: relative;
			font-weight: 500;
			text-align: center;
			margin: 80rpx 0 70rpx;
		}

		.tip:after {
			position: absolute;
			bottom: -4rpx;
			width: 156rpx;
			height: 18rpx;
			background: rgba(255, 215, 58, .4);
			content: "";
			left: 50%;
			transform: translateX(-50%);
		}

		.tags {
			.item {
				width: 335rpx;
				background: #FFFFFF;
				border: 2rpx solid #F4A6D8;
				box-shadow: 0px 5rpx 43rpx 0px rgba(196, 196, 196, 0.22);
				border-radius: 24rpx;
				padding-top: 29rpx;

				>image {
					width: 200rpx;
					height: 200rpx;
					margin: 0 auto 26rpx;
				}

				>view {
					width: 335rpx;
					text-align: center;
					height: 80rpx;
					line-height: 80rpx;
					background: #F4A6D8;
					border-radius: 0px 0px 24rpx 24rpx;
				}
			}

			.item:nth-child(2) {
				border: 2rpx solid #FFC300;

				>view {
					background: #FFC300;
				}
			}
		}
	}
</style>
