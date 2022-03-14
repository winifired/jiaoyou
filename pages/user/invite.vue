<template>
	<view class="invite">
		<uni-nav-bar left-icon="back" :statusBar="true" color="#ffffff" title="邀请有礼" backgroundColor="rgba(0,0,0,0)"
			:border="false" :fixed="true" @clickLeft="clickLeft" @clickRight="clickRight">
		</uni-nav-bar>
		<view class="content" v-if="info">
			<image src="../../static/image/invite-01.png" mode="" class="invite-01"></image>
			<view class="content-msg">
				<image src="../../static/image/invite-02.png" mode="" class="invite-02"></image>
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
				<view class="flex area-center codeImg">
					<view class="codeImg-left">
						<text class="font32 color333">我的邀请码</text>
					</view>
					<image :src="info.dowQrCode" mode="" @click="prevImg"></image>
				</view>
				<navigator url="/pages/user/invite-detail" hover-class="none" class="confirm">查看详情</navigator>
			</view>
			<view class="rule">
				<view class="flex area-center title">
					<view class="line"></view>
					<view class="font34 colorfff">邀请规则说明</view>
					<view class="line"></view>
				</view>
				<view class="rule-cont">
					<view class="" v-html="inviteRuleinfo"></view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :safe-area="false">
			<view class="model flex column-center">
				<view class="flex column-bwn">
					<view class="font38 colora1a">请输入您的邀请码</view>
					<text class="font28 color999" @click="close">取消</text>
				</view>
				<view class="flex area-between input">
					<input type="text" v-model="code" />
					<view class="save font30 colorfff" @click="confirm">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				info: null,
				inviteRuleinfo: ''
			};
		},
		onLoad() {
			this.getData();
			this.getinvite();
		},
		methods: {
			prevImg() {
				let that=this;
				uni.previewImage({
					urls: [that.info.dowQrCode],
					// longPressActions: {
					// 	itemList: ['保存图片'],
					// 	success: function(data) {
					// 		if (data.tapIndex == 0) {
					// 			uni.getImageInfo({
					// 				src: that.info.dowQrCode,
					// 				success: function(image) {
					// 					uni.saveImageToPhotosAlbum({
					// 						filePath: image.path,
					// 						success: function() {
					// 							// console.log('save success');
					// 							that.$toast('保存成功')
					// 						}
					// 					});
					// 				}
					// 			});
					// 		}
					// 	},
					// 	fail: function(err) {
					// 		console.log(err.errMsg);
					// 	}
					// }
				});
			},
			getData() {
				this.post(this.apis.meinvite, {
					userId: uni.getStorageSync('cityUserid'),
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.info = res.data;
					} else {
						this.$toast(res.msg);
					}
				})
			},
			getinvite() {
				this.post(this.apis.invite, {
					userId: uni.getStorageSync('cityUserid'),
				}).then(res => {
					if (res.code == 0) {
						this.inviteRuleinfo = res.data.inviteRule;
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
			confirm() {
				if (!this.code) {
					this.$toast('请输入邀请码');
					return;
				}
				this.post(this.apis.fillincode, {
					userId: uni.getStorageSync('cityUserid'),
					invitecode: this.code
				}).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						this.close();
					}
				})
			},
			close() {
				this.$refs.popup.close();
			},
			clickLeft() {
				uni.navigateBack();
			},
			clickRight() {
				this.$refs.popup.open();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model {
		width: 582rpx;
		height: 280rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		padding: 0 48rpx;
		flex-direction: column;

		.input {
			margin: 58rpx 0 0;

			input {
				width: 366rpx;
				height: 74rpx;
				background: #F2F2F2;
				border-radius: 12rpx;
				padding: 0 20rpx;
			}

			.save {
				width: 108rpx;
				height: 74rpx;
				text-align: center;
				line-height: 74rpx;
				background: #FF4364;
				border-radius: 12rpx;
				margin-left: 12rpx;
			}
		}
	}

	.content {
		.invite-01 {
			width: 496rpx;
			height: 55rpx;
			margin: 72rpx auto 62rpx;
		}

		.rule {
			margin: 62rpx 0 0;
			padding: 0 53rpx;

			.title {
				margin: 0 0 57rpx;

				.line {
					width: 127rpx;
					height: 1px;
					background: #FFFFFF;
				}

				.font34 {
					margin: 0 26rpx;
				}
			}

			&-cont {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 62rpx;
			}
		}

		&-msg {
			width: 690rpx;
			padding: 56rpx 30rpx 33rpx;
			background: #FFFFFF;
			border-radius: 30rpx;
			margin: 0 auto;

			.invite-02 {
				width: 235rpx;
				height: 55rpx;
				margin: 0 auto;
			}

			.acount {
				margin: 95rpx 0 60rpx;

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

			.codeImg {
				width: 630rpx;
				height: 213rpx;
				background: #FFEDF0;
				border-radius: 30rpx;
				padding: 27rpx 32rpx;
				flex-direction: column;

				>image {
					width: 158rpx;
					height: 158rpx;
				}

				&-left {
					.number {
						font-size: 50rpx;
						margin: 36rpx 0 0;

						text {
							margin-left: 26rpx;
						}
					}
				}
			}

			.confirm {
				width: 630rpx;
				height: 90rpx;
				line-height: 90rpx;
				background: linear-gradient(-90deg, #FD425C, #FD5964, #F7777D);
				border-radius: 45rpx;
				margin-top: 33rpx;
			}
		}
	}

	.navbarright {
		width: 200rpx;
		height: 76rpx;
		line-height: 76rpx;
		background: rgba(255, 255, 255, .25);
		border-radius: 38rpx 0 0 38rpx;
		font-size: 28rpx;
		text-align: center;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.invite {
		min-height: 100vh;
		background: no-repeat fixed url(../../static/image/invite-bg.png);
		background-size: 100% 100%;
	}
</style>
