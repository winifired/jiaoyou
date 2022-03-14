<template>
	<view>
		<view class="fixedTop">
			<view class="status_bar"></view>
			<view class="flex area-between navbar">
				<view class="flex row-center">
					<view :class="choosed==1?'choosed':'font36 color666'" @click="choosed=1">推荐</view>
					<view :class="choosed==2?'choosed':'font36 color666'" @click="choosed=2">附近</view>
					<view :class="choosed==3?'choosed':'font36 color666'" @click="choosed=3">关注</view>
				</view>
				<image src="../../static/image/issue.png" mode="" class="issue" @click.stop="openreportModel"></image>
			</view>
			<view class="flex row-center nav">
				<view class="font32" :class="choosedS==1?'color000 choosedS':'color666'" @click="choosedS=1">动态
				</view>
				<view class="font32" :class="choosedS==2?'color000 choosedS':'color666'" @click="choosedS=2">节目
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view class="list">
				<view v-for="(item,index) in list" :key="item.id" class="flex"
					@click="operation('',{id:item.id},index)">
					<image :src="item.headImg" mode="aspectFill" class="avatar" @click.stop="userDetail(item.userId)">
					</image>
					<view class="right">
						<view class="nickName font32 color000">{{item.nickName||''}}</view>
						<view class="time font24 color898">{{item.releaseTime}}</view>
						<view class="text font30">{{item.content}}</view>
						<view class="imgs flex" v-if="item.annexUrl.length>0">
							<!-- :class="item.annexUrl.length==1||tag.type==2?'bigImg':''" -->
							<view v-for="(tag,tag_index) in item.annexUrl" :key="tag_index"
								@click.stop="showPrev(tag.type,tag.url,item.annexUrl)">
								<image :src="tag.url" mode="aspectFill" v-if="tag.type==1" :lazy-load="true"></image>
								<image :src="tag.videoCover" mode="aspectFill" v-if="tag.type==2" :lazy-load="true">
								</image>
								<image src="../../static/image/playIcon.png" mode="" class="playIcon"
									v-if="tag.type==2">
								</image>
							</view>
						</view>
						<view class="flex place font24 color999" v-if="item.position">
							<image src="../../static/image/place-gray.png" mode=""></image>
							<view class="">{{item.position}}</view>
						</view>
						<view class="flex bottom-btns row-center column-end">
							<image src="../../static/image/gift-pink.png" mode="" class="gift-pink"
								@click.stop="operation(3,{id:item.id},index)"></image>
							<view class="flex row-center font24 eva-btn" @click.stop="operation(1,{id:item.id},index)">
								<image src="../../static/image/eva-icon.png" mode="" class="love"></image>
								{{item.commentNum}}
							</view>
							<view class="flex row-center font24" @click.stop="operation(2,{id:item.id},index)">
								<image src="../../static/image/zan1.png" mode="" class="love2"
									v-if="item.praiseFlag==1">
									<image src="../../static/image/zan.png" mode="" class="love2" v-else></image>
									{{item.praiseNum}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-popup ref="reportModel" type="bottom" :safe-area="false">
			<view class="report safeBottom">
				<view class="title font34 color101 flex column-end row-center">请选择发布类型 <text
						class="font30 color999 close" @click="closereportModel">取消</text> </view>
				<scroll-view scroll-y="true" class="scroll-view">
					<view class="reports">
						<view class="flex area-center font30 color333" @click.stop="confirmRepeat(1)">动态</view>
						<view class="flex area-center font30 color333" @click.stop="confirmRepeat(2)">节目</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :title="title" :content="content" leftText="开通会员" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
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
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins: [judge],
		data() {
			return {
				choosed: 1, //1推荐2附近3关注
				choosedS: 1,
				pageNum: 1,
				pageSize: 5,
				total: 0,
				list: [],
				// 提示
				title: '',
				content: '',
				costId: '',
				// 选中的item
				msgData: null,
				msgDataindex: 0,
				videoUrl: '',
				showVideo: false
			};
		},
		watch: {
			changeChoose(newData) {
				console.log(newData)
				this.choosed = newData.choosed;
				this.choosedS = newData.choosedS;
				this.pageNum = 1;
				this.getDynamic();
			}
		},
		onLoad() {
			this.pageNum = 1;
			this.getDynamic();
		},
		computed: {
			changeChoose() {
				const {
					choosed,
					choosedS
				} = this;
				return {
					choosed,
					choosedS
				}
			},
			...mapState(['latitude', 'longitude', 'userinfo'])
		},
		onPullDownRefresh() {
			this.pageNum = 1;
			this.getDynamic();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if (this.total > this.list.length) {
				this.pageNum++;
				this.getDynamic();
			}
		},
		methods: {
			...mapActions(['getHintgold']),
			async operation(type, data, index) {
				// 所有的功能性操作都需要判断是否是会员，都需要先进入这个方法
				this.type = type;
				this.msgData = data;
				this.msgDataindex = index;
				if (this.type == 2) {
					this.judge(5);
				} else {
					this.toDetail();
				}
			},
			successOperate() {
				if (this.type == 2) {
					this.togglePraise()
				} else if (this.type == 3) {
					// 发布
					this.$refs.reportModel.open();
				}
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/dynamic/dynamic-detail?type=' + this.type + '&detailId=' + this.msgData.id +
						'&msgDataindex=' + this.msgDataindex
				})
			},
			userDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
			getDynamic() {
				this.post(this.apis.dynamicListByState, {
					userId: uni.getStorageSync('cityUserid'),
					type: this.choosedS, //1动态2节目
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					positionLongitude: this.longitude, //经度
					positionLatitude: this.latitude, //纬度
					state: this.choosed, //1推荐2附近3关注
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
			async openreportModel() {
				// 发布
				this.type = 3;
				this.costId = 15;
				let status = await this.getHintgold({costId:this.costId});
				console.log(status)
				if (status.code == 0) {
					this.$refs.reportModel.open();
				} else if (status.code == 300) {
					this.title = "发布提示";
					this.leftText = '取消';
					this.content = '您的次数已用尽，请支付' + status.monery + '金币获得本次操作权限。';
					this.$refs.tipMsg.open();
				} else if (status.code == 500) {
					this.title = "发布提示";
					this.leftText = '开通会员';
					this.content = '您还不是会员，成为会员才能进行该操作，或者支付' + status.monery + '金币获得本次操作权限。';
					this.$refs.tipMsg.open();
				}
			},
			closereportModel() {
				this.$refs.reportModel.close();
			},
			showTip() {
				this.$refs.tipMsg.open();
			},
			confirmRepeat(type) {
				uni.navigateTo({
					url: '/pages/dynamic/issue?type=' + type
				});
				this.$refs.reportModel.close();
			},
			togglePraise() {
				// 点赞
				this.post(this.apis.dynamicPraise, {
					userId: uni.getStorageSync('cityUserid'),
					dynamicId: this.msgData.id,
				}).then(res => {
					if (res.code == 0) {
						this.list[this.msgDataindex].praiseFlag = res.data.praiseFlag;
						this.list[this.msgDataindex].praiseNum = res.data.praiseNum;
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
		},
		components: {}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";

	.report {
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		padding-top: 50rpx;

		.title {
			margin-bottom: 30rpx;

			.close {
				margin-left: 169rpx;
				margin-right: 30rpx;
			}
		}

		.scroll-view {
			max-height: 800rpx;
			padding-bottom: 30rpx;

			.reports {
				>view {
					height: 90rpx;
					line-height: 90rpx;
					border-bottom: 1px solid #F3F3F3;
				}
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

	.nav {
		padding: 0 36rpx;
		height: 100rpx;

		>view {
			padding-bottom: 13rpx;
		}

		.choosedS {
			position: relative;
			font-weight: 500;
		}

		.choosedS:after {
			position: absolute;
			bottom: 0;
			content: '';
			width: 32rpx;
			height: 8rpx;
			background: #FF4364;
			border-radius: 4rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.list {
		padding-top: calc(var(--status-bar-height) + 220rpx);
		margin-top: 0;

		>view {
			padding: 37rpx 30rpx 30rpx;
			border-bottom: 1px solid #F3F3F3;
		}

		>view:not(:last-child) {
			margin-bottom: 0;
		}
	}

	.navbar {
		padding: 0 33rpx;
		height: 100rpx;
		box-shadow: 0px 0px 40rpx 0px rgba(239, 239, 239, 0.42);

		>view {
			>view {
				margin-right: 52rpx;
			}
		}
	}

	.choosed {
		font-size: 44rpx;
		color: #000000;
	}

	.issue {
		width: 61rpx;
		height: 61rpx;
	}
</style>
