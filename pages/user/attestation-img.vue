<template>
	<view class="attestation-imgsafeBottom250">
		<view class="img">
			<view class="title font32 color818">请上传靓照 <text class="color999">（至少一张）</text> </view>
			<uploadImg @getImg="getImg" :imagesUrl="imgUrl"></uploadImg>
			<view class="title font32 color818 margin">请上传自拍视频</view>
			<view class="video" @click="chooseVideo">
				<video :src="videoUrl" controls v-if="videoUrl"></video>
				<image src="../../static/image/addImg.png" mode="" class='addImg'></image>
			</view>
		</view>
		<view class="fixedBottom safeBottom">
			<view class="confirm" :class="userinfo.idolFlag==1?'noClick':''" @click="uploadAtt">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import uploadImg from "../../components/uploadImg/uploadImg.vue"
	export default {
		data() {
			return {
				imgUrl:[],
				auditType:'',
				videoUrl:'',
			};
		},
		computed: {
			...mapState(['userinfo']),
		},
		onLoad() {
			if(this.userinfo&&this.userinfo.imgUrl){
				this.imgUrl=this.userinfo.imgUrl.split(',')
			}
			if(this.userinfo&&this.userinfo.videoUrl){
				this.videoUrl=this.userinfo.videoUrl
			}
			uni.setNavigationBarTitle({
				title: this.userinfo.sex + '神人证'
			})
		},
		components: {
			uploadImg
		},
		methods: {
			getImg(data) {
				this.imgUrl = data;
			},
			chooseVideo() {
				let that=this;
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: function(res) {
						uni.showLoading({
							mask:true
						})
						uni.uploadFile({
							url: that.apis.upload,
							filePath: res.tempFilePath,
							name: 'file',
							success: (uploadFileRes) => {
								uni.hideLoading();
								that.videoUrl=JSON.parse(uploadFileRes.data).url;
								that.auditType=2;
							},
							fail(err) {
								console.log(err)
								uni.hideLoading();
							}
						});
					}
				});
			},
			uploadAtt(){
				if(!this.imgUrl||!this.videoUrl){
					this.$toast('请上传认证的图片和视频');
					return;
				}
				uni.showLoading({
					mask:true
				});
				this.post(this.apis.addUserAudit,{
					userId:uni.getStorageSync('cityUserid'),
					auditType:this.auditType,//认证类型 1、真人认证 2、男女神认证
					videoUrl:this.videoUrl,
					imgUrl:this.imgUrl.join(','),
				}).then(res=>{
					uni.hideLoading();
					if(res.code==0){
						this.$toast(this.userinfo.sex+'神认证已上传，请等待审核');
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}else{
						this.$toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
	}

	.img {
		padding: 44rpx 0 0 30rpx;

		.title {
			margin: 0 0 24rpx;

			text {
				margin-left: 32rpx;
			}
		}

		.margin {
			margin: 70rpx 0 44rpx;
		}

		.addImg {
			width: 186rpx;
			height: 186rpx;
		}
	}
	.video{
		width: 320rpx;
		height: 186rpx;
	}
</style>
