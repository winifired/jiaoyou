<template>
	<view class="detail">
		<view class="meau" v-show="showMeau">
			<view class="font26 color666" @click.stop="openreportModel">举报</view>
			<view class="font26 color666" @click.stop="blackUser">拉黑</view>
			<view class="font26 color666" @click="showMeau=false">取消</view>
		</view>
		<image :src="info.coverImg" mode="aspectFill" class="cover-img" v-if="info"></image>
		<view class="content safeBottom250" v-if="info">
			<view class="right-user">
				<view class="right-user-top">
					<view class="right-user-name flex area-between">
						<view class="right-user-name-text flex row-center">
							<text class="font34 color727">{{info.nickName}}</text>
							<image src="../../static/image/VIP.png" mode="" class="vipIcon" v-if="info.memberFlag==1">
							</image>
							<image src="../../static/image/SVIP.png" mode="" class="vipIcon" v-if="info.memberFlag==2">
							</image>
							<view class="realPeople flex area-center font18 color364" v-if="info.realFlag==1">
								<image src="../../static/image/smile-pink.png" mode=""></image>真人
							</view>
							<view class="realPeople flex area-center font18 color364"
								v-if="info.sex=='女'&&info.idolFlag==1">
								<image src="../../static/image/plaint.png" mode=""></image>女神
							</view>
							<view class="realPeople realPeoplemen flex area-center font18 color300"
								v-if="info.sex=='男'&&info.idolFlag==1" style="background: rgba(255, 195, 0, .1)">
								<image src="../../static/image/plaint-yellow.png" mode=""></image>男神
							</view>
						</view>
						<view class="loveStatus flex area-center" @click.stop="toggleFocus(info.id,info.focusFlag)">
							<view class="heart love-act" v-if="info.focusFlag==1"></view>
							<image src="../../static/image/love.png" mode="" class="love" v-else></image>
						</view>
					</view>
					<view class="right-user-address font28">
						{{info.age}}岁 | {{info.constellation}} | {{info.residentCity}} | {{info.occupation}}
					</view>
					<view class="right-user-address font28" v-if="info.currentCity">
						所在城市：{{info.currentCity}}
					</view>
				</view>
				<view class="flex right-user-bottom row-center">
					<view class="flex row-center font24 color999" v-if="info.distanceFlag==1&&info.distance">
						<image src="../../static/image/place-gray.png" mode=""></image>{{info.distance}}km
					</view>
					<view class="font24" :class="info.lastOnlineTimeName=='当前在线'?'flex row-center colord24':'color999'"
						v-if="info.onlineFlag==1&&info.lastOnlineTimeName">
						<text v-if="info.lastOnlineTimeName=='当前在线'"></text>{{info.lastOnlineTimeName}}
					</view>
				</view>
			</view>
			<view class="userMsg">
				<view class="nav flex area-between">
					<view v-for="(item,index) in nav" :key="index" class="color727"
						:class="choosed!=index?'font32':'font36'" @click="choosed=index">{{item}}</view>
				</view>
				<view class="" v-show="choosed==0&&info">
					<view class="flex title" v-if="info.height">
						<view class="name font30 color727">身高</view>
						<view class="msg font30 color666">{{info.height}}cm</view>
					</view>
					<view class="flex title" v-if="info.weight">
						<view class="name font30 color727">体重</view>
						<view class="msg font30 color666">{{info.weight}}kg</view>
					</view>
					<view class="flex title" v-if="info.occupation">
						<view class="name font30 color727">职业</view>
						<view class="msg font30 color666">{{info.occupation}}</view>
					</view>
					<view class="flex title" v-if="info.residentCity">
						<view class="name font30 color727">常驻城市</view>
						<view class="msg font30 color666">
							{{info.residentCity}}
						</view>
					</view>
					<view class="flex title" v-if="info.hobby">
						<view class="name font30 color727">兴趣爱好</view>
						<view class="msg font30 color666">{{info.hobby.replace(/,/g, "、")}}</view>
					</view>
					<view class="flex title" v-if="info.disposition">
						<view class="name font30 color727">性格特点</view>
						<view class="msg font30 color666">{{info.disposition.replace(/,/g, "、")}}</view>
					</view>
					<view class="flex title" v-if="info.purpose">
						<view class="name font30 color727">交友需求</view>
						<view class="msg font30 color666">{{info.purpose.replace(/,/g, "、")}}</view>
					</view>
					<view class="flex title mt-25">
						<view class="name font30 color727">期望对象</view>
					</view>
					<view class="flex title mt-25">
						<!-- <view class="name font30 color666">兴趣爱好</view> -->
						<view class="msg flex">
							<view v-for="(item,index) in info.targetHobby?info.targetHobby.split(','):[]" :key="index"
								class="msg-item font26 color666">{{item}}</view>
							<view v-for="(item,index_g) in info.targetCharacter?info.targetCharacter.split(','):[]" :key="index_g"
								class="msg-item font26 color666">{{item}}</view>
						</view>
					</view>
					<!-- <view class="flex title mt-25" v-if="info.targetCharacter">
						<view class="name font30 color666">性格特点</view>
						<view class="msg flex">
							<view v-for="(item,index) in info.targetCharacter.split(',')" :key="index"
								class="msg-item font26 color666">{{item}}</view>
						</view>
					</view> -->
				</view>
				<view class="imgs flex" v-if="choosed==1">
					<image :src="item.imgUrl" mode="aspectFill" :lazy-load="true" v-for="(item,index) in albumList"
						:key="index" @click="showPrev(item.imgUrl,albumList)"></image>
				</view>
				<view class="dynamic" v-if="choosed==2">
					<dynamic :showRepeat="false" @changeBottom="changeBottom" ref="dynamic" :list="list"
						@changeDynamic="changeDynamic" @msgEva="msgEva" @showModelVideo="showModelVideo"></dynamic>
				</view>
				<view class="userEva" v-if="choosed==3">
					<view class="font32 color727">
						对TA的评价
					</view>
					<view class="evaTag flex">
						<view v-for="(item,index) in userEvaluateCont.evaluateList" :key="index" class="font30">
							{{item.evaluate}}
							<text class="colorfff">{{(item.evaluateNum-0)>99?'99+':item.evaluateNum}}</text>
						</view>
					</view>
					<view class="synthesis flex row-center">
						<text class="font32 color727">综合得分</text>
						<uni-rate v-model="userEvaluateCont.score" readonly class="uni-rate" activeColor="#FF8400"
							color="#EBEBEB" margin="4.5" /> <text
							class="font28 color999">{{userEvaluateCont.score}}分</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixedBottom safeBottom flex area-around" v-if="info&&showBottom">
			<view class="flex area-center font34 colorfff" @click.stop="opengift">
				<image src="../../static/image/gift.png" mode=""></image>送礼物
			</view>
			<view class="flex area-center font34 color364" @click.stop="judge(1,id)">
				发起私聊
			</view>
		</view>
		<uni-popup ref="gift" type="bottom" :safe-area="false">
			<giftModel :userid="id" @confirmGift="confirmGift"></giftModel>
		</uni-popup>
		<uni-popup ref="reportModel" type="bottom" :safe-area="false">
			<view class="report safeBottom">
				<view class="title font34 color101">请选择举报类型</view>
				<scroll-view scroll-y="true" class="scroll-view">
					<view class="reports">
						<view v-for="(item,index) in reportArray" :key="index" class="flex area-center font30 color333"
							@click.stop="confirmRepeat(item)">{{item}}</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
		<uni-popup ref="eva" type="bottom">
			<!-- 评论弹窗 -->
			<commentU :chooseItemid="chooseItemid" :parentId="parentId" :pasUserId="pasUserId" @successEva="successEva">
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
		mapState,
		mapActions
	} from "vuex";
	import {
		parseText
	} from '../../components/base/message-facade';
	import msgTip from "../../utils/msgTip.js";
	import dynamic from "../../components/dynamic/dynamic.vue";
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins: [judge],
		data() {
			return {
				showMeau: false,
				nav: ['个人资料', '相册中心', '个人动态', '评价'],
				choosed: 0,
				giftNum: 1,
				reportArray: msgTip.reportArray,
				rate: 4,
				showBottom: true,
				id: '', //查询的用户id
				info: null,
				albumList: [], //相册列表
				// 评论列表
				pageNum: 1,
				pageSize: 10,
				total: 0,
				list: [],
				choosedDynamic: 1, //1动态2节目
				userEvaluateCont: null, //评价
				// 动态评论
				chooseItemid: '',
				parentId: '',
				pasUserId: '',
				chooseItemindex: '',
				// 付费id
				costId: '',
				content: '', //tip Content
				leftText: '',
				videoUrl: '',
				showVideo:false,
			};
		},
		computed: {
			...mapState(['userinfo']),
		},
		components: {
			dynamic
		},
		watch: {
			choosed(newData) {
				if (newData == 2) {
					this.pageNum = 1;
					this.getDynamic(); //动态
				}
			}
		},
		onPullDownRefresh() {
			this.getData();
			this.getUserEvaluate();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(options) {
			this.id = options.id;
			this.getData();
			this.getUserEvaluate();
		},
		onReachBottom() {
			if (this.choosed == 2) {
				if (this.total > this.list.length) {
					this.pageNum++;
					this.getDynamic();
				}
			}
		},
		methods: {
			...mapActions(['isFocusUser', 'getElseUserInfo', 'getUserAlbum', 'getGoldPay', 'getHintgold']),
			getData() {
				this.getElseUserInfo(this.id).then(res => {
					this.info = res;
				}).catch(err => {
					this.$toast(err);
					uni.navigateBack()
				});
				this.getUserAlbum(this.id).then(res => {
					this.albumList = res.rows;
				})
			},
			changeDynamic(data) {
				this.choosedDynamic = data;
				this.pageNum = 1;
				this.getDynamic();
			},
			getDynamic() {
				if (this.pageNum == 1) this.list = [];
				this.post(this.apis.dynamicList, {
					userId: uni.getStorageSync('cityUserid'),
					checkUserId: this.id,
					type: this.choosedDynamic, //1动态2节目
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					if (res.code == 0 && res.data.rows.length > 0) {
						res.data.rows.map(item => {
							this.post(this.apis.commentList, {
								dynamicId: item.id,
							}).then(res => {
								if (res.code == 0) {
									item.commentList = [];
									if (res.data.rows.length > 0) {
										res.data.rows.map(tag => {
											tag['commentArray'] = tag.comment ? parseText({
												payload: {
													text: tag.comment
												}
											}) : [];
											item.commentList.push(tag)
										});
									}
									item.annexUrl = item.annexUrl ? JSON.parse(item.annexUrl) : [];
									this.list.push(item);
								}
							})
						})
						this.total = res.data.total;
					}
				})
			},
			toggleFocus(userid, focusFlag) {
				this.isFocusUser(userid).then(res => {
					if (res.code == 0) {
						if (focusFlag == 1) {
							this.$toast('取消关注成功');
							this.info.focusFlag = 0;
						} else {
							this.$toast('关注成功');
							this.info.focusFlag = 1;
						}
					} else {
						this.$toast(res.msg)
					}
				})
			},
			getUserEvaluate() {
				// /个人中心用户评价信息
				this.post(this.apis.userEvaluate, {
					targetUserId: this.id
				}).then(res => {
					if (res.code == 0) {
						this.userEvaluateCont = res.data;
					}
				})
			},
			toChat() {
				uni.navigateTo({
					url: "/pages/TUI-Chat/chat?conversationID=" + `C2C${this.id}`
				});
			},
			isExistFriend: function(name, list) {
				for (let index = 0; index < list.length; index++) {
					if (name == list[index].name) {
						return true;
					}
				}
				return false;
			},
			successOperate() {
				let that = this;
				that.toChat();
			},
			confirmGift(msg) {
				// 赠送成功提示
				this.$toast(msg);
				this.$refs.gift.close();
			},
			confirmRepeat(content) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定举报' + that.info.nickName + '？',
					cancelColor: '#666666',
					confirmColor: '#FF4364',
					success: function(res) {
						if (res.confirm) {
							that.post(that.apis.reportUser, {
								targetUserId: that.id, //被举报用户id
								userId: uni.getStorageSync('cityUserid'), //当前用户id
								reportContent: content, //举报内容
							}).then(res => {
								if (res.code == 0) {
									that.$toast('感谢您的举报，我们会尽快核实');
									that.$refs.reportModel.close();
								}
							})
							that.showMeau = false;
						}
					}
				});
			},
			opengift() {
				this.$refs.gift.open();
			},
			openreportModel() {
				this.$refs.reportModel.open();
			},
			changeBottom(data) {
				this.showBottom = data;
			},
			msgEva(id, parentId, pasUserId, index) {
				//动态评论。。。。 动态id,父级评论id 一级传0,被评论用户id,评论的动态下标
				this.chooseItemid = id;
				this.parentId = parentId;
				this.pasUserId = pasUserId;
				this.chooseItemindex = index;
				this.$refs.eva.open();
			},
			successEva() {
				this.$refs.dynamic.uploadEva();
				this.$refs.eva.close();
			},
			showPrev(index, arr) {
				let array=[];
				arr.map(item=>{
					array.push(item.imgUrl)
				})
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
					current: index,
					urls: array
				})
			},
			blackUser() {
				this.post(this.apis.blackUser, {
					targetUserId: this.id, //被拉黑的用户id
					userId: uni.getStorageSync('cityUserid'), //当前用户id
				}).then(res => {
					if (res.code == 0) {
						this.$toast(res.msg);
						let pages=getCurrentPages();
						let prevPage=pages[pages.length-2];
						if(prevPage.route=="pages/index/index"){
							prevPage.$vm.getuserList();
						}
						console.log(prevPage)
						setTimeout(() => {
							uni.navigateBack();
						}, 1000)
					}
				})
			},
			showModelVideo(data) {
				this.videoUrl = data;
				this.showVideo=true;
			}
		},
		onNavigationBarButtonTap: function(e) {
			console.log(e.index == 0);
			if (e.index == 0) {
				this.showMeau = !this.showMeau;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userEva {
		.title {
			padding-left: 30rpx;
		}

		.evaTag {
			margin: 46rpx 0 0;
			flex-wrap: wrap;

			>view {
				color: #6B6D71;
				height: 66rpx;
				line-height: 66rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 26rpx 1px rgba(159, 159, 159, 0.16);
				border-radius: 33rpx 33rpx 33rpx 6rpx;
				padding: 0 28rpx;
				margin: 0 34rpx 30rpx 0;
				position: relative;

				text {
					font-size: 20rpx;
					min-width: 34rpx;
					text-align: center;
					height: 34rpx;
					line-height: 34rpx;
					background: #FF4364;
					padding: 0 10rpx;
					border-radius: 50%;
					position: absolute;
					top: -14rpx;
					right: -4rpx;
					display: block;
					box-sizing: border-box;
				}
			}
		}

		.synthesis {
			padding-left: 30rpx;

			.uni-rate {
				margin: 0 29rpx;
			}
		}
	}

	.report {
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		padding-top: 50rpx;

		.title {
			text-align: center;
			margin-bottom: 30rpx;
		}

		.scroll-view {
			max-height: 800rpx;

			.reports {
				>view {
					height: 90rpx;
					line-height: 90rpx;
					border-bottom: 1px solid #F3F3F3;
				}
			}
		}
	}

	.imgs {
		>image {
			width: 217rpx;
			height: 217rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
		}

		>image:not(:nth-child(3n)) {
			margin-right: 20rpx;
		}
	}

	.userMsg {
		.title {
			margin-bottom: 34rpx;
			.name{
				font-weight: 500;
			}
		}

		.msg {
			margin-left: 30rpx;
			flex: 1;
			flex-wrap: wrap;

			&-item {
				height: 54rpx;
				line-height: 54rpx;
				background: #F3F3F3;
				border-radius: 27rpx;
				padding: 0 28rpx;
				margin: 0 12rpx 12rpx 0;
			}
		}

		.mt-25 {
			margin-bottom: 25rpx !important;
		}
	}

	.nav {
		padding: 0 50rpx;
		margin: 70rpx 0 57rpx;

		>view {
			padding-bottom: 28rpx;
		}

		>.font36 {
			font-weight: 500;
			position: relative;
		}

		.font36:after {
			content: '';
			position: absolute;
			bottom: 0;
			width: 38rpx;
			height: 8rpx;
			background: #FF4364;
			border-radius: 4rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.fixedBottom {
		>view {
			width: 320rpx;
			height: 90rpx;
			box-shadow: 0 10rpx 21rpx 0 rgba(255, 67, 100, 0.39);
			border-radius: 45rpx;

			image {
				width: 74rpx;
				height: 74rpx;
			}
		}

		>view:nth-child(1) {
			background: #FF4364;
		}

		>view:nth-child(2) {
			border: 2rpx solid #FF4364;
		}
	}

	.content {
		background: #fff;
		margin-top: -43rpx;
		position: relative;
		z-index: 10;
		border-radius: 30rpx 30rpx 0 0;
		padding: 43rpx 30rpx 0;
	}

	.right-user {

		.vipIcon {
			width: 86rpx;
			height: 32rpx;
			margin-left: 10rpx;
		}

		&-top {
			flex-direction: column;
			width: 100%;
		}

		&-name {
			&-text {
				flex-wrap: wrap;
				flex: 1;

				.font32 {
					font-weight: 500;
				}

				.realPeople {
					height: 32rpx;
					background: rgba(255, 67, 100, .1);
					border-radius: 6rpx;
					padding: 0 8rpx;
					margin-left: 8rpx;

					>image {
						width: 18rpx;
						height: 20rpx;
						margin-right: 6rpx;
					}
				}
			}
		}

		&-address {
			color: #848484;
			margin: 30rpx 0 0;
			line-height: 42rpx;
		}

		&-bottom {
			margin: 27rpx 0 0;

			>view {
				height: 40rpx;
				background: rgba(133, 133, 133, .1);
				border-radius: 6rpx;
				padding: 0 12rpx;
				margin-right: 12rpx;

				>image {
					width: 18rpx;
					height: 21rpx;
					margin-right: 12rpx;
				}

				>text {
					display: block;
					width: 8rpx;
					height: 8rpx;
					background: #2BBD24;
					border-radius: 50%;
					margin-right: 10rpx;
				}
			}
		}
	}

	.meau {
		position: fixed;
		top: calc(var(--window-top) - 20rpx);
		right: -10rpx;
		z-index: 30;
		width: 137rpx;
		height: 227rpx;
		padding: 34rpx 30rpx 0;
		box-sizing: inherit;
		background: url(../../static/image/meau.png) no-repeat;
		background-size: 100% 100%;

		>view {
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
		}

		>view:not(:first-child) {
			border-top: 1px solid #E5E5E5;
		}
	}

	.cover-img {
		width: 100%;
		height: 750rpx;
	}

	.realPeoplemen {
		background: rgba(255, 195, 0, .1) !important;

		image {
			width: 11rpx !important;
			height: 20rpx !important;
		}
	}
</style>
