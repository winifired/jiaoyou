<template>
	<view class="list-detail">
		<view class="list">
			<view v-if="item" class="flex">
				<image :src="item.headImg" mode="aspectFill" class="avatar"></image>
				<view class="right">
					<view class="nickName font32 color000">{{item.nickName}}</view>
					<view class="time font24 color898">{{item.createTime}}</view>
					<view class="text font30">
						<text v-html="item.content"></text>
					</view>
					<view class="imgs flex" v-if="item.annexUrl.length>0">
						<!-- :class="item.annexUrl.length==1||tag.type==2?'bigImg':''" -->
						<view v-for="(tag,tag_index) in item.annexUrl" :key="tag_index"
							@click="showPrev(tag.type,tag.url,item.annexUrl)">
							<image :src="tag.url" mode="aspectFill" v-if="tag.type==1"></image>
							<image :src="tag.videoCover" mode="aspectFill" v-if="tag.type==2"></image>
							<image src="../../static/image/playIcon.png" mode="" class="playIcon" v-if="tag.type==2">
							</image>
						</view>
					</view>
					<view class="flex place font24 color999">
						<image src="../../static/image/place-gray.png" mode="" v-if="item.position"></image>
						<view class="">
							<text style="margin-right:34rpx;" v-if="item.position">{{item.position}}</text>
							<text class="font26 delate" @click="delate">删除</text>
						</view>
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
					<view class="loveList-evaList" v-if="item.commentNum!=0||item.praiseNum!=0">
						<view class="single"></view>
						<view class="loveList flex" v-if="item.praiseNum!=0">
							<image src="../../static/image/min-love.png" mode="" class="love-icon"></image>
							<image :src="tag" mode="aspectFill" v-for="(tag,index) in item.praiseUser" :key="index"
								class="love-avatar"></image>
						</view>
						<view class="evaList-list" v-if="item.commentNum!=0">
							<view v-for="(tag,index) in commentList" :key="index" class="flex evaList-list-item"
								:style="{paddingLeft:'28rpx'}">
								<image src="../../static/image/min-eva.png" mode="" class="love-icon"></image>
								<image :src="tag.headImg" mode="" class="love-avatar"></image>
								<view class="eva-user">
									<view class="eva-user-name flex area-between">
										<view class="font26 color364">{{tag.nickName}}</view>
										<view class="font24 color999">{{tag.createTime|fifterTime}}</view>
									</view>
									<view class="eva-user-content font24 color333 flex column-bwn">
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
		<uni-popup ref="eva" type="bottom">
			<!-- 评论弹窗 -->
			<commentU :chooseItemid="detailId" :parentId="parentId" :pasUserId="pasUserId" @successEva="successEva">
			</commentU>
		</uni-popup>
		<view class="video-box" v-if="showVideo" @click.stop="showVideo=!showVideo">
			<video :src="videoUrl" controls class="videoElse" autoplay>
				<cover-image class="image" @click.stop="showVideo=!showVideo" src="http://121.196.193.184:8080/jy/profile/upload/2022/02/28/5403dd3d-4583-4c5a-9a37-7d54248cd701.png"></cover-image>
			</video>
		</view>
	</view>
</template>

<script>
	import {
		timeago
	} from "../../utils/check.js";
	import {
		parseText
	} from '../../components/base/message-facade';
	export default {
		name: "",
		data() {
			return {
				detailId: '', //动态id
				msgDataindex:0,
				item: null, //详情
				commentList: [],
				userId: uni.getStorageSync('cityUserid'),
				parentId: '',
				pasUserId: '',
				videoUrl: '',
				showVideo: false
			};
		},
		filters: {
			fifterTime(data) {
				if (!data) {
					return '';
				} else {
					data = data.replace(/-/gi, '/');
					let time = new Date(data).getTime();
					return timeago(time);
				}
			}
		},
		components: {},
		onLoad(options) {
			this.detailId = options.detailId;
			this.msgDataindex = options.msgDataindex;
			this.getData();
		},
		methods: {
			delate() {
				//删除动态
				this.post(this.apis.dynamicdel, {
					dynamicId: this.detailId
				}).then(res => {
					if (res.code == 0) {
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2];
						prevPage.$vm.pageNum = 1;
						prevPage.$vm.getDynamic();
						this.$toast('删除成功');
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					}
				})
			},
			getData() {
				this.post(this.apis.dynamicInfo, {
					userId: uni.getStorageSync('cityUserid'),
					dynamicId: this.detailId
				}).then(res => {
					if (res.code == 0) {
						res.data.praiseUser = res.data.praiseUser ? res.data.praiseUser.split(',') : [];
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
						if(prevPage.route=='pages/user/active'){
							prevPage.$vm.list[this.msgDataindex].commentNum=this.item.commentNum;
						}
					}
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
			open(tag) {
				this.parentId = tag.id;
				this.pasUserId = tag.userId;
				this.$refs.eva.open();
			},
			successEva() {
				this.getComment();
				this.$refs.eva.close();
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";

	.list-detail {
		padding: 0 30rpx;
	}

	.delate {
		color: #33A0F4
	}
</style>
