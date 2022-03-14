<template>
	<view class="evaluateBox">
		<view class="evaluate safeBottom250">
			<view class="font34 color000 tink">觉得TA</view>
			<view class="evaluate-tag flex">
				<view v-for="(item,index) in labelList" :key="index" class="font28 color666"
					:class="item.checked?'choosed':''" @click="toggle(item,index)">{{item.labelName}}</view>
			</view>
			<view class="font34 color000 rate tink">给TA打分</view>
			<uni-rate v-model="rate" class="uni-rate" activeColor="#FF8400" color="#EBEBEB" margin="14" :size="40" />
		</view>
		<view class="fixedBottom safeBottom">
			<view class="confirm" @click="confirm" :class="isClick?'noClick':''">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rate: 0,
				labelList: [],
				targetUserId: '',
				isClick: false
			};
		},
		onLoad(options) {
			console.log(options)
			this.targetUserId = options.targetUserId;
			this.getData();
		},
		methods: {
			toggle(item,index){
				item.checked=!item.checked;
				this.labelList[index]=item;
			},
			getData() {
				this.post(this.apis.labelList, {
					labelType: 5
				}).then(res => {
					if (res.code == 0) {
						if (res.data.length > 0) {
							res.data.map(item => {
								item.checked = false;
							})
						}
						this.labelList = res.data;
					}
				})
			},
			confirm() {
				let arr = [];
				this.labelList.map(item => {
					if (item.checked) {
						arr.push(item.labelName)
					}
				});
				if(arr.length==0){
					this.$toast("请选择标签");
					return;
				}
				if(this.rate==0){
					this.$toast("请打分");
					return;
				}
				this.isClick = true;
				this.post(this.apis.addEvaluate, {
					userId: uni.getStorageSync('cityUserid'),
					score: this.rate,
					content: arr.join(','), //评价
					targetUserId: this.targetUserId, //被评价用户id
				}).then(res => {
					this.isClick = false;
					this.$toast(res.msg);
					if (res.code == 0) {
						setTimeout(() => {
							uni.navigateBack();
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate {
		padding-top:43rpx;
		padding-left:28rpx;
		.tink {
			margin-bottom: 40rpx;
		}

		.rate {
			margin-top: 58rpx;
		}

		&-tag {
			flex-wrap: wrap;

			>view {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 35rpx;
				background: #F4F4F4;
				border-radius: 40rpx 40rpx 40rpx 4rpx;
				margin: 0 18rpx 30rpx 0;
			}

			.choosed {
				background: #FF4364 !important;
				color: #FFFFFF !important;
			}
		}
	}

	.confirm {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
	}
</style>
