<template>
	<view class="list-detail">
		<view class="list">
			<view class="flex" v-if="item">
				<image :src="item.headImg" mode="aspectFill" class="avatar" @click="userDetail(item.userId)"></image>
				<view class="right">
					<view class="nickName font32 color000">{{item.nickName}}</view>
					<view class="time font24 color898">{{item.releaseTime}}</view>
					<view class="text font30">
						<text v-html="item.content"></text>
					</view>
					<!-- :class="item.annexUrl.length==1||tag.type==2?'bigImg':''" -->
					<view class="imgs flex" v-if="item.annexUrl.length>0">
						<view v-for="(tag,tag_index) in item.annexUrl" :key="tag_index"
							@click.stop="showPrev(tag.type,tag.url,item.annexUrl)">
							<image :src="tag.url" mode="aspectFill" v-if="tag.type==1"></image>
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
						<image src="../../static/image/gift-pink.png" mode="" class="gift-pink" @click="opengift">
						</image>
						<view class="flex row-center font24 eva-btn" @click="operation(1)">
							<image src="../../static/image/eva-icon.png" mode="" class="love"></image>
							{{item.commentNum}}
						</view>
						<view class="flex row-center font24" @click="operation(2)">
							<image src="../../static/image/zan1.png" mode="" class="love2" v-if="item.praiseFlag==1">
							<image src="../../static/image/zan.png" mode="" class="love2" v-else></image>
							{{item.praiseNum}}
						</view>
					</view>
					<view class="loveList-evaList" v-if="commentList.length>0">
						<view class="single"></view>
						<view class="evaList-list">
							<view v-for="(tag,index) in commentList" :key="index" class="flex evaList-list-item">
								<image :src="tag.headImg" mode="aspectFill" class="love-avatar"></image>
								<view class="eva-user">
									<view class="eva-user-name flex area-between">
										<view class="font26 color364">{{tag.nickName}}</view>
										<view class="font24 color999">{{tag.createTime|fifterTime}}</view>
									</view>
									<view class="eva-user-content font24 color333 flex area-between">
										<view class="cont flex">
											<view class="" v-if="tag.pasNickName">回复<text
													class="color364">{{tag.pasNickName}}</text>：</view>
											<view v-for="(val, index) in tag.commentArray" :key="index"
												class="flex row-center">
												<span v-if="val.name === 'span'">{{ val.text }}</span>
												<image v-if="val.name === 'img'" class="emoji-icon" :src="val.src">
												</image>
											</view>
										</view>
										<view class="repeat color0f4" @click="open(tag)" v-if="item.userId==userId&&tag.userId!=userId">回复
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="gift" type="bottom">
			<giftModel :userid="item&&item.userId?item.userId:''" @confirmGift="confirmGift" :dynamicId="item?item.id:''"></giftModel>
		</uni-popup>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
		<uni-popup ref="eva" type="bottom">
			<!-- 评论弹窗 -->
			<commentU :chooseItemid="detailId" :parentId="parentId" :pasUserId="pasUserId"
				@successEva="successEva">
			</commentU>
		</uni-popup>
		<view class="video-box" v-if="showVideo" @click.stop="showVideo=!showVideo" @touchmove.stop="touchmove">
			<video :src="videoUrl" controls class="videoElse" autoplay>
				<cover-image class="image" @click.stop="showVideo=!showVideo" src="http://121.196.193.184:8080/jy/profile/upload/2022/02/28/5403dd3d-4583-4c5a-9a37-7d54248cd701.png"></cover-image>
			</video>
		</view>
	</view>
</template>

<script>
	import {
		parseText
	} from '../../components/base/message-facade';
	import {
		mapState,
		mapActions
	} from "vuex";
	import {
		timeago
	} from "../../utils/check.js";
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins: [judge],
		data() {
			return {
				timer: null,
				detailId: '', //动态id
				msgDataindex:'',//动态列表index
				content: '', //tip Content
				leftText: '',
				item: null, //详情
				commentList: [],
				type: '', //1 评论 2点赞
				videoUrl: '',
				showVideo: false,
				
				
				userId: uni.getStorageSync('cityUserid'),
				parentId: 0,
				pasUserId: '',
			};
		},
		computed: {
			...mapState(['userinfo'])
		},
		onLoad(options) {
			console.log(options)
			this.detailId = options.detailId;
			this.msgDataindex=options.msgDataindex;
			this.getData();
			// options.type 3送礼物 1评论
			let that = this;
			if (options.type == 3) {
				this.timer = setTimeout(() => {
					this.opengift();
				}, 300)
			} else if (options.type == 1) {
				this.timer = setTimeout(() => {
					this.operation(1);
				}, 300)
			}
			
		},
		onHide() {
			this.showVideo = false;
			clearTimeout(this.timer)
		},
		filters: {
			fifterTime(data) {
				if (!data) {
					return '';
				} else {
					data = data.replace(/-/gi, '/');
					let time = new Date(data).getTime();
					console.log(data)
					console.log(time)
					return timeago(time);
				}
			}
		},
		methods: {
			userDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?id='+id
				})
			},
			touchmove(){
				return;
			},
			getData() {
				this.post(this.apis.dynamicInfo, {
					userId: uni.getStorageSync('cityUserid'),
					dynamicId: this.detailId
				}).then(res => {
					if (res.code == 0) {
						this.pasUserId=res.data.userId;
						res.data.annexUrl = res.data.annexUrl ? JSON.parse(res.data.annexUrl) : [];
						this.item = res.data;
						this.getComment();
					}
				})
			},
			getComment() {
				this.post(this.apis.commentList, {
					dynamicId: this.detailId,
				}).then(res => {
					if (res.code == 0) {
						this.commentList = [];
						if (res.data.rows.length > 0) {
							res.data.rows.map(item => {
								item['commentArray'] = item.comment ? parseText({
									payload: {
										text: item.comment
									}
								}) : [];
								this.commentList.push(item)
							});
						}
						this.item.commentNum=res.data.rows.length;
						let pages=getCurrentPages();
						let prevPage=pages[pages.length-2];
						if(prevPage.route=='pages/dynamic/dynamic'){
							prevPage.$vm.list[this.msgDataindex].commentNum=this.item.commentNum;
						}else if(prevPage.route=='pages/user/userpraise'){
							prevPage.$vm.list[this.msgDataindex].commentNum=this.item.commentNum;
						}
					}
				})
			},
			open(tag) {
				this.parentId = tag.id;
				this.pasUserId = tag.userId;
				this.$refs.eva.open();
			},
			operation(type) {
				// 所有的功能性操作都需要判断是否是会员，都需要先进入这个方法
				this.type = type;
				if (this.type == 1 || this.type == 2) {
					this.judge(5)
				}
			},
			successOperate() {
				if (this.type == 1) {
					// 评论
					this.$refs.eva.open();
				} else if (this.type == 2) {
					// 点赞
					this.togglePraise();
				}
			},
			togglePraise() {
				// 点赞
				this.post(this.apis.dynamicPraise, {
					userId: uni.getStorageSync('cityUserid'),
					dynamicId: this.detailId,
				}).then(res => {
					if (res.code == 0) {
						this.item.praiseFlag = res.data.praiseFlag;
						this.item.praiseNum = res.data.praiseNum;
						let pages=getCurrentPages();
						let prevPage=pages[pages.length-2];
						if(prevPage.route=='pages/dynamic/dynamic'){
							prevPage.$vm.list[this.msgDataindex].praiseFlag=this.item.praiseFlag;
							prevPage.$vm.list[this.msgDataindex].praiseNum=this.item.praiseNum;
						}else if(prevPage.route=='pages/user/userpraise'){
							prevPage.$vm.list.splice(this.msgDataindex,1);
						}
					}
				})
			},
			successEva() {
				this.getComment();
				this.$refs.eva.close();
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
			opengift() {
				this.$refs.gift.open();
			},
			confirmGift(msg) {
				// 赠送成功提示
				this.$toast(msg);
				this.$refs.gift.close();
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";

	.list-detail {
		padding: 0 30rpx;
	}
</style>
