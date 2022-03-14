<template>
	<view class="uploadImg">
		<view v-for="(item,index) in fullurl" :key="index">
			<image :src="item.imgUrl" class="img" mode="aspectFill" @click="prevImg(index)"></image>
			<uni-icons type="clear" size="24" color="#CDCDCD" @click="removeImg(item.id,index)" class="remove"></uni-icons>
		</view>
		<view class="upLoad" @click="addImg">
			<image src="../../static/image/addImg.png" mode=""></image>
		</view>
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
			};
		},
		watch:{
			imagesUrl(newData){
				this.fullurl = newData;
			}
		},
		mounted() {
			if (this.imagesUrl.length > 0) this.fullurl = this.imagesUrl;
		},
		methods: {
			prevImg(index) {
				let that = this,arr=[];
				that.fullurl.map(item=>{
					arr.push(item.imgUrl)
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
					current: index,
					urls:arr,
				})
			},
			removeImg(id,index) {
				this.post(this.apis.delalbum,{
					userId:uni.getStorageSync('cityUserid'),
					albumId:id
				}).then(res=>{
					if(res.code==0){
						this.fullurl.splice(index, 1);
					}else{
						this.$toast(res.msg)
					}
				})
				// 已删除
			},
			addImg() {
				let that = this;
				uni.chooseImage({
					count: this.count,
					success: (chooseImageRes) => {
						let tempFilePaths = chooseImageRes.tempFilePaths;
						if (tempFilePaths.length <= 0) return;
						uni.showLoading();
						tempFilePaths.map(item => {
							that.uploadFile(item)
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
						that.uploadAlbum(JSON.parse(uploadFileRes.data).url);
					},
					fail(err) {
						uni.hideLoading();
					}
				});
			},
			uploadAlbum(url){
				this.post(this.apis.addAlbum,{
					userId:uni.getStorageSync('cityUserid'),
					imgUrl:url
				}).then(res=>{
					uni.hideLoading();
					if(res.code==0){
						this.fullurl.unshift(res.data);
						console.log(this.fullurl)
					}
				})
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
