<template>
	<view>
		<view class="flex area-between top">
			<view class="title">常见问题</view>
			<navigator url="/pages/user/setting/idea" hover-class="none" class="font32 color364">意见反馈</navigator>
		</view>
		<view class="tab-else">
			<navigator hover-class="none" :url="'/pages/user/setting/problemDetail?id='+item.id" class="flex area-between colorb1b font32" v-for="(item,index) in list" :key="index">
				<text>{{item.title}}</text>
				<image src="../../../static/image/right-gray.png" mode="" class="right"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				this.post(this.apis.questionList).then(res => {
					if (res.code == 0) {
						this.list = res.data;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		padding: 0 30rpx 0 50rpx;
		margin: 60rpx 0 40rpx;
	}

	.title {
		font-size: 48rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #000000;
	}

	.tab-else {
		.right {
			width: 16rpx;
			height: 30rpx;
			margin-left: 13rpx;
		}

		>.flex {
			padding: 0 30rpx 0 44rpx;
			height: 109rpx;

			text {
				font-weight: 500;
			}
		}
	}
</style>
