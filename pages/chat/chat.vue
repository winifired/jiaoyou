<template>
	<view class="chat safeBottom100">
		<view class="fixedTop">
			<view class="status_bar"></view>
			<view class="flex area-between navbar">
				<view class="flex row-center bar-item">
					<view :class="choosed==0?'choosed':'font36 color666'" @click="choosed=0">聊天</view>
					<view :class="choosed==1?'choosed':'font36 color666'" @click="choosed=1"
						v-if="userinfo&&userinfo.directoryFlag==1">好友</view>
				</view>
				<view class="userStatus">
					<view class="flex area-center toggle font24" @click="changeOnLineStatus">{{state==1?'在线':'隐身'}}
						<image src="../../static/image/download.png" mode=""></image>
					</view>
					<view class="status" v-if="isShowStatus">
						<view class="flex area-center font26 color666" @click="changeOnlineItem(1)">
							<image src="../../static/image/show.png" mode=""></image>在线
						</view>
						<view class="flex area-center font26 color666" @click="changeOnlineItem(0)">
							<image src="../../static/image/hide.png" mode=""></image>隐身
						</view>
						<view class="tingle"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" :style="{paddingTop:chattopheight+'px'}">
			<view class="love-me" v-if="likemeArray.length>0&&choosed==0" @click="toLoveMe()">
				<view class="colora1a font30">喜欢我的</view>
				<view class="avatars flex row-center">
					<image :src="item.headImg" mode="" v-for="(item,index) in likemeArray" :key="index"></image>
				</view>
				<view class="flex row-center column-end font28 color666">
					等{{likemetotal}}位用户喜欢您<image src="../../static/image/right-gray.png" mode="" class="right-gray">
					</image>
				</view>
			</view>
			<view class="contactList" v-show="choosed==0">
				<view>
					<view v-for="item in conversationList" :key="item.conversationID"
						@click="handleRoute(item,item.conversationID)">
						<TUI-conversation-item :data-type="item.type" :conversation="item">
						</TUI-conversation-item>
					</view>
				</view>
			</view>
			<view class="contactList" v-show="choosed==1">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options" @click="bindClick($event, index)"
						v-for="(item,index) in array" :key="index">
						<view class="flex item" @click.stop="userDetail(item.id)">
							<image :src="item.headImg" mode="aspectFill"></image>
							<view class="right-msg">
								<view class="flex area-between">
									<text class="font32 color101">{{item.nickName}}</text>
								</view>
								<view class="flex area-between right-msg-content">
									<text
										class="font28 color999">{{item.age}}岁｜{{item.constellation}}｜{{item.residentCity}}</text>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" :rightText="rightText" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex";
	import judge from "../../components/silder-like/judge.js";
	import TUIConversationItem from "../../components/tui-conversation/conversation-item/index";
	export default {
		mixins: [judge],
		data() {
			return {
				choosed: 0,
				isShowStatus: false,
				chattopheight: 0,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F75855'
					}
				}, {
					text: '拉黑',
					style: {
						backgroundColor: '#4C4C4C'
					}
				}],
				content: '',
				leftText: '',
				rightText: '',
				leftTextColor: '',

				total: 0,
				pageNum: 1,
				array: [],
				likemeArray: [],
				likemetotal: 0,
				conversationList: [],
				conversationItem: null,
				conversationID:null
			};
		},
		components: {
			TUIConversationItem
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo,
				state: state => state.userinfo?state.userinfo.state:1, //1在线0隐身
			})
		},
		watch: {
			choosed(data, olddata) {
				if (data != olddata) {
					this.$nextTick(function() {
						this.gettopFixHeight();
					});
					this.getData(); //通讯录
				}
			},
		},
		onUnload() {
			uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
		},
		onLoad() {
			this.$nextTick(function() {
				this.gettopFixHeight();
			});
			this.getLikeMe();
			this.getConversationList();
			uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		},
		onPullDownRefresh() {
			if (this.choosed == 1) {
				this.pageNum = 1;
				this.getData();
			} else {
				this.getConversationList();
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if (this.choosed == 1) {
				if (this.array.length < this.total) {
					this.pageNum++
					this.getData();
				}
			}
		},
		methods: {
			...mapMutations(['setuserinfo']),
			...mapActions(['getElseUserInfo']),
			userDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
			onConversationListUpdated(event) {
				this.conversationList = [];
				this.setData({
					conversationList: event.data
				});
			},
			getConversationList() {
				uni.$TUIKit.getConversationList().then(imResponse => {
					this.conversationList = [];
					this.setData({
						conversationList: imResponse.data.conversationList
					});
				});
			},
			handleRoute(item,conversationID) {
				this.rightText = '付费购买';
				this.conversationID=conversationID;
				console.log(item,conversationID)
				this.judge(1,item.userProfile.userID);
			},
			getData() {
				if(this.pageNum==1){
					this.array=[]
				}
				this.post(this.apis.addresslist, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: this.pageNum,
					pageSize: 15,
					flag: 2, //1我喜欢的 2我的好友3黑名单
				}).then(res => {
					if (res.code == 0) {
						this.array.push(...res.data.rows);
						this.total = res.data.total;
					}
				});
			},
			getLikeMe() {
				this.post(this.apis.likeme, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: 1,
					pageSize: 9
				}).then(res => {
					if (res.code == 0) {
						this.likemeArray = res.data.rows;
						this.likemetotal = res.data.total;
					}
				});
			},
			bindClick(e, index) {
				let data = {
					userId: uni.getStorageSync('cityUserid'),
					tarUserId: this.array[index].id
				};
				if (e.content.text == '拉黑') {
					data['flag'] = 3 //1删除/解除黑名单 3拉入黑名单
				} else {
					data['flag'] = 1 //1删除/解除黑名单 3拉入黑名单
				}
				this.post(this.apis.defriend, data).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						this.array.splice(index, 1);
					}
				});
			},
			changeOnLineStatus() {
				// 非会员提示付费
				this.rightText = '付费购买';
				this.judge(16);
			},
			successOperate() {
				// 允许功能性操作
				if(this.costId==1){
					uni.navigateTo({
						url: "/pages/TUI-Chat/chat?conversationID=" + this.conversationID
					});
				}else{
					this.isShowStatus = !this.isShowStatus;
				}
			},
			changeOnlineItem(type) {
				this.post(this.apis.privacySet, {
					id: uni.getStorageSync('cityUserid'),
					state: type
				}).then(res => {
					if (res.code == 0) {
						this.userinfo.state = type;
						this.setuserinfo(this.userinfo);
					}
					this.isShowStatus = false;
				});
			},
			toLoveMe() {
				uni.navigateTo({
					url: '/pages/user/likeMe'
				})
			},
			gettopFixHeight() {
				//获取顶部固定栏高度
				let that = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('.fixedTop').boundingClientRect(data => {
					that.chattopheight = data.height;
				}).exec();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		filter: blur(8rpx);
	}

	.content {
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

		.love-me {
			width: 690rpx;
			height: 257rpx;
			background: #F5F5F5;
			border-radius: 20rpx;
			margin: 26rpx auto 0;
			padding: 27rpx 36rpx 0 29rpx;

			.avatars {
				margin: 28rpx 0;
				padding-left: 18rpx;

				>image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					border: 1px solid #FFFFFF;
					border-radius: 50%;
					margin-left: -18rpx;
					filter: blur(16rpx);
				}
			}

			.right-gray {
				width: 13rpx;
				height: 23rpx;
				margin-left: 12rpx;
			}
		}
	}

	.fixedTop {
		position: fixed;
		top: 0;
		z-index: 10;
		width: 100%;
		background: #FFFFFF;
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

	.navbar {
		padding: 0 33rpx;
		height: 100rpx;
		box-shadow: 0 0 40rpx 0 rgba(239, 239, 239, 0.42);

		.choosed {
			font-size: 44rpx;
			color: #000000;
		}

		.bar-item {
			>view {
				margin-right: 52rpx;
			}
		}

		.userStatus {
			position: relative;

			.toggle {
				color: #0F0F0F;
				width: 146rpx;
				height: 60rpx;
				background: #F5F5F5;
				border-radius: 30rpx;

				>image {
					width: 19rpx;
					height: 11rpx;
					margin-left: 21rpx;
				}
			}

			.status {
				position: absolute;
				width: 139rpx;
				height: 123rpx;
				background: #FFFFFF;
				border-radius: 12rpx;
				box-shadow: 0 3rpx 21rpx 0 rgba(239, 239, 239, 0.42);
				top: 70rpx;

				.tingle {
					width: 0;
					height: 0;
					border-left: 12rpx solid transparent;
					border-right: 12rpx solid transparent;
					border-bottom: 18rpx solid #FFFFFF;
					position: absolute;
					top: -12rpx;
					left: 50%;
					box-shadow: 0 3rpx 21rpx 0 rgba(239, 239, 239, 0.42);
				}

				>.flex {
					height: 60rpx;

					image {
						width: 29rpx;
						height: 29rpx;
						margin-right: 11rpx;
					}
				}

				>.flex:first-child {
					border-bottom: 1px solid #F4F4F4;
				}
			}
		}

	}
</style>
