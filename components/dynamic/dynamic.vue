<template>
	<view>
		<view class="flex row-center nav" v-if="showNav">
			<view class="font32" :class="choosed==1?'color364':'color666'" @click="choosed=1">动态</view>
			<view class="font32" :class="choosed==2?'color364':'color666'" @click="choosed=2">节目</view>
		</view>
		<view class="list">
			<view v-for="(item,index) in list" :key="index" class="flex">
				<image :src="item.headImg" mode="aspectFill" class="avatar"></image>
				<view class="right">
					<view class="nickName font32 color000">{{item.nickName}}</view>
					<view class="time font24 color898">{{item.releaseTime}}</view>
					<view class="text font30">
						<text v-html="item.content"></text>
					</view>
					<!-- :class="item.annexUrl.length==1||tag.type==2?'bigImg':''" -->
					<view class="imgs flex" v-if="item.annexUrl.length>0">
						<view v-for="(tag,tag_index) in item.annexUrl" :key="tag_index"
							@click="showPrev(tag.type,tag.url,item.annexUrl)">
							<image :src="tag.url" mode="aspectFill" v-if="tag.type==1"></image>
							<image :src="tag.videoCover" mode="aspectFill" v-if="tag.type==2"></image>
							<image src="../../static/image/playIcon.png" mode="" class="playIcon" v-if="tag.type==2">
							</image>
						</view>
					</view>
					<view class="flex place font24 color999" v-if="showPlace">
						<image src="../../static/image/place-gray.png" mode=""></image>
						<view class="">{{item.position}}</view>
						<text class="font26 delate" v-if="showLove">删除</text>
					</view>
					<view class="flex bottom-btns row-center column-end">
						<image src="../../static/image/gift-pink.png" mode="" class="gift-pink" v-if="showGift"
							@click="opengift"></image>
						<view class="flex row-center font24 eva-btn"
							@click="operation(1,{chooseItemid:item.id,parentId:0,pasUserId:item.userId,chooseItemindex:index})">
							<image src="../../static/image/eva-icon.png" mode="" class="love"></image>
							{{item.commentNum}}
						</view>
						<view class="flex row-center font24"
							@click="operation(2,{id:item.id,index:index,praiseFlag:item.praiseFlag})">
							<image src="../../static/image/zan1.png" mode="" class="love2" v-if="item.praiseFlag==1">
							<image src="../../static/image/zan.png" mode="" class="love2" v-else></image>
							{{item.praiseNum}}
						</view>
					</view>
					<view class="loveList-evaList" v-if="item.commentList.length>0">
						<view class="single"></view>
						<view class="evaList-list">
							<view v-for="(tag,index) in item.commentList" :key="index" class="flex evaList-list-item"
								:style="{paddingLeft:showLove?'28rpx':'0'}">
								<image src="../../static/image/min-eva.png" mode="" class="love-icon"
									v-if="showLove&&index==0">
								</image>
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
											<view v-for="(val, index) in tag.commentArray" :key="index" class="flex row-center">
												<span v-if="val.name === 'span'">{{ val.text }}</span>
												<image v-if="val.name === 'img'" class="emoji-icon" :src="val.src">
												</image>
											</view>
										</view>
										<view class="repeat color0f4" @click="open" v-if="showRepeat">回复</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="gift" type="bottom" @change="change">
			<giftModel></giftModel>
		</uni-popup>
		<uni-popup ref="tipMsg" type="center" :safe-area="false" @change="change">
			<tipModel :content="content" :leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
	</view>
</template>

<script>
	import {
		parseText
	} from '../../components/base/message-facade';
	import {
		timeago
	} from "../../utils/check.js";
	import {
		mapActions
	} from "vuex";
	export default {
		name: "dynamic",
		props: {
			showGift: {
				type: Boolean,
				default: false
			},
			showPlace: {
				type: Boolean,
				default: false
			},
			showLove: {
				type: Boolean,
				default: false
			},
			showRepeat: {
				type: Boolean, //是否显示回复按钮,只能在我的动态里面回复
				default: false
			},
			showNav: {
				type: Boolean, //是否显示navbar
				default: true
			},
			list: {
				type: Array,
				default: [],
			}
		},
		data() {
			return {
				choosed: 1, //1动态 2节目
				chooseItemid: '',
				parentId: '',
				pasUserId: '',
				chooseItemindex: 0,
				content: '',
				type: '', //1 评论 2点赞
				costId: '', //当前的需要支付的功能性操作,
				msgData: null, //当前的需要支付的功能性操作的数据,
				leftText: '',
			};
		},
		filters: {
			fifterTime(data) {
				if (!data) {
					return '';
				} else {
					data=data.replace(/-/gi,'/');
					let time = new Date(data).getTime();
					return timeago(time);
				}
			}
		},
		watch: {
			choosed(newData, oldData) {
				if (newData != oldData) {
					this.$emit('changeDynamic', newData)
				}
			},
		},
		components: {},
		methods: {
			...mapActions(['getGoldPay', 'getHintgold']),
			clickLeft() {
				if (this.leftText != '取消') {
					// 跳转会员中心
					uni.navigateTo({
						url: '/pages/user/vipCenter'
					});
				}
				this.$refs.tipMsg.close();
			},
			async clickRight() {
				// 确认购买
				let status = await this.getGoldPay({costId:this.costId});
				if (status.code == 0) {
					if (this.type == 1) {
						// 评论
						this.$emit('msgEva', this.msgData.chooseItemid, this.msgData.parentId, this.msgData.pasUserId,
							this.msgData.chooseItemindex);
					} else if (this.type == 2) {
						// 点赞
						this.togglePraise(this.msgData.id, this.msgData.index, this.msgData.praiseFlag);
					}
				}
				this.$toast(status.msg);
				this.$refs.tipMsg.close();
			},
			async operation(type, data) {
				// 所有的功能性操作都需要判断是否是会员，都需要先进入这个方法
				this.type = type;
				this.msgData = data;
				if (this.type == 1 || this.type == 2) {
					this.costId = 5;
				}
				let status = await this.getHintgold({costId:this.costId});
				if (status.code == 0) {
					if (this.type == 1) {
						// 评论
						this.$emit('msgEva', this.msgData.chooseItemid, this.msgData.parentId, this.msgData.pasUserId,
							this.msgData.chooseItemindex);
					} else if (this.type == 2) {
						// 点赞
						this.togglePraise(this.msgData.id, this.msgData.index, this.msgData.praiseFlag);
					}
				} else if (status.code == 300) {
					this.leftText = '取消';
					this.content = '您的次数已用尽，请支付' + status.monery + '金币获得本次操作权限。';
					this.$refs.tipMsg.open();
				} else if (status.code == 500) {
					this.leftText = '开通会员';
					this.content = '您还不是会员，成为会员才能进行该操作，或者支付' + status.monery + '金币获得本次操作权限。';
					this.$refs.tipMsg.open();
				}
			},
			togglePraise(id, index, praiseFlag) {
				// 点赞
				this.post(this.apis.dynamicPraise, {
					userId: uni.getStorageSync('cityUserid'),
					dynamicId: id,
				}).then(res => {
					if (res.code == 0) {
						this.list[index].praiseFlag = res.data.praiseFlag;
						this.list[index].praiseNum = res.data.praiseNum;
					}
				})
			},
			showPrev(type,url, array) {
				if(type==1){
					let arr = [];
					array.map(item => {
						if(item.type==1){
							arr.push(item.url)
						}
					});
					console.log(arr)
					uni.previewImage({
						longPressActions: {
							itemList: ['快与TA聊聊吧~吧~'],
							success: function(data) {
								console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							},
							fail: function(err) {
								console.log(err.errMsg);
							}
						},
						current:url,
						urls:arr
					})
				}else{
					this.$emit('showModelVideo',url);
				}
			},
			opengift() {
				this.$refs.gift.open();
			},
			change(e) {
				if (e.show) {
					//隐藏父组件底部固定栏
					this.$emit('changeBottom', false);
				} else {
					this.$emit('changeBottom', true);
				}
			},
			uploadEva() {
				// 更新动态的评论列表
				this.post(this.apis.commentList, {
					dynamicId: this.list[this.msgData.chooseItemindex].id,
				}).then(res => {
					if (res.code == 0) {
						this.list[this.msgData.chooseItemindex].commentList =[];
						if (res.data.rows.length > 0) {
							res.data.rows.map(item => {
								item['commentArray'] = item.comment ? parseText({
									payload: {
										text: item.comment
									}
								}) : [];
								this.list[this.msgData.chooseItemindex].commentList.push(item)
							});
							console.log(this.list[this.msgData.chooseItemindex].commentList)
						}
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";

	.delate {
		margin-left: 34rpx;
		color: #33A0F4
	}
</style>
