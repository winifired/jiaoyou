<template>
	<view class="asidePage">
		<view class="" v-html="info.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				info: null
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getData();
		},
		methods: {
			getData() {
				this.post(this.apis.questioninfo, {
					queId: this.id
				}).then(res => {
					if (res.code == 0) {
						uni.setNavigationBarTitle({
							title:res.data.title
						})
						this.info = res.data;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.asidePage {
		padding: 30rpx;
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
