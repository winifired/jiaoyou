<template>
	<view>
		<view class="content">
			<textarea placeholder="请输入您要反馈的内容..." class="font32" v-model="text" />
			<uploadImg @getImg="getImg"></uploadImg>
		</view>
		<view class="confirm" @click="confirm">提交反馈</view>
	</view>
</template>

<script>
	import uploadImg from "../../../components/uploadImg/uploadImg.vue";
	export default {
		data() {
			return {
				photo: '',
				text:''
			};
		},
		methods: {
			getImg(data) {
				//获取图片
				this.photo = data.join(',');
			},
			confirm(){
				if(!this.text){
					this.$toast('请输入反馈意见');
					return;
				}
				this.post(this.apis.addfeedback,{
					userId:uni.getStorageSync('cityUserid'),
					content:this.text,
					annex:this.photo
				}).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						setTimeout(()=>{
							uni.navigateBack();
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding:0 30rpx;
		textarea{
			width: 100%;
			padding:30rpx 0;
		}
	}
	.confirm{
		width: 580rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin-top:100rpx;
	}
</style>
