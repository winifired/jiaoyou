<template>
	<view>
		<view class="fixedTop">
			<view class="address-book flex area-center">
				<view class="font34 color999" :class="actived==1?'actived':''" @click="changeDynamic(1)">动态</view>
				<view class="font34 color999" :class="actived==2?'actived':''" @click="changeDynamic(2)">节目</view>
			</view>
		</view>
		<view class="list">
			<view v-for="(item,index) in list" :key="item.id" class="flex" @click.stop="toDeatil(item.id,index)">
				<image :src="item.headImg" mode="aspectFill" class="avatar"></image>
				<view class="right">
					<view class="nickName font32 color000">{{item.nickName}}</view>
					<view class="time font24 color898">{{item.createTime}}</view>
					<view class="text font30">{{item.content}}</view>
					<view class="imgs flex" v-if="item.annexUrl.length>0">
						<!-- @click.stop="showPrev(tag.type,tag.url,item.annexUrl)" -->
						<!-- :class="item.annexUrl.length==1||tag.type==2?'bigImg':''" -->
						<view v-for="(tag,tag_index) in item.annexUrl" :key="tag_index"
							>
							<image :src="tag.url" mode="aspectFill" v-if="tag.type==1" :lazy-load="true"></image>
							<image :src="tag.videoCover" mode="aspectFill" v-if="tag.type==2"></image>
							<image src="../../static/image/playIcon.png" mode="" class="playIcon" v-if="tag.type==2"></image>
						</view>
					</view>
					<view class="flex place font24 color999" v-if="item.position">
						<image src="../../static/image/place-gray.png" mode=""></image>
						<view class="">{{item.position}}</view>
					</view>
					<view class="flex bottom-btns row-center column-end">
						<view class="flex row-center font24 eva-btn">
							<image src="../../static/image/eva-icon.png" mode="" class="love"></image>
							{{item.commentNum}}
						</view>
						<view class="flex row-center font24">
							<image src="../../static/image/zan1.png" mode="" class="love2" v-if="item.praiseFlag==1">
							<image src="../../static/image/zan.png" mode="" class="love2" v-else></image>
							{{item.praiseNum}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actived: 1,
				pageNum: 1,
				pageSize: 10,
				total: 0,
				list: [],
			};
		},
		onLoad() {
			this.getDynamic();
		},
		onReachBottom() {
			if (this.total > this.list.length) {
				this.pageNum++;
				this.getDynamic();
			}
		},
		methods: {
			changeDynamic(data) {
				this.actived = data;
				this.pageNum = 1;
				this.getDynamic();
			},
			getDynamic() {
				if (this.pageNum == 1) this.list = [];
				this.post(this.apis.dynamicList, {
					checkUserId: uni.getStorageSync('cityUserid'),
					type: this.actived, //1动态2节目
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					if (res.code == 0 && res.data.rows.length > 0) {
						res.data.rows.map(item => {
							item.annexUrl = item.annexUrl ? JSON.parse(item.annexUrl) : [];
							this.list.push(item);
						})
						this.total = res.data.total;
					}
				})
			},
			toDeatil(id,index) {
				uni.navigateTo({
					url: '/pages/user/activeDetail?detailId=' + id+'&msgDataindex='+index
				})
			},
		},
		components: {}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";

	.delate {
		margin-left: 34rpx;
		color: #33A0F4
	}

	.address-book {
		width: 690rpx;
		height: 88rpx;
		background: #F5F5F5;
		border-radius: 44rpx;
		margin: 26rpx auto 0;

		>view {
			width: 340rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			text-align: center;
		}

		.actived {
			background: #FFFFFF !important;
			font-weight: 500 !important;
			color: #0A0A0A !important;
		}
	}

	.fixedTop {
		position: fixed;
		top: var(--window-top);
		z-index: 10;
		width: 100%;
		background: #FFFFFF;
	}

	.list {
		padding-top: 100rpx;
		margin-top: 0;

		>view {
			padding: 37rpx 30rpx 30rpx;
			border-bottom: 1px solid #F3F3F3;
		}

		>view:not(:last-child) {
			margin-bottom: 0;
		}
	}
</style>
