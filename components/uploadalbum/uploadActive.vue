<template>
	<view class="uploadImg">
		<view v-for="(item,index) in fullurl" :key="index">
			<image :src="item.url" class="img" mode="aspectFill" @click="prevImg(item.url)" v-if="item.type==1"></image>
			<view class="img" v-if="item.type==2" @click="prevVideo(item.url)">
				<image :src="item.videoCover" class="img" mode="aspectFill"></image>
				<image src="../../static/image/playIcon.png" mode="" class="playIcon"></image>
			</view>
			<uni-icons type="clear" size="24" color="#CDCDCD" @click="removeImg(item.id,index)" class="remove">
			</uni-icons>
		</view>
		<view class="upLoad" @click="addImg">
			<image src="../../static/image/addImg.png" mode=""></image>
		</view>
		<uni-popup ref="videoUrlModel" type="center" :safe-area="false">
			<view>
				<video :src="videoUrl" controls autoplay style="width: 600rpx"></video>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "uploadalbum",
		props: {
			imagesUrl: {
				type: Array,
				default: () => [],
			},
			count: {
				// 一次可选择数量
				type: Number,
				default: 9
			},
		},
		data() {
			return {
				fullurl: [], //完整路径
				videoUrl: '',
			};
		},
		watch: {
			imagesUrl(newData) {
				this.fullurl = newData;
			}
		},
		mounted() {
			if (this.imagesUrl.length > 0) this.fullurl = this.imagesUrl;
		},
		methods: {
			prevVideo(url) {
				this.videoUrl = url;
				this.$refs.videoUrlModel.open();
			},
			prevImg(url) {
				let that = this,
					arr = [];
				that.fullurl.map(item => {
					if (item.type == 1) {
						arr.push(item.url)
					}
				})
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
					current: url,
					urls: arr,
				})
			},
			removeImg(id, index) {
				this.fullurl.splice(index, 1);
				this.$emit('getFile', this.fullurl)
			},
			addImg() {
				let that = this;
				uni.showActionSheet({
					itemList: ['图片', '视频'],
					success: function(res) {
						if (res.tapIndex == 0) {
							that.chooseImg();
						} else {
							that.chooseVideo();
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			chooseImg() {
				let that = this;
				uni.chooseImage({
					count: this.count,
					success: (chooseImageRes) => {
						let tempFilePaths = chooseImageRes.tempFilePaths;
						if (tempFilePaths.length <= 0) return;
						uni.showLoading();
						tempFilePaths.map(item => {
							that.uploadFile(item, 1)
						})
					},
					fail(err) {
						console.log(err)
					}
				});
			},
			chooseVideo() {
				let that = this;
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: function(res) {
						uni.showLoading();
						that.uploadFile2(res.tempFilePath, 2)
					}
				});
			},
			uploadFile(item, type) {
				let that = this;
				uni.uploadFile({
					url: that.apis.upload,
					filePath: item,
					name: 'file',
					success: (uploadFileRes) => {
						that.fullurl.push({
							type: type,
							url: JSON.parse(uploadFileRes.data).url
						});
						that.$emit('getFile', that.fullurl)
						uni.hideLoading();
					},
					fail(err) {
						uni.hideLoading();
					}
				});
			},
			uploadFile2(item, type) {
				uni.showLoading({
					mask: true
				});
				console.log(item)
				let that = this;
				uni.uploadFile({
					url: that.apis.uploadVideo,
					filePath: item,
					name: 'file',
					success: (uploadFileRes) => {
						uni.hideLoading();
						console.log(uploadFileRes)
						let data=JSON.parse(uploadFileRes.data);
						if (data.code == 0) {
							that.fullurl.push({
								type: type,
								url: data.url,
								videoCover: data.fetchUrl
							});
							that.$emit('getFile', that.fullurl)
						} else {
							that.$toast(data.msg)
						}
					},
					fail(err) {
						uni.hideLoading();
					}
				});
			},
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
		position: relative;
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
