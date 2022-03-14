<template>
	<view>
		<view class="status_bar"></view>
		<view class="navbar flex area-between">
			<view class="color999 font34" @click="back">取消</view>
			<view class="colorfff font26 sure" @click="issue" :class="noClick?'noClick':''">发布</view>
		</view>
		<view class="content">
			<textarea v-model="content" placeholder="说点什么吧..." class="font32" />
			<uploadActive @getFile="getFile"></uploadActive>
			<view class="flex font26 place" @click="choosePlace">
				<image src="../../static/image/place-gray.png" mode=""></image>
				<view class="">
					{{!position?'所在位置':position}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uploadActive from "../../components/uploadalbum/uploadActive.vue";
	export default {
		data() {
			return {
				photo: '',
				annexUrl: '',
				type: '', //1动态2节目
				content: '',
				position: '',
				positionLongitude: '',
				positionLatitude: '',
				noClick: false
			};
		},
		components: {
			uploadActive
		},
		onLoad(options) {
			this.type = options.type;
		},
		methods: {
			getImg(data) {
				//获取图片
				this.photo = data.join(',');
			},
			choosePlace() {
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						that.positionLongitude = res.longitude;
						that.positionLatitude = res.latitude;
						uni.request({
							url: `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${res.longitude},${res.latitude}&key=77e29f0b6ceb60a9fb6f6e55bc1a340e`,
							method: 'GET',
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							success(request) {
								if (request.data.status == 1) {
									that.position = request.data.regeocode.addressComponent.city +
										' ' + res.name;
								}
							},
							fail(error) {
								console.log(error)
							}
						})
					}
				});
			},
			getFile(data) {
				console.log(data);
				this.annexUrl = JSON.stringify(data);
			},
			back() {
				uni.navigateBack();
			},
			issue() {
				if (!this.content) {
					this.$toast('请输入发布内容');
					return;
				}
				this.noClick = true;
				this.post(this.apis.addDynamic, {
					userId: uni.getStorageSync('cityUserid'),
					type: this.type,
					content: this.content,
					annexUrl: this.annexUrl,
					position: this.position,
					positionLongitude: this.positionLongitude,
					positionLatitude: this.positionLatitude
				}).then(res => {
					if (res.code == 0) {
						this.$toast('发布成功');
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2];
						console.log(prevPage)
						if(prevPage.route=='pages/dynamic/dynamic'){
							prevPage.$vm.pageNum=1;
							prevPage.$vm.getDynamic();
						}
						setTimeout(() => {
							uni.navigateBack();
						}, 1500)
					} else {
						this.noClick = false;
						this.$toast(res.msg);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 30rpx;

		textarea {
			width: 100%;
			padding: 30rpx 0;
		}

		.place {
			padding:6rpx 18rpx;
			width: fit-content;
			>image {
				width: 29rpx;
				height: 33rpx;
				margin-right: 13rpx;
				margin-top:4rpx;
			}
			>view{
				flex:1;
			}
			color: #7B7B7B;
			background: #FFFFFF;
			border: 2rpx solid #E6E6E6;
			border-radius: 30rpx;
			margin:25rpx 0 0;
		}
	}

	.navbar {
		height: 100rpx;
		padding: 0 30rpx;
		box-shadow: 0px 0px 40rpx 0px rgba(239, 239, 239, 0.42);

		.sure {
			width: 110rpx;
			height: 60rpx;
			line-height: 60rpx;
			background: #FF4364;
			box-shadow: 0px 8rpx 21rpx 0px rgba(254, 65, 103, 0.34);
			border-radius: 30rpx;
			text-align: center;
		}
	}
</style>
