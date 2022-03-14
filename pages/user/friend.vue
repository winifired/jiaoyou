<template>
	<view class="contactList">
		<view class="flex item" v-for="(item,index) in array" :key="index">
			<image :src="item.headImg" mode="aspectFill"></image>
			<view class="right-msg flex area-between" @click="toDetail(item.id)">
				<view style="flex:1;">
					<view class="flex area-between">
						<text class="font32 color101">{{item.nickName}}</text>
					</view>
					<view class="flex area-between right-msg-content">
						<text class="font28 color999">{{item.age}}岁｜{{item.constellation}}｜{{item.residentCity}}</text>
					</view>
				</view>
				<view class="closeLove" @click.stop="closeLove(item,index)">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total: 0,
				pageNum: 1,
				array: [],
			};
		},
		onLoad() {
			this.getData();
		},
		onReachBottom() {
			if (this.array.length < this.total) {
				this.pageNum++
				this.getData();
			}
		},
		methods: {
			getData() {
				this.post(this.apis.addresslist, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: this.pageNum,
					pageSize: 15,
					flag: 1,
				}).then(res => {
					if (res.code == 0) {
						this.array.push(...res.data.rows);
						this.total = res.data.total;
					}
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
			closeLove(item, index) {
				console.log(item)
				// 取消我喜欢的
				this.post(this.apis.defriend, {
					userId: uni.getStorageSync('cityUserid'),
					tarUserId: item.id, //被操作的用户id	展开	
					flag: 1, //1删除/解除黑名单 3拉入黑名单
				}).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						this.array.splice(index, 1);
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.contactList {
		.item {
			padding: 30rpx 0 0 30rpx;

			>image {
				width: 93rpx;
				height: 93rpx;
				border-radius: 50%;
			}

			.right-msg {
				flex: 1;
				margin-left: 37rpx;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #F2F2F2;
				padding-right: 30rpx;

				&-content {
					margin: 12rpx 0 0;

					.count {
						min-width: 38rpx;
						height: 38rpx;
						background: #FF4364;
						border-radius: 50%;
						padding: 0 12rpx;
						line-height: 38rpx;
						text-align: center;
					}
				}

				.closeLove {
					width: 118rpx;
					height: 60rpx;
					background: #FF4364;
					border-radius: 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 60rpx;
					text-align: center;
				}
			}
		}
	}
</style>
