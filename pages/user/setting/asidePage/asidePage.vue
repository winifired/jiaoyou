<template>
	<view class="asidePage">
		<view class="" v-html="info"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				info:''
			}
		},
		onLoad(options) {
			this.type=options.type;
			this.getData();
		},
		methods: {
			getData(){
				this.post(this.apis.protocolInfo,{
					protocolId:this.type,//协议信息 1用户协议 2隐私条款 3会员协议
				}).then(res => {
					if (res.code == 0) {
						uni.setNavigationBarTitle({
							title:res.data.protocolName
						})
						this.info=res.data.protocolContent
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.asidePage{
	padding:30rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 48rpx;
	/deep/ img{
		width:100%!important;
		display: block;
		height: auto;
	}
}
</style>
