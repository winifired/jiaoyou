<template>
	<view class="tipMsgBuyCon safeBottom">
		<view class="font34 color101 title">确认购买</view>
		<view class="font32 flex area-between" v-show="costId==7">
			<text class="color000">语音收费标准</text>
			<text class="color364">{{buyMonery}}金币/分钟</text>
		</view>
		<view class="font32 flex area-between" v-show="costId==8">
			<text class="color000">视频收费标准</text>
			<text class="color364">{{buyMonery}}金币/分钟</text>
		</view>
		<view class="font32 flex area-between" v-show="costId==2">
			<text class="color000">匹配收费标准</text>
			<text class="color364">{{buyMonery}}金币/次</text>
		</view>
		<view class="font32 flex area-between changeTime">
			<text class="color000">{{costId==2?'匹配次数':'聊天时长'}}</text>
			<view class="time flex row-center">
				<view class="flex row-center">
					<view class="" @click.stop="changeTime(1)">-</view>
					<view class="">{{time}}</view>
					<view class="" @click.stop="changeTime(2)">+</view>
				</view>
				<text class="">{{costId==2?'次':'分钟'}}</text>
			</view>
		</view>
		<view class="confirm" @click="confirm">立即支付</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex';
	export default {
		name: "tipBuyItem",
		props: {
			buyMonery: {
				type: [String, Number],
				default: ''
			},
			costId: {
				//type 7语音 8视频 2精准匹配
				type: [String, Number],
				default: ''
			},
			targetUserid: {
				//type 7语音 8视频 2精准匹配
				type: [String, Number],
				default:0
			},
		},
		data() {
			return {
				time: 1
			};
		},
		methods: {
			...mapActions(['getGoldPay']),
			confirm() {
				this.post(this.apis.goldPay, {
					userId:uni.getStorageSync('cityUserid'), //用户id
					targetUserId:this.targetUserid,//被拨打者 id
					costId: this.costId,
					freenum:this.time
				}).then(res => {
					if (res.code == 0) {
						this.$emit('successOperate',this.time)
					}
					this.$toast(res.msg);
				})
			},
			changeTime(type) {
				if (type == 1) {
					//减
					if (this.time > 1) {
						this.time--;
					}
				} else {
					this.time++;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tipMsgBuyCon {
		width: 750rpx;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		padding-top: 50rpx;
		padding-left: 45rpx;
		padding-right: 45rpx;

		.title {
			text-align: center;
			margin: 0 0 40rpx;
		}

		.changeTime {
			margin: 50rpx 0 0;
		}

		.time {
			>view {
				>view:not(:nth-child(2)) {
					width: 47rpx;
					height: 47rpx;
					text-align: center;
					line-height: 47rpx;
					background: #F1F1F0;
					border-radius: 8rpx;
				}

				>view:nth-child(2) {
					color: #141414;
					margin: 0 17rpx;
				}
			}

			>text {
				color: #141414;
				margin-left: 19rpx;
			}
		}

		.confirm {
			width: 660rpx;
			height: 86rpx;
			line-height: 86rpx;
			margin-top: 67rpx;
		}
	}
</style>
