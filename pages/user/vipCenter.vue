<template>
	<view class="vipCenter" :style="{paddingBottom:(bottomheight+10)+'px'}">
		<view class="flex area-around">
			<view class="swiper-item flex column-bwn" @click="change(0)" :class="current==0?'rotate':''">
				<view class="colorfff">
					VIP <text class="font36">会员</text>
				</view>
				<view class="font26 colorfff">{{memberFlag==1?'已激活':'暂未激活'}}</view>
			</view>
			<view class="swiper-item flex column-bwn swiper-itemla" @click="change(1)" :class="current==1?'rotate':''">
				<view class="colorfff">
					SVIP <text class="font36">会员</text>
				</view>
				<view class="font26 colorfff">{{memberFlag==2?'已激活':'暂未激活'}}</view>
			</view>
		</view>
		<view class="flex area-between title">
			<view class="font34">{{current==0?'VIP':'SVIP'}}
				{{current==0?memberPrivilege.length:memberPrivilegeS.length}}大特权
			</view>
			<text class="font28" @click="showMore=!showMore">{{showMore?'收回':'展开更多'}}</text>
		</view>
		<view class="list flex" :style="{height:showMore?'auto':'400rpx',overflow:showMore?'visible':'hidden'}">
			<view v-for="(item,index) in current==0?memberPrivilege:memberPrivilegeS" :key="index">
				<view class="font30 color333">{{item.privilegeName}}</view>
				<view class="font26 color333">{{item.content}}</view>
			</view>
		</view>
		<view class="fixedBottom safeBottom">
			<view class="cardList flex area-between">
				<view class="flex area-center" :class="choosed==1?'choosed':''" @click="choosed=1">
					<view class="font38 color000">月卡</view>
					<view class="price color364"> <text class="font24">￥</text>
						{{current==0?cardList.monthPrice:cardListS.monthPrice}}
					</view>
					<!-- <view class="tip" v-if="item.tip">{{item.tip}}</view> -->
				</view>
				<view class="flex area-center" :class="choosed==2?'choosed':''" @click="choosed=2">
					<view class="font38 color000">季卡</view>
					<view class="price color364"> <text class="font24">￥</text>
						{{current==0?cardList.quarterPrice:cardListS.quarterPrice}}
					</view>
				</view>
				<view class="flex area-center" :class="choosed==3?'choosed':''" @click="choosed=3">
					<view class="font38 color000">半年卡</view>
					<view class="price color364"> <text class="font24">￥</text>
						{{current==0?cardList.quarterPrice:cardListS.quarterPrice}}
					</view>
				</view>
				<view class="flex area-center" :class="choosed==4?'choosed':''" @click="choosed=4">
					<view class="font38 color000">年卡</view>
					<view class="price color364"> <text class="font24">￥</text>
						{{current==0?cardList.yearPrice:cardListS.yearPrice}}
					</view>
				</view>
			</view>
			<view class="confirm" :class="current==0?'btnbg':''" @click="open">开通{{current==0?'VIP':'SVIP'}}</view>
		</view>
		<uni-popup ref="popup" type="bottom" :safe-area="false">
			<view class="model safeBottom">
				<view class="model-title flex row-center column-end">
					<view class="font34 color101">支付选择</view>
					<view class="closeModel font28 color999" @click="close">取消</view>
				</view>
				<view class="payTypes">
					<view v-for="(item,index) in payTypes" :key="index" class="flex area-between item"
						@click="togglePay(item.id)">
						<view class="flex row-center font32 color000">
							<image :src="item.icon" mode="" class="icon48"></image>{{item.name}}
						</view>
						<image src="../../static/image/yes.png" mode="" class="yes" v-if="choosedPay==item.id"></image>
					</view>
				</view>
				<view class="confirm" @click="confirm" :class="isClick?'noClick':''">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				choosed: 1,
				bottomheight: 0,
				cardListS: {}, //svip
				cardList: {}, //vip
				payTypes: [{
						name: '钱包支付',
						icon: '../../static/image/wallet-icon.png',
						id:1,
					},
					{
						name: '微信支付',
						icon: '../../static/image/wx-pay.png',
						id:2,
					},
					{
						name: '支付宝',
						icon: '../../static/image/zfb.png',
						id:3,
					}
				],
				choosedPay: 1,
				memberPrivilege: [],
				memberPrivilegeS: [],
				showMore:false,
				isClick:false,
				memberFlag:0
			};
		},
		computed:{
			
		},
		onLoad({memberFlag}) {
			this.memberFlag=memberFlag;
			console.log(this.memberFlag)
			this.$nextTick(function() {
				this.getFixHeight();
			});
			this.getData(1);
			this.getData(2);
		},
		methods: {
			getData(type) {
				this.post(this.apis.memberPrice, {
					memberType: type, //会员类型1VIP 2svip
				}).then(res => {
					if (res.code == 0) {
						if (type == 1) {
							this.cardList = res.data;
						} else {
							this.cardListS = res.data;
						}
					}
				});
				this.post(this.apis.memberPrivilege, {
					memberType: type, //会员类型1VIP 2svip
				}).then(res => {
					if (res.code == 0) {
						if (type == 1) {
							this.memberPrivilege = res.data;
						} else {
							this.memberPrivilegeS = res.data;
						}
					}
				})
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			togglePay(id) {
				this.choosedPay = id;
			},
			change(data) {
				this.current = data;
			},
			getFixHeight() {
				//获取顶部固定栏高度
				let that = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('.fixedBottom').boundingClientRect(data => {
					that.bottomheight = data.height;
				}).exec();
			},
			confirm(){
				this.isClick=true;
				this.post(this.apis.openVIP, {
					userId:uni.getStorageSync('cityUserid'),//用户id
					payType:this.choosedPay,//支付类型1钱包2微信3支付宝
					memberFlag:this.current==0?1:2,//1VIP2SVIP
					memberType:this.choosed,//1月卡2季卡3半年卡4年卡
				}).then(res => {
					this.isClick=false;
					console.log(res)
					if (res.code == 0) {
						if(this.choosedPay==1){
							this.$toast(res.msg);
							setTimeout(()=>{
								uni.navigateBack();
							},1500)
						}else{
							this.opratePay(res.orderString);
						}
					}
				})
			},
			opratePay(orderString) {
				let _this = this;
				let data = {
					provider: _this.choosedPay == 2 ? 'wxpay' : 'alipay',
					orderInfo: orderString,
				}
				console.log(data)
				uni.requestPayment({
					provider: _this.choosedPay == 2 ? 'wxpay' : 'alipay',
					orderInfo: orderString,
					success: function(value) {
						this.$toast(res.msg);
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					},
					fail: function(err) {
						_this.clickPay = false;
						console.log(err)
						_this.$toast('充值失败');
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rotate{
		transform: scale(1.1,1.1);
	}
	.model {
		width: 100%;
		padding-bottom: 30rpx;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;

		.model-title {
			height: 137rpx;
			padding: 0 44rpx;

			.closeModel {
				margin-left: 210rpx;
			}
		}

		.payTypes {
			padding: 0 40rpx;

			.item {
				>view {
					>image {
						margin-right: 14rpx;
					}
				}

				.yes {
					width: 34rpx;
					height: 24rpx;
				}
			}

			.item:not(:last-child) {
				margin-bottom: 60rpx;
			}
		}
	}

	.fixedBottom {
		box-shadow: 0 0 13rpx 0 rgba(0, 0, 0, 0.1);
		padding-top: 30rpx;
	}

	.confirm {
		width: 600rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 59rpx auto 0;
		background: linear-gradient(246deg, #FE7E00 1%, #FFA302 99%);
	}

	.btnbg {
		background: linear-gradient(246deg, #FF4349 0%, #FF641A 100%);
	}

	.cardList {
		padding: 0 30rpx;

		>view {
			flex-direction: column;
			width: 162rpx;
			height: 200rpx;
			background: #FFFFFF;
			border: 2rpx solid #ECECEC;
			border-radius: 20rpx;
			position: relative;

			.price {
				font-size: 46rpx;
				font-weight: bold;
				margin: 10rpx 0 0;
			}

			.tip {
				padding: 0 14rpx;
				line-height: 34rpx;
				text-align: center;
				height: 34rpx;
				background: #FF4364;
				border-radius: 20rpx 0 20rpx 0;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 3;
				font-size: 19rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.choosed {
			border: 2px solid #FF4364 !important;
		}
	}

	.list {
		padding: 40rpx 0 0 28rpx;

		>view {
			margin-right: 15rpx;
			margin-bottom: 21rpx;
			width: 339rpx;
			padding: 30rpx 27rpx;
			background: #FFFFFF;
			border: 4rpx solid #EDEDED;
			border-radius: 11rpx;

			.font26 {
				line-height: 42rpx;
				margin: 20rpx 0 0;
			}
		}
	}

	.title {
		padding: 40rpx 30rpx 0;

		.font34 {
			color: #141414;
		}

		.font28 {
			color: #B0B0B0;
		}
	}

	.vipCenter {
		padding-top: 27rpx;
	}
	.swiper-item {
		flex-direction: column;
		width: 40%;
		height: 250rpx;
		margin: 26rpx auto 0;
		padding: 35rpx 0 40rpx 43rpx;
		background: no-repeat url(../../static/image/vip-bg.png);
		background-size: 100% 100%;
		box-shadow: 0px 11rpx 36rpx 4rpx rgba(255, 82, 52, 0.54);
		border-radius: 30rpx;

		>view:nth-child(1) {
			font-size: 42rpx;
			font-weight: bold;

			text {
				font-weight: 500;
				margin-left: 10rpx;
			}
		}
	}

	.swiper-itemla {
		background: no-repeat url(../../static/image/svip-bg.png);
		background-size: 100% 100%;
		box-shadow: 0px 11rpx 36rpx 4rpx rgba(255, 140, 1, 0.54);
	}
</style>
