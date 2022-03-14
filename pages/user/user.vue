<template>
	<view class="user safeBottom100">
		<view class="status_bar"></view>
		<view class="top flex row-center column-end" @click="toSetting">
			<image src="../../static/image/user-01.png" mode="" class="icon48"></image>
		</view>
		<view class="flex userMsg row-center" @click="judge(9)">
			<image :src="userinfo.headImg" mode="aspectFill" v-if="userinfo&&userinfo.headImg" class="avatar" ></image>
			<image src="../../static/image/avatar.png" mode="" class="avatar" v-else></image>
			<view class="" v-if="userinfo">
				<view class="name font38 flex row-center">{{userinfo.nickName||'设置昵称'}} <image src="../../static/image/user-02-right.png" mode=""
						class="icon48"></image>
				</view>
				<view class="tag flex row-center">
					<view class="flex area-center font18 color364" v-if="userinfo.realFlag==1">
						<image src="../../static/image/smile-pink.png" mode=""></image>真人
					</view>
					<view class="flex area-center font18 color364" v-if="userinfo.sex=='女'&&userinfo.idolFlag==1">
						<image src="../../static/image/plaint.png" mode=""></image>女神
					</view>
					<view class="flex area-center font18 color300" v-if="userinfo.sex=='男'&&userinfo.idolFlag==1" style="background: rgba(255, 195, 0, .1)">
						<image src="../../static/image/plaint-yellow.png" mode="" style="width:11rpx;height:20rpx;"></image>男神
					</view>
					<image src="../../static/image/VIP.png" mode="" class="memberFlag" v-if="userinfo.memberFlag==1"></image>
					<image src="../../static/image/SVIP.png" mode="" class="memberFlag" v-if="userinfo.memberFlag==2"></image>
				</view>
			</view>
			<view class="font34" v-else>去登录</view>
		</view>
		<view class="tab-first flex area-around">
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/invite'" class="item flex area-center">
				<image src="../../static/image/user-03.png" mode="" class="icon48"></image>
				<view class="font22 color000">邀请有礼</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/likeMe'" class="item flex area-center">
				<image src="../../static/image/user-04.png" mode="" class="icon48"></image>
				<view class="font22 color000">喜欢我的</view>
				<text class="nearNum font24 color364" v-show="userinfo&&(userinfo.likemeNum-0)>0">+{{userinfo.likemeNum}}</text>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/friend'" class="item flex area-center">
				<image src="../../static/image/user-05.png" mode="" class="icon48"></image>
				<view class="font22 color000">我喜欢的</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/attestation'" class="item flex area-center">
				<image src="../../static/image/user-06.png" mode="" class="icon48"></image>
				<view class="font22 color000">认证中心</view>
			</navigator>
		</view>
		<view class="tab-second flex area-between">
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/wallet/wallet'" class="item flex area-center">
				<view class="flex area-center font32 color727">
					<image src="../../static/image/user-07.png" mode="" class="icon48"></image>我的钱包
				</view>
				<view class="count">{{userinfo.balance}}</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/vipCenter?memberFlag='+userinfo.memberFlag" class="item flex area-center">
				<view class="flex area-center font32 color727">
					<image src="../../static/image/user-08.png" mode="" class="icon48"></image>我的会员
				</view>
				<view class="font30 color727 flex area-center" v-show="userinfo.memberFlag!=3">{{userinfo.memberFlag!=0?userinfo.validityTime+'到期':'尊享特权 开通会员'}}<image
						src="../../static/image/user-09-right.png" mode="" class="right"></image>
				</view>
				<view class="font30 color727 flex area-center" v-show="userinfo.memberFlag==3">超级会员<image
						src="../../static/image/user-09-right.png" mode="" class="right"></image>
				</view>
			</navigator>
		</view>
		<view class="tab-third">
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/album'" class="flex area-between title">
				<view class="name font32 color727">我的相册</view>
				<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
			</navigator>
			<view class="flex image" v-if="albumList.length>0">
				<image v-for="(item,index) in albumList" :key="index" :src="item&&item.imgUrl?item.imgUrl:''" mode="aspectFill"></image>
			</view>
		</view>
		<view class="tab-else">
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/active'" class="flex row-center">
				<image src="../../static/image/user-11.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>我的动态</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/getEva'" class="flex row-center">
				<image src="../../static/image/user-12.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>我的评价</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
		</view>
		<view class="tab-else">
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/giftList'" class="flex row-center">
				<image src="../../static/image/user-13.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>礼物</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/userpraise'" class="flex row-center">
				<image src="../../static/image/user-14.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>赞过</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/visitor'" class="flex row-center">
				<image src="../../static/image/user-15.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>访客记录</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
			<navigator hover-class="none" :url="!userid?'/pages/login/login':'/pages/user/focusList'" class="flex row-center">
				<image src="../../static/image/user-16.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>关注列表</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
		</view>
		<view class="tab-else">
			<navigator hover-class="none" url="/pages/user/serves" class="flex row-center">
				<image src="../../static/image/user-17.png" mode="" class="icon48"></image>
				<view class="flex area-between colorb1b font32">
					<text>联系客服</text>
					<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
				</view>
			</navigator>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" rightText="单次付费" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import judge from "@/components/silder-like/judge.js";
	export default {
		mixins:[judge],
		data() {
			return {
				timer: null,
				albumList:[]
			};
		},
		computed:{
			...mapState(['userinfo','userid'])
		},
		onHide() {
			if (this.timer) clearTimeout(this.timer);
		},
		onShow() {
			this.getData();
			this.getUserAlbum(this.userid).then(res => {
				this.albumList=[];
				if(res.rows.length>0){
					for(let i=0;i<3;i++){
						this.albumList.push(res.rows[i])
					}
				}
			});
		},
		methods: {
			...mapMutations(['setuserinfo']),
			...mapActions(['getUserAlbum', 'getGoldPay', 'getHintgold','getUserInfo']),
			getData(){
				if (uni.getStorageSync('cityUserid')) {
					this.getUserInfo().then(res => {
						this.setuserinfo(res);
						if (res.accountStatus == 2) {
							// 账号状态 1正常 2注销
							this.$toast('您的账号已注销，请重新注册登录');
							uni.clearStorageSync();
							this.clearData();
							uni.reLaunch({
								url: '/pages/login/login'
							})
							return;
						}
					}).catch(err => {
						console.log(err)
					})
				}
			},
			successOperate(){
				// 允许功能性操作
				let url;
				if(this.costId==9){
					url='/pages/user/userMsg';
				}else if(this.costId==10){
					url='/pages/user/visitor';
				}else if(this.costId==11){
					url='/pages/user/likeMe';
				}
				uni.navigateTo({
					url
				})
			},
			toSetting() {
				uni.navigateTo({
					url: "/pages/user/setting"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.memberFlag{
		width:86rpx;
		height: 32rpx;
	}
	.status_bar {
		background: rgba(255, 255, 255, 0);
	}

	.right {
		width: 13rpx;
		height: 22rpx;
		margin-left: 11rpx;
	}

	.tab-else {
		margin: 20rpx 0 0;
		background: #FFFFFF;
		border-radius: 20rpx;

		>.flex {
			padding-left: 30rpx;
			height: 98rpx;

			>view {
				height: 100%;
				margin-left: 28rpx;
				flex: 1;
				padding-right: 30rpx;
			}
		}

		>.flex:not(:last-child) {
			>view {
				border-bottom: 1px solid #F8F8F8;
			}
		}
	}

	.tab-third {
		margin: 20rpx 0 0;
		background: #FFFFFF;
		padding: 0 30rpx 28rpx;
		border-radius: 20rpx;

		.title {
			padding-top:28rpx;
		}

		.image {
			>image {
				width: 202rpx;
				height: 202rpx;
				border-radius: 20rpx;
				margin:28rpx 0 0;
			}

			>image:not(:nth-child(3)) {
				margin-right: 12rpx;
			}
		}
	}

	.tab-second {
		margin: 20rpx 0 0;

		>.item {
			flex-direction: column;
			width: 335rpx;
			height: 160rpx;
			background: #FFF0E6;
			border-radius: 20rpx;
		}

		.count {
			font-size: 46rpx;
			font-family: DIN;
			font-weight: bold;
			color: #000000;
			margin: 20rpx 0 0;
		}

		>.item:nth-child(2) {
			background: #FAEDD1;

			>view:nth-child(2) {
				margin: 27rpx 0 0;
			}
		}
	}

	.tab-first {
		width: 690rpx;
		height: 150rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 49rpx auto 0;

		.item {
			flex-direction: column;
			position: relative;

			>view {
				margin: 16rpx 0 0;
			}

			.nearNum {
				position: absolute;
				top: -20rpx;
				right: 0;
				z-index: 4;
			}
		}
	}

	.userMsg {
		.avatar {
			width: 122rpx;
			height: 122rpx;
			border-radius: 50%;
		}

		>view {
			margin-left: 22rpx;

			.name {
				>image {
					margin-left: 8rpx;
				}
			}

			.tag {
				margin-top: 25rpx;

				>view {
					width: 80rpx;
					height: 32rpx;
					background: rgba(255, 67, 100, .1);
					border-radius: 6rpx;
					margin-right: 8rpx;

					>image {
						width: 18rpx;
						height: 20rpx;
						margin-right: 6rpx;
					}
				}
			}
		}
	}

	.top {
		height: 100rpx;
		padding: 0 9rpx;
	}

	.user {
		background: no-repeat fixed url(../../static/image/user-bg.png);
		background-size: 519rpx 556rpx;
		background-position: top right;
		min-height: 100vh;
		background-color: #F9F9F9;
		padding: 0 30rpx;
	}
</style>
