<template>
	<view class="img">
		<view class="title font32 color818">个人主页封面照</view>
		<uploadImg @getImg="getImg1" :imagesUrl="fullurl1" :maxImg="1"></uploadImg>
		<view class="title font32 color818 margin">匹配页封面照</view>
		<uploadImg @getImg="getImg2" :imagesUrl="fullurl2" :maxImg="1"></uploadImg>
		<view class="title font32 color818 margin">我的相册</view>
		<uploadalbum :imagesUrl="fullurl3"></uploadalbum>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import uploadImg from "../../components/uploadImg/uploadImg.vue"
	import uploadalbum from '../../components/uploadalbum/uploadalbum.vue'
	export default {
		data() {
			return {
				fullurl3:[]
			};
		},
		computed: {
			...mapState({
				fullurl1:state=>state.userinfo.coverImg.split(','),
				fullurl2:state=>state.userinfo.matchImg.split(','),
				userinfo:state=>state.userinfo,
				userid:state=>state.userid,
			})
		},
		components:{uploadImg,uploadalbum},
		onLoad(){
			this.getData();
		},
		methods:{
			...mapMutations(['setuserinfo']),
			...mapActions(['getUserAlbum']),
			getData(){
				this.getUserAlbum(this.userid).then(res=>{
					this.fullurl3=res.rows;
				})
			},
			getImg1(data){
				if(data.length==0)return;
				this.uploadCoverImg({
					coverImg:data.join(',')
				},1)
			},
			getImg2(data){
				if(data.length==0)return;
				this.uploadCoverImg({
					matchImg:data.join(',')
				},2)
			},
			uploadCoverImg(data,type){
				data['id']=this.userid;
				this.post(this.apis.editUser,data).then(res=>{
					if(res.code==0){
						if(type==1){
							this.userinfo.coverImg=data.coverImg;
						}else{
							this.userinfo.matchImg=data.matchImg;
						}
						this.setuserinfo(this.userinfo)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.img{
	padding:44rpx 0 0 30rpx;
	.title{
		margin:0 0 24rpx;
		text{
			margin-left:32rpx;
		}
	}
	.margin{
		margin:70rpx 0 24rpx;
	}
}
</style>
