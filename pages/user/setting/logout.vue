<template>
	<view>
		<view class="title">请选择注销账号原因</view>
		<view class="title-sec font26">请谨慎操作，账号注销后将清空所有个人资料及匹配信息</view>
		<view class="list">
			<view v-for="(item,index) in nav" :key="index" class="flex area-between">
				<text class="color000 font32">{{item}}</text>
				<image src="../../../static/image/choosed.png" mode="" v-if="choosed==index"></image>
				<image src="../../../static/image/choose.png" mode="" v-else></image>
			</view>
		</view>
		<view class="fixedBottom safeBottom">
			<view class="confirm" @click="save" :class="noClick?'noClick':''">提交</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from "vuex";
	export default {
		data() {
			return {
				nav: ['已找到喜欢的对象', '想换个账号重新开始', '不喜欢APP', '对推荐质量不满意', '其他'],
				choosed: 0,
				noClick:false
			};
		},
		methods:{
			...mapMutations(['clearData']),
			save(){
				this.noClick = true;
				this.post(this.apis.logout, {
					userId:uni.getStorageSync('cityUserid'),
					cancelReason:this.nav[this.choosed],
				}).then(res => {
					if (res.code == 0) {
						this.$toast('注销成功！');
						uni.clearStorageSync();
						this.clearData();
						uni.$TUIKit.logout();
						uni.$TUICalling.logout();
						uni.reLaunch({
							url:'/pages/login/login'
						})
					} else {
						this.noClick = false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 48rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 42rpx;
		padding: 100rpx 0 0 54rpx;
	}

	.title-sec {
		color: #878787;
		line-height: 42rpx;
		margin: 28rpx 0 140rpx;
		padding: 0 0 0 54rpx;
	}

	.list {
		width: 612rpx;
		margin: 0 auto;

		>view {
			height: 114rpx;
			border-bottom: 1px solid #DDDDDD;

			image {
				width: 39rpx;
				height: 39rpx;
			}
		}
	}

	.confirm {
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
	}
</style>
