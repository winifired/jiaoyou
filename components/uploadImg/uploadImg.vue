<template>
	<view class="uploadImg">
		<view v-for="(item,index) in fullurl" :key="index">
			<image :src="item" class="img" mode="aspectFill" @click="prevImg(index)"></image>
			<uni-icons type="clear" size="24" color="#CDCDCD" @click="removeImg(index)" v-if="isEdit" class="remove"></uni-icons>
		</view>
		<view class="upLoad" @click="getscope" v-if="maxImg==-1||fullurl.length<maxImg">
			<image src="../../static/image/addImg.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uploadImg",
		props: {
			imagesUrl: {
				type: Array,
				default: () => [],
			},
			isEdit: {
				// 是否删除
				type: Boolean,
				default: true
			},
			count: {
				// 一次可选择数量
				type: Number,
				default: 9
			},
			maxImg: {
				// 最多可上传数量 -1不限量
				type: Number,
				default: -1
			},
		},
		data() {
			return {
				fullurl: [], //完整路径
			};
		},
		mounted() {
			if (this.imagesUrl.length > 0) this.fullurl = this.imagesUrl;
		},
		methods: {
			prevImg(index) {
				let that = this;
				uni.previewImage({
					longPressActions: {
						itemList: ['快与TA聊聊吧~'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					current: index,
					urls: that.fullurl,
				})
			},
			removeImg(index) {
				this.fullurl.splice(index, 1);
				this.$emit('getImg', this.fullurl);
				// 已删除 提示
			},
			getscope() {
				//获取授权
				let that = this;
				// #ifndef APP-PLUS||H5||MP-WEIXIN
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.camera']) {
							that.addImg()
						} else {
							uni.authorize({
								scope: "scope.camera",
								success() {
									that.addImg()
								},
								fail() {
									uni.showToast({
										title: '您拒绝了授权摄像头',
										icon: 'none'
									})
								}
							});
						}
					},
					fail(res) {
						console.log(`getSetting 调用失败`);
					},
				});
				// #endif
				// #ifdef APP-PLUS||H5||MP-WEIXIN
				that.addImg();
				// #endif
			},
			addImg() {
				let that = this;
				uni.chooseImage({
					count: this.maxImg==-1?this.count:1,
					success: (chooseImageRes) => {
						let tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
						if (tempFilePaths.length <= 0) return;
						uni.showLoading();
						tempFilePaths.map(item => {
							// #ifdef MP-TOUTIAO
							// 字节跳动
							uni.saveFile({
								tempFilePath: item,
								success(res) {
									that.uploadFile(res.savedFilePath);
								},
								fail(res) {
									console.log("保存失败", res.errMsg);
									uni.showToast({
										title: '保存失败' + res.errMsg,
										icon: 'none'
									})
								},
							});
							// #endif
							// #ifndef MP-TOUTIAO
							that.uploadFile(item)
							// #endif
						})
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			uploadFile(item) {
				let that = this;
				uni.uploadFile({
					url: that.apis.upload,
					filePath: item,
					name: 'file',
					success: (uploadFileRes) => {
						console.log(uploadFileRes)
						// #ifdef MP-BAIDU
						// 百度小程序
						that.fullurl.push(uploadFileRes.data.url);
						// #endif
						// #ifndef MP-BAIDU
						that.fullurl.push(JSON.parse(uploadFileRes.data).url);
						// #endif
						uni.hideLoading();
						that.$emit('getImg', that.fullurl);
					},
					fail(err) {
						console.log(err)
						uni.hideLoading();
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uploadImg {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.uploadImg>view {
		width: 186rpx;
		height: 186rpx;
		background: #F8F8F8;
		border-radius: 12rpx;
		margin-top: 20rpx;
		margin-right: 30rpx;
		position: relative;
	}

	.img {
		width: 100%;
		height: 100%;
		z-index: 3;
		border-radius: 20rpx;
	}

	.upLoad {
		background: none !important;

		>image {
			border-radius: 12rpx;
			width: 186rpx;
			height: 186rpx;
		}
	}

	.remove {
		position: absolute;
		top: -10rpx;
		right: -16rpx;
		z-index: 4;
	}
</style>
