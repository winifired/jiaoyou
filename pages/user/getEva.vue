<template>
	<view class="evaluateBox" >
		<view class="flex row-center" v-if="info">
			<view class="font32 color818 tink">综合得分</view>
			<uni-rate v-model="info.score" class="uni-rate" :readonly="true" activeColor="#FF8400" color="#EBEBEB" margin="4" :size="24" />
			<text class="font28 color999">{{info.score}}分</text>
		</view>
		<view class="flex area-between title" v-if="info">
			<view class="font32 color818 tink">收到的评价</view>
			<image src="../../static/image/delate.png" mode="" class='delate' @click="isDetail=!isDetail"></image>
		</view>
		<view class="evaluate-tag flex" v-if="info">
			<view v-for="(item,index) in info.evaluateList" :key="index" class="font28 color666">{{item.evaluate}}
			<text class="colorfff" @click="delate(item.id,index)">{{isDetail?'-':((item.evaluateNum-0)>99?'99+':item.evaluateNum)}}</text> </view>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel ref="tipModel" :content="content"
				:leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
	</view>
</template>

<script>
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins:[judge],
		data() {
			return {
				rate: 2,
				isDetail:false,
				info:null,
				chooseid:'',
				chooseindex:0,
			};
		},
		onLoad() {
			this.getData();
		},
		methods:{
			getData(){
				this.post(this.apis.userEvaluate, {
					targetUserId: uni.getStorageSync('cityUserid')
				}).then(res => {
					if (res.code == 0) {
						this.info = res.data;
					}
				});
			},
			delate(id,index){
				this.judge(17);
				this.chooseid=id;
				this.chooseindex=index;
			},
			successOperate(){
				// 允许功能性操作
				this.post(this.apis.delEvaluateNum, {
					userId: uni.getStorageSync('cityUserid'),
					evaId:this.chooseid,
				}).then(res => {
					this.$toast(res.msg)
					if (res.code == 0) {
						this.info.evaluateList.splice(this.chooseindex,1)
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.evaluateBox {
		padding: 30rpx;

		.title {
			margin: 70rpx 0 0;
		}

		.tink {
			margin-right: 30rpx;
		}

		.delate {
			width: 26rpx;
			height: 28rpx;
		}
		.evaluate-tag{
			flex-wrap: wrap;
			margin:60rpx 0 0;
			>view {
				height: 66rpx;
				line-height: 66rpx;
				padding: 0 29rpx;
				background: #FFFFFF;
				box-shadow: 0 0 26rpx 1rpx rgba(159, 159, 159, 0.16);
				border-radius: 33rpx 33rpx 33rpx 6rpx;
				margin: 0 34rpx 35rpx 0;
				position: relative;
				text{
					font-size: 20rpx;
					min-width: 34rpx;
					text-align: center;
					height: 34rpx;
					line-height: 34rpx;
					background: #FF4364;
					padding:0 10rpx;
					border-radius: 50%;
					position: absolute;
					top:-14rpx;
					right:-4rpx;
					display: block;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
