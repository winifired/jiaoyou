<template>
	<view>
		<view class="list">
			<view v-for="(item,index) in list" :key="item.id" class="flex" @click.stop="operation('',{id:item.id},'',index)">
				<image :src="item.headImg" mode="aspectFill" class="avatar"></image>
				<view class="right">
					<view class="nickName font32 color000">{{item.nickName}}</view>
					<view class="time font24 color898">{{item.releaseTime}}</view>
					<view class="text font30">{{item.content}}</view>
					<!-- :class="item.annexUrl.length==1||tag.type==2?'bigImg':''" -->
					<view class="imgs flex" v-if="item.annexUrl.length>0">
						<view v-for="(tag,tag_index) in item.annexUrl" :key="tag_index"
							@click.stop="showPrev(tag.type,tag.url,item.annexUrl)">
							<image :src="tag.url" mode="aspectFill" v-if="tag.type==1" :lazy-load="true"></image>
							<image :src="tag.videoCover" mode="aspectFill" v-if="tag.type==2"></image>
							<image src="../../static/image/playIcon.png" mode="" class="playIcon" v-if="tag.type==2">
							</image>
						</view>
					</view>
					<view class="flex place font24 color999" v-if="item.position">
						<image src="../../static/image/place-gray.png" mode=""></image>
						<view class="">{{item.position}}</view>
					</view>
					<view class="flex bottom-btns row-center column-end">
						<image src="../../static/image/gift-pink.png" mode="" class="gift-pink"
							@click.stop="operation(3,{id:item.id},'',index)"></image>
						<view class="flex row-center font24 eva-btn" @click.stop="operation(1,{id:item.id},5,index)">
							<image src="../../static/image/eva-icon.png" mode="" class="love"></image>
							{{item.commentNum}}
						</view>
						<view class="flex row-center font24" @click.stop="operation(2,{id:item.id},5,index)">
							<image src="../../static/image/zan1.png" mode="" class="love2">
							{{item.praiseNum}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="video-box" v-if="showVideo" @click.stop="showVideo=!showVideo">
			<video :src="videoUrl" controls class="videoElse" autoplay>
				<cover-image class="image" @click.stop="showVideo=!showVideo" src="http://121.196.193.184:8080/jy/profile/upload/2022/02/28/5403dd3d-4583-4c5a-9a37-7d54248cd701.png"></cover-image>
			</video>
		</view>
	</view>
</template>

<script>
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins:[judge],
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				total: 0,
				list: [],
				type:'',
				msgData:null,
				videoUrl: '',
				showVideo: false
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
			getDynamic() {
				if (this.pageNum == 1) this.list = [];
				this.post(this.apis.userPraiseDy, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}).then(res => {
					if (res.code == 0) {
						if (res.data.rows.length > 0) {
							res.data.rows.map(item => {
								item.annexUrl = item.annexUrl ? JSON.parse(item.annexUrl) : [];
								if (this.pageNum != 1) {
									this.list.push(item);
								}
							});
						}
						if (this.pageNum == 1) {
							this.list = res.data.rows;
						}
						this.total = res.data.total;
					}
				})
			},
			operation(type,msgData,costId='',index){
				this.type=type;
				this.msgData=msgData;
				this.msgDataindex=index;
				if(type==1||type==2){
					this.judge(costId)
				}else{
					this.toDetail();
				}
			},
			successOperate(){
				// 允许功能性操作
				this.toDetail();
			},
			toDetail(type, id) {
				uni.navigateTo({
					url: '/pages/dynamic/dynamic-detail?type=' + this.type + '&detailId=' + this.msgData.id + '&msgDataindex=' + this.msgDataindex
				})
			},
			showPrev(type, url, array) {
				if (type == 1) {
					let arr = [];
					array.map(item => {
						if (item.type == 1) {
							arr.push(item.url)
						}
					});
					console.log(arr)
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
						urls: arr
					})
				} else {
					this.videoUrl = url;
					this.showVideo = true;
				}
			},
		},
		components: {}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";
	.list {
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
