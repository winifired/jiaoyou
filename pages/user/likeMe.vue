<template>
	<view class="likeMe flex safeBottom100">
		<view v-for="(item,index) in likemeArray" :key="item.id" class="flex area-center item" :class="isShow?'':'mask'" @click="toDetail(item.id)">
			<image :src="item.headImg" mode="aspectFill" class="avatar"></image>
			<view class="name font32 color333">{{item.nickName}}</view>
			<view class="tag font28 color666">{{item.age}}岁｜{{item.constellation}}</view>
			<view class="flex area-around btns">
				<image src="../../static/image/disLikeme.png" mode="" @click.stop="dislike(item.id,index)"></image>
				<image src="../../static/image/likeme.png" mode="" @click.stop="like(item.id,index)"></image>
			</view>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel ref="tipModel" :content="content"
				:leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
	</view>
</template>

<script>
	import judge from "@/components/silder-like/judge.js";
	export default {
		mixins:[judge],
		data() {
			return {
				pageSize: 15,
				pageNum: 1,
				likemeArray: [],
				total: 0,
				isShow:false,//false模糊显示  
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				this.post(this.apis.likeme, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					if (res.code == 0) {
						this.likemeArray = res.data.rows;
						this.total=res.data.total;
						if(res.data.total>0){
							this.judge(11);
						}
					}
				});
			},
			successOperate(){
				// 允许功能性操作
				this.isShow=true;
			},
			toDetail(id){
				if(!this.isShow)return;
				uni.navigateTo({
					url:'/pages/index/detail?id='+id
				})
			},
			dislike(id,index){
				this.post(this.apis.removeUre, {
					userId: uni.getStorageSync('cityUserid'),
					targetUserId:id,//被移除的用户id复制
				}).then(res => {
					if (res.code == 0) {
						this.likemeArray.splice(index,1)
					}
				});
			},
			like(id,index){
				this.post(this.apis.matching, {
					userId: uni.getStorageSync('cityUserid'),
					targetUserId: id,
					flag: 1, //0不喜欢 1喜欢 3撤回
				}).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						this.likemeArray.splice(index,1)
					} 
				})
			}
		},
		onReachBottom() {
			if(this.total>this.likemeArray.length){
				this.pageNum++;
				this.getData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.likeMe {
		padding: 18rpx 0 0 30rpx;

		.item {
			width: 335rpx;
			background: #FFFFFF;
			box-shadow: 0 5rpx 43rpx 0 rgba(196, 196, 196, 0.22);
			border-radius: 24rpx;
			padding: 28rpx 0 24rpx;
			flex-direction: column;
			margin: 0 21rpx 22rpx 0;
			position: relative;

			.avatar {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
			}

			.name {
				font-weight: 500;
				margin: 30rpx 0 12rpx;
			}

			.btns {
				width: 100%;
				margin: 27rpx 0 0;

				>image {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}

		.mask {
			filter: blur(8rpx);
		}
	}
</style>
