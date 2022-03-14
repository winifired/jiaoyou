<template>
	<view class="discover">
		<view class="status_bar"></view>
		<view class="filtrate flex area-between">
			<uni-icons type="left" @click="back" size="24"></uni-icons>
			<view class="flex area-between">
				<view @click="filtrate" class="flex area-center filtrate-nav font22 color333">
					<image src="../../static/image/filtrate.png" mode=""></image>精准匹配
				</view>
				<navigator url="/pages/user/likeMe" hover-class="none" class="flex area-center"
					v-if="likemeArray.length>0">
					<text class="font28 colora1a">喜欢我:</text>
					<view class="flex row-center loveMe">
						<view class="dot">...</view>
						<view class="loveMe-item flex row-center">
							<image :src="item.headImg" mode="" v-for="(item,index) in likemeArray" :key="index"></image>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="content">
			<view class="surplus flex row-end column-center">
				<view class="colorfff font32">{{matchingNum}}</view>
				<view class="font22">剩余匹配</view>
			</view>
			<!-- :class="userinfo.memberFlag==0?'filter':''"
			 transform:
			 	index < number
			 		? `scale(${1 - (1 - scale.x) * index},${1 - (1 - scale.y) * index}) translate(${translate.x * index}px, ${translate.y * index}px)`
			 		: `scale(${1 - (1 - scale.x) * (number - 1)},${1 - (1 - scale.y) * (number - 1)}) translate(${translate.x * (number - 1)}px, ${translate.y * (number - 1)}px)`,
			 -->
			<view v-for="(item,index) in dataList" class="list" :class="{'animation':isAnimating}" :key="item.id"
				:style="{
					zIndex: `${dataList.length-index}`,
					opacity: index < number ? `${1 - (1 - opacity) * index}` : `${1 - (1 - opacity) * (number - 1)}`,
					left:item.left+'px',top:item.top+'px',
				}" @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchcancel.stop="touchCancel"
				@touchend.stop="touchCancel">
				<image :src="item.matchImg" mode="" @click.stop="toDetail(item.id)" mode="aspectFill"></image>
				<view class="right-user">
					<view class="right-user-top">
						<view class="right-user-name flex area-between">
							<view class="right-user-name-text flex row-center">
								<text class="font38 colorfff">{{item.nickName}}</text>
								<image src="../../static/image/VIP.png" mode="" class="vipIcon"
									v-if="item.memberFlag==1"></image>
								<image src="../../static/image/SVIP.png" mode="" class="vipIcon"
									v-if="item.memberFlag==2"></image>
								<view class="realPeople flex area-center font18 colorfff" v-if="item.realFlag==1">
									<image src="../../static/image/smile-act.png" mode=""
										style="width: 18rpx;height: 18rpx;"></image>真人
								</view>
								<view class="realPeople flex area-center font18 colorfff"
									v-if="item.sex=='女'&&item.idolFlag==1">
									<image src="../../static/image/plaint-white.png" mode=""
										style="width: 10rpx;height: 20rpx;"></image>女神
								</view>
								<view class="realPeople flex area-center font18 colorfff"
									v-if="item.sex=='男'&&item.idolFlag==1" style="background:#FFC300">
									<image src="../../static/image/plaint-yellow-white.png" mode=""
										style="width: 11rpx;height: 20rpx;"></image>男神
								</view>
							</view>
						</view>
						<view class="right-user-address font28 colorfff">
							{{item.age}}岁 | {{item.constellation}} | {{item.residentCity}}
						</view>
					</view>
					<view class="flex right-user-bottom row-center">
						<view class="flex row-center font24 colorfff" v-if="item.distanceFlag==1&&item.distance">
							<image src="../../static/image/place-white.png" mode=""></image>{{item.distance}}km
						</view>
						<view class="font24"
							:class="item.lastOnlineTimeName=='当前在线'?'flex row-center colord24':'colorfff'"
							v-if="item.onlineFlag==1">
							<text v-if="item.lastOnlineTimeName=='当前在线'"></text>{{item.lastOnlineTimeName}}
						</view>
					</view>
				</view>
			</view>
			<view class="noDa2" v-if="dataList.length==0">
				<image src="../../static/image/filf.png" mode="" class="filf"></image>
			</view>
		</view>
		<view class="flex area-between bottomBtns">
			<image src="../../static/image/refuse-white.png" mode="" class="imgB" @click.stop="reset()"></image>
			<image src="../../static/image/discover-clear.png" mode="" class="imgC" @click.stop="nolike()"></image>
			<image src="../../static/image/discover-love.png" mode="" class="imgC" @click.stop="like()"></image>
			<image src="../../static/image/discover-s.png" mode="" class="imgB" @click.stop="chooseChat()"></image>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
		<uni-popup ref="tipMsgBuy" type="bottom" :safe-area="false">
			<tipBuyItem :typeBuy="3" :buyMonery="buyMonery" :costId="costId" @successOperate="successBuy"></tipBuyItem>
		</uni-popup>
	</view>
</template>

<script>
	import flyCard from "../../components/silder-like/flyCard.js";
	import judge from "../../components/silder-like/judge.js"
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		mixins: [flyCard, judge],
		data() {
			return {
				dataList: [],
				form: {
					userId: uni.getStorageSync('cityUserid'),
					sex: '', //性别 男男 女女 不限 不限
					minAge: 17, //最小年龄
					maxAge: 50, //最大年龄
					onlineFlag: 0, //是否在线1是0否
					hobby: '', //兴趣爱好 多个逗号分隔
					disposition: '', //性格特点多个逗号分隔
					maxweight: '', //最大体重
					minweight: '', //最小体重
					maxheight: '', //最大身高
					minheight: '', //最小身高
					address: ''
				},
				matchingNum:0,
				showList: false,
				likemeArray: [],
				chooseId: '',
			};
		},
		computed: {
			...mapState({
				location: state => state.address?.city,
				userMatchinglist: state => state.userMatchinglist,
				userinfo: state => state.userinfo,
				latitude: state => state.latitude,
				longitude: state => state.longitude,
			})
		},
		watch: {
			// dataList(newData) {
			// 	if (newData.length == 0) {
			// 		this.judge(2)
			// 	}
			// }
		},
		onLoad() {
			this.form.sex=this.userinfo.sex=='男'?'女':'男';
			this.judge(2)
		},
		methods: {
			...mapMutations(['setuserMatchinglist']),
			chooseChat() {
				if(this.dataList.length==0)return;
				this.chooseId = this.dataList[0].id;
				this.judge(14,this.chooseId)
			},
			successOperate() {
				let that = this;
				if (that.costId == 14) {
					// 匹配中的联系TA
					that.toChat();
				} else if (that.costId == 13) {
					that.recall()
				}
			},
			successOperate2(num) {
				console.log(num)
				this.getData(num)
			},
			successBuy(num) {
				// 匹配支付成功
				this.$refs.tipMsgBuy.close();
				this.getData(num);
			},
			toChat() {
				uni.navigateTo({
					url: "/pages/TUI-Chat/chat?conversationID=" + `C2C${this.chooseId}`
				});
			},
			getData(num) {
				uni.showLoading();
				setTimeout(()=>{
					uni.hideLoading();
				},1000)
				this.showList = false;
				this.post(this.apis.likeme, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: 1,
					pageSize: 3
				}).then(res => {
					if (res.code == 0) {
						this.likemeArray = res.data.rows;
					}
				});
				this.form['latitude'] = this.latitude;
				this.form['longitude'] = this.longitude;
				this.form['matchNum'] = num; //可匹配的数量
				console.log(this.form)
				this.post(this.apis.userMatchinglist, this.form).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.matchingNum=res.matchingNum;
						if(res.matchingNum==0){
							this.tipso(2);
							return;
						}
						if(res.userList.length==0&&res.userList.length<res.matchingNum){
							this.$toast('没有匹配到合适的用户')
						}
						if (res.userList.length > 0) {
							res.userList.map((item, index) => {
								item.left = 0;
								item.top = 0;
								item.index = index;
							});
							this.setuserMatchinglist(this.deepClone(res.userList));
							this.dataList = res.userList;
						} else {
							// this.setuserMatchinglist([]);
							this.dataList = []
						}
					} else {
						this.$toast(res.msg)
					}
				})
			},
			deepClone(arr) {
				let _arr = JSON.stringify(arr),
					arrClone = JSON.parse(_arr);
				return arrClone
			},
			reset() {
				console.log(this.userMatchinglist)
				console.log(this.dataList)
				if(this.userMatchinglist.length==0)return;
				if (this.dataList.length == this.userMatchinglist.length) return;
				this.judge(13)
			},
			recall() {
				// 撤回
				this.post(this.apis.matching, {
					userId: uni.getStorageSync('cityUserid'),
					targetUserId: this.dataList.length>0?this.userMatchinglist[this.dataList[0].index - 1].id:this.userMatchinglist[this.userMatchinglist.length-1].id, //被划用户id
					flag: 3, //0不喜欢 1喜欢 3撤回
				}).then(res => {
					if (res.code == 0) {
						if(this.dataList.length>0){
							this.dataList.unshift(this.userMatchinglist[this.dataList[0].index - 1]);
						}else{
							this.dataList.unshift(this.userMatchinglist[this.userMatchinglist.length-1]);
						}
						this.matchingNum++;
					} else {
						this.$toast(res.msg)
					}
				})
			},

			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
			like() {
				if(this.userMatchinglist.length==0)return;
				this.post(this.apis.matching, {
					userId: uni.getStorageSync('cityUserid'),
					targetUserId: this.dataList[0].id, //被划用户id
					flag: 1, //0不喜欢 1喜欢 3撤回
				}).then(res => {
					if (res.code == 0) {
						this.dataList.splice(0, 1);
						this.matchingNum--;
						if(this.dataList.length==0){
							this.tipso()
						}
					} else {
						this.$toast(res.msg)
					}
				})
			},
			nolike() {
				if(this.userMatchinglist.length==0)return;
				this.post(this.apis.matching, {
					userId: uni.getStorageSync('cityUserid'),
					targetUserId: this.dataList[0].id, //被划用户id
					flag: 0, //0不喜欢 1喜欢 3撤回
				}).then(res => {
					if (res.code == 0) {
						this.dataList.splice(0, 1);
						this.matchingNum--;
						if(this.dataList.length==0){
							this.tipso()
						}
					} else {
						this.$toast(res.msg)
					}
				})
			},
			tipso(){
				this.judge(2)
			},
			filtrate() {
				uni.navigateTo({
					url: `/pages/index/filtrate?location=${this.form.address?this.form.address:this.location}&sex=${this.form.sex}&minAge=${this.form.minAge}&maxAge=${this.form.maxAge}&onlineFlag=${this.form.onlineFlag}&num=${this.dataList.length}&issue=true`
				})
			},
			back() {
				uni.navigateBack()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.discover {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.noDa2 {
		width: 690rpx;
		height: calc(100vh - 360rpx);
		margin: 0 auto;

		>image {
			width: 100%;
			height: 100%;
		}
	}

	.none {
		width: 300rpx;
		height: 300rpx;
		margin: 0 auto 40rpx;
	}

	.filter {
		filter: blur(16rpx);
	}

	.content {
		width: 690rpx;
		height: calc(100vh - 360rpx);
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.bottomBtns {
		position: absolute;
		bottom: 0;
		z-index: 8;
		width: 100%;
		height: 201rpx;
		padding: 0 74rpx;
		background: url(../../static/image/tab-bg.png) no-repeat;
		background-size: 100% 100%;

		.imgB {
			width: 90rpx;
			height: 90rpx;
		}

		.imgC {
			width: 180rpx;
			height: 90rpx;
		}
	}

	.animation {
		transition: opacity .4s ease-out, left .4s ease-out, top .4s ease-out, width .4s ease-out, height .4s ease-out;
	}

	.list {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 34rpx;
		overflow: hidden;

		>image {
			width: 100%;
			height: 100%;
			border-radius: 34rpx;
		}

		.vipIcon {
			width: 86rpx;
			height: 32rpx;
			margin-left: 15rpx;
		}

		.right-user {
			height: 354rpx;
			background: url(../../static/image/discover-user-bg.png) no-repeat;
			background-size: 100% 100%;
			position: absolute;
			bottom: 0;
			z-index: 5;
			width: 100%;
			padding: 30rpx 40rpx 0 40rpx;

			&-name {
				&-text {
					flex-wrap: wrap;
					flex: 1;

					.font32 {
						font-weight: 500;
					}

					.realPeople {
						height: 32rpx;
						background: #FF4364;
						border-radius: 6rpx;
						padding: 0 8rpx;
						margin-left: 8rpx;

						>image {
							margin-right: 6rpx;
						}
					}
				}
			}

			&-address {
				margin: 26rpx 0 0;
				line-height: 42rpx;
			}

			&-bottom {
				margin: 26rpx 0 0;

				>view {
					height: 40rpx;
					background: rgba(255, 255, 255, .3);
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
						background: #fff;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}
			}
		}
	}

	.surplus {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10000;
		width: 190rpx;
		height: 190rpx;
		border-radius: 0 34rpx 0 0;
		background: url(../../static/image/surplus-bg.png) no-repeat;
		background-size: 100% 100%;
		flex-direction: column;
		padding-bottom: 76rpx;
		padding-right: 26rpx;

		>view:nth-child(2) {
			color: rgba(255, 255, 255, .5);
		}

		>view {
			transform: rotate(45deg);
		}
	}

	.filtrate {
		padding: 0 35rpx;
		height: 100rpx;
		background: #FFFFFF;

		>view {
			flex: 1;
		}
	}

	.filtrate-nav {
		width: 160rpx;
		height: 60rpx;
		background: #F5F5F5;
		border-radius: 30rpx;
		margin-right: 30rpx;

		>image {
			width: 23rpx;
			height: 25rpx;
			margin-right: 10rpx;
		}
	}

	.loveMe {
		position: relative;

		.dot {
			width: 36rpx;
			height: 24rpx;
			text-align: center;
			color: #FFFFFF;
			line-height: 0;
			background: #FF4143;
			border: 2rpx solid #FFFFFF;
			border-radius: 12rpx;
			position: absolute;
			top: 6rpx;
			right: -10rpx;
			z-index: 5;
		}

		.loveMe-item {
			margin-left: 30rpx;

			>image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				border: 1px solid #FFFFFF;
				margin-left: -14rpx;
				position: relative;
				filter: blur(4rpx);
			}
		}

	}
</style>
