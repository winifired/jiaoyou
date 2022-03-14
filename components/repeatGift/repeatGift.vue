<template>
	<view class="giftList safeBottom">
		<view class="title font34 colorfff">请选择礼物</view>
		<scroll-view scroll-y="true" class="scroll-view">
			<view class="gifts flex">
				<view v-for="(item,index) in list" :key="index" class="flex area-center" @click.stop="choosed=item.id;giftImg=item.giftImg">
					<image src="../../static/image/choosed.png" mode="" class="choosed" v-if="choosed==item.id"></image>
					<image :src="item.giftImg" mode="aspectFit" class="gift-img"></image>
					<view class="font26 colorfff name">{{item.giftName}}</view>
					<view class="font22 colorfff">{{item.giftPrice}}金币</view>
				</view>
			</view>
		</scroll-view>
		<view class="flex row-center column-end nums">
			<text class="font30 colorfff">赠送数量</text>
			<view class="flex row-center font34 colorfff">
				<text @click.stop="changeNum(1)">-</text>
				<text>{{giftNum}}</text>
				<text @click.stop="changeNum(2)">+</text>
			</view>
		</view>
		<view class="confirm" @click.stop="confirmGift" :class="noClick?'noClick':''">赠送</view>
	</view>
</template>

<script>
	export default {
		name: "repeat",
		props:{
			userid:{
				type:[Number,String],
				default:''
			},
			dynamicId:{
				type:[Number,String],
				default:''
			}
		},
		data() {
			return {
				giftNum:1,
				list:[],
				choosed:'',
				giftImg:'',
				noClick:false
			};
		},
		mounted() {
			this.noClick=false;
			this.getGigt();
		},
		methods: {
			changeNum(type){
				if(type==1){
					// -
					if(this.giftNum>1){
						this.giftNum--;
					}
				}else{
					// +
					this.giftNum++;
				}
			},
			getGigt(){
				this.post(this.apis.giftList).then(res => {
					if (res.code == 0) {
						this.list = res.data;
						this.choosed=res.data.length>0?res.data[0].id:'';
						this.giftImg=res.data.length>0?res.data[0].giftImg:'';
					}
				})
			},
			confirmGift(){
				this.noClick=true;
				this.post(this.apis.sendGifts,{
					userId:this.userid,//收到礼物用户id
					dynamicId:this.dynamicId,
					giftNum:this.giftNum,
					giveUserId:uni.getStorageSync('cityUserid'),//赠送礼物用户id
					giftId:this.choosed,//礼物id复制
				}).then(res => {
					if (res.code == 0) {
						this.$emit('confirmGift',res.msg);
						this.$emit('confirmGiftImg',{giftImg:this.giftImg,giftNum:this.giftNum})
					}else{
						this.$toast(res.msg)
					}
					this.noClick=false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.giftList {
		background: rgba(0, 0, 0, .9);
		border-radius: 30rpx 30rpx 0 0;
		padding-top: 50rpx;
	
		.title {
			padding-left: 55rpx;
			margin-bottom: 48rpx;
		}
	
		.scroll-view {
			max-height: 600rpx;
	
			.gifts {
				padding-top: 30rpx;
	
				>view {
					flex-direction: column;
					margin-left: 30rpx;
					margin-bottom: 67rpx;
					position: relative;
	
					.choosed {
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						top: -14rpx;
						right: 0;
						z-index: 3;
					}
	
					>.gift-img {
						width: 150rpx;
						height: 127rpx;
					}
	
					.name {
						margin: 10rpx 0 13rpx;
					}
				}
			}
		}
	
		.nums {
			>view {
	
				>text:nth-child(1),
				>text:nth-child(3) {
					width: 70rpx;
					text-align: center;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}
	
		.confirm {
			width: 660rpx;
			height: 86rpx;
			line-height: 86rpx;
			margin: 46rpx auto 0;
		}
	}
</style>
