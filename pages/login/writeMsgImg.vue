<template>
	<view>
		<view class="process">
			<view class="success font24 colorfff" :style="{width:Math.floor((process-0)/15*100)+'%'}">
				<text>资料完成{{Math.floor((process-0)/15*100)}}%</text>
			</view>
		</view>
		<view class="flex item">
			<view class="img">
				<view class="font32 color818">个人主页封面照</view>
				<image :src="form.coverImg?form.coverImg:'../../static/image/addImg.png'" mode="aspectFill" class="imgS"
					@click="chooseImgC(1)"></image>
			</view>
			<view class="img">
				<view class="font32 color818">匹配页封面照</view>
				<image :src="form.matchImg?form.matchImg:'../../static/image/addImg.png'" mode="aspectFill" class="imgS"
					@click="chooseImgC(2)"></image>
			</view>
		</view>
		<view class="fixedBottom safeBottom">
			<view class="confirm" @click="confirm" :class="isClick?'noClick':''">立即提交</view>
		</view>
	</view>
</template>

<script>
	import {
		chooseImg
	} from "../../utils/check.js";
	import {mapMutations} from "vuex";
	export default {
		data() {
			return {
				process: 0,
				form: {},
				isClick: false
			};
		},
		watch: {
			form: {
				handler(newData) {
					let num = 0;
					for (let i in newData) {
						if (i != 'id'&&i!='targetCharacter'&& newData[i]) {
							num++;
						}
					}
					this.process = num;
				},
				deep: true
			},
		},
		onLoad(options) {
			this.form = JSON.parse(options.form);
		},
		methods: {
			...mapMutations(['setuserinfo']),
			chooseImgC(type) {
				// uni.showLoading({
				// 	mask:true
				// })
				chooseImg().then(res => {
					if (type == 1) {
						this.form.coverImg = res;
					} else {
						this.form.matchImg = res;
					}
					// uni.hideLoading()
				});
			},
			confirm() {
				if (!this.form.coverImg || !this.form.matchImg) {
					this.$toast('请上传封面照');
					return;
				}
				this.isClick = true;
				this.post(this.apis.editUser, this.form).then(res => {
					if (res.code == 0) {
						this.$toast('资料上传成功');
						this.setuserinfo(res.data);
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1000)
					} else {
						this.isClick = false;
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
	}

	.item {
		margin: 30rpx;

		.img {
			width: 50%;

			>view {
				margin-bottom: 44rpx;
				font-weight: 500;
			}

			.imgS {
				width: 186rpx;
				height: 186rpx;
			}
		}
	}

	.process {
		width: 100%;
		height: 50rpx;
		background: #F4F4F4;

		>view {
			padding: 0 30rpx;
			background: #FF4364;
			height: 100%;
			line-height: 50rpx;
		}
	}
</style>
