<template>
	<view class="tab-else">
		<navigator hover-class="none" url="/pages/user/setting/blackList" class="flex area-between colorb1b font32">
			<text>黑名单</text>
			<image src="../../../static/image/right-gray.png" mode="" class="right"></image>
		</navigator>
		<view class="flex area-between colorb1b font32">
			<text>屏蔽好友</text>
			<switch color="#FF4364" :checked="directoryFlag==0" @change="switchChange1" :disabled="disabled1" />
		</view>
		<view class="flex area-between colorb1b font32">
			<text>隐藏在线时间</text>
			<switch color="#FF4364" :checked="onlineFlag==0" @change="switchChange2" :disabled="disabled2" />
		</view>
		<view class="flex area-between colorb1b font32">
			<text>隐藏当前距离</text>
			<switch color="#FF4364" :checked="distanceFlag==0" @change="switchChange3" :disabled="disabled3" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				disabled1:false,
				disabled2:false,
				disabled3:false,
			};
		},
		computed: {
			...mapState({
				userid: state => state.userid,
				directoryFlag: state => state.userinfo.directoryFlag,
				onlineFlag: state => state.userinfo.onlineFlag,
				distanceFlag: state => state.userinfo.distanceFlag,
				userinfo: state => state.userinfo,
			})
		},
		onLoad() {
		},
		methods: {
			...mapMutations(['setuserinfo']),
			switchChange1(e){
				let data={}
				if(e.detail.value){
					data['directoryFlag']=0;
				}else{
					data['directoryFlag']=1;
				}
				this.changeFlag(data,1)
			},
			switchChange2(e){
				let data={}
				if(e.detail.value){
					data['onlineFlag']=0;
				}else{
					data['onlineFlag']=1;
				}
				this.changeFlag(data,2)
			},
			switchChange3(e){
				let data={}
				if(e.detail.value){
					data['distanceFlag']=0;
				}else{
					data['distanceFlag']=1;
				}
				this.changeFlag(data,3)
			},
			changeFlag(data,type){
				if(type==1){
					this.disabled1=true;
				}else if(type==2){
					this.disabled2=true;
				}else if(type==2){
					this.disabled3=true;
				}
				data['id']=this.userid;
				this.post(this.apis.privacySet,data).then(res => {
					if (res.code == 0) {
						if(type==1){
							this.userinfo.directoryFlag=data.directoryFlag;
						}else if(type==2){
							this.userinfo.onlineFlag=data.onlineFlag;
						}else if(type==2){
							this.userinfo.distanceFlag=data.distanceFlag;
						}
						this.setuserinfo(this.userinfo);
					}
					if(type==1){
						this.disabled1=false;
					}else if(type==2){
						this.disabled2=false;
					}else if(type==2){
						this.disabled3=false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-else {
		.right {
			width: 16rpx;
			height: 30rpx;
			margin-left: 13rpx;
		}

		switch {
			transform: scale(.9);
		}

		>.flex {
			padding: 0 30rpx;
			height: 109rpx;

			text {
				font-weight: 500;
			}
		}

		>.flex:not(:last-child) {
			border-bottom: 1px solid #F8F8F8;
		}
	}
</style>
