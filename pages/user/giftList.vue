<template>
	<view>
		<view class="fixedTop">
			<view class="address-book flex area-center">
				<view class="font34 color999" :class="actived==1?'actived':''" @click="togglaActive(1)">我收到的</view>
				<view class="font34 color999" :class="actived==2?'actived':''" @click="togglaActive(2)">我送出的</view>
			</view>
		</view>
		<view class="list flex">
			<view v-for="(item,index) in list" :key="index" class="flex area-center" :class="item.checked?'choosed':''"
			 @click="item.checked=!item.checked" @longpress="longpress(item.id,index)">
				<image :src="item.giftImg" mode="aspectFit" class="gift"></image>
				<view class="name font30 color000">{{item.giftName}}</view>
				<view class="price font22 color000">{{item.totalPrice}}金币</view>
				<view class="flex area-center fromUser font32 color101">
					<image :src="item.headImg" mode="" class="avatar"></image>
					<text class="line1">{{item.nickName}}</text>
				</view>
				<view class="font28 color999">{{item.giveTime}}</view>
				<image src="../../static/image/right-top.png" mode="" class='right-top' v-if="item.checked"></image>
			</view>
		</view>
		<view class="fixedBottom safeBottom">
			<view class="flex area-between total">
				<view class="flex row-center font30 color101 toggleIcon" @click="chooseAll">
					<image src="../../static/image/choose.png" mode="" v-if="!choosedAll" class="icon38"></image>
					<image src="../../static/image/twoCY.png" mode="" v-else class="icon38"></image>全选({{chooseTotal}})
					<view class="font30 color101 allPrice">
						共计 <text class="color364">{{chooseTotalPrice}}金币</text>
					</view>
				</view>
				<view class="confirm" @click="confirm" v-if="actived==1" :class="noClick||chooseTotal==0?'noClick':''">兑换</view>
				<view class="confirmH" v-else></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actived: 1,//1收到的2赠送的
				choosedAll:false,
				pageNum:1,
				pageSize:15,
				list:[],
				total:0,
				chooseTotal:0,
				chooseTotalPrice:0,
				giftCommission:0,
				noClick:false
			};
		},
		watch:{
			list:{
				handler(newData){
					this.checkList();
				},
				deep:true
			}
		},
		onLoad() {
			this.getData();
		},
		onReachBottom() {
			if(this.total>this.list.length){
				this.getData();
			}
		},
		methods: {
			chooseAll(){
				this.choosedAll=!this.choosedAll;
				this.list.map(item=>{
					item.checked=this.choosedAll;
				});
				this.checkList();
			},
			checkList(){
				let total=0,totalP=0;
				this.list.map(item=>{
					if(item.checked){
						total++;
						totalP+=(item.totalPrice-0)
					}
				});
				if(total==this.list.length){
					this.choosedAll=true;
				}else{
					this.choosedAll=false;
				}
				this.chooseTotalPrice=this.actived==1?(totalP*this.giftCommission).toFixed(2):totalP.toFixed(2);
				this.chooseTotal=total;
			},
			getData(){
				this.post(this.apis.getAndsendGift, {
					userId: uni.getStorageSync('cityUserid'),
					flag:this.actived,
					pageNum:this.pageNum,
					pageSize:this.pageSize,
				}).then(res => {
					if (res.code == 0) {
						if(res.data.rows.length>0){
							res.data.rows.map(item=>{
								item.checked=false;
							})
						}
						if(this.pageNum==1){
							this.list=res.data.rows;
						}else{
							this.list.push(...res.data.rows);
						}
						this.total=res.data.total;
					} else {
						this.$toast(res.msg);
					}
				});
				// 兑换礼物分成
				this.post(this.apis.paramInfo).then(res => {
					if (res.code == 0) {
						this.giftCommission=((100-res.data.giftCommission)/100-0);
					}
				})
			},
			togglaActive(data) {
				this.actived = data;
				this.pageNum=1;
				this.getData();
			},
			confirm(){
				if(this.chooseTotal==0)return;
				this.noClick=true;
				let arr=[];
				this.list.map(item=>{
					if(item.checked){
						arr.push(item.id)
					}
				})
				this.post(this.apis.convertGift, {
					userId: uni.getStorageSync('cityUserid'),
					ugId:arr.join(','),
					totalMonery:this.chooseTotalPrice,
				}).then(res => {
					if (res.code == 0) {
						this.$toast('兑换成功');
						this.pageNum=1;
						this.getData();
					} else {
						this.$toast(res.msg);
					}
				});
			},
			longpress(id,index){
				if(this.actived==1)return;
				let that=this;
				uni.showModal({
				    title: '提示',
				    content: '是否要删除该礼物？',
					cancelColor:'#999999',
					confirmColor:'#FF4364',
				    success: function (res) {
				        if (res.confirm) {
				            that.post(that.apis.delGift, {
				            	ugId:id,
				            }).then(res => {
								that.$toast(res.msg);
				            	if (res.code == 0) {
				            		that.list.splice(index,1);
				            	}
				            });
				        }
				    }
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.safeBottom{
		box-shadow: 0 0 13rpx 0 rgba(0, 0, 0, 0.1);
	}
	.total{
		padding:0 30rpx;
		.toggleIcon{
			image{
				margin-right: 11rpx;
			}
		}
		.allPrice{
			margin-left:20rpx;
			text{
				margin-left:20rpx;
			}
		}
		.confirm{
			width: 160rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin:0;
		}
		.confirmH{
			width: 160rpx;
			height: 80rpx;
		}
	}
	.list {
		padding:150rpx 0 0 30rpx;
		.choosed{
			border: 2rpx solid #FF4364!important;
		}
		>view{
			flex-direction: column;
			width: 335rpx;
			padding:33rpx 0;
			background: #FFFFFF;
			box-shadow: 0px 5rpx 43rpx 0px rgba(196, 196, 196, 0.22);
			border-radius: 24rpx;
			position: relative;
			margin:0 20rpx 20rpx 0;
			.right-top{
				width:60rpx;
				height: 60rpx;
				position: absolute;
				top:0;
				right:0;
			}
			.gift{
				width:150rpx;
				height: 127rpx;
				margin:0 0 7rpx;
			}
			.price{
				margin:14rpx 0 30rpx;
			}
			.fromUser{
				margin:0 0 20rpx;
				>image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					margin-right:25rpx;
				}
				>text{
					width: 200rpx;
					display: block;
				}
			}
		}
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

	.fixedTop {
		position: fixed;
		top: var(--window-top);
		z-index: 10;
		width: 100%;
		background: #FFFFFF;
	}
</style>
