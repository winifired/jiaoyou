<template>
	<view class="tab-else">
		<navigator hover-class="none" url="/pages/user/setting/account-phone" class="flex area-between colorb1b font32">
			<text>更改绑定手机</text>
			<view class="flex row-center color666" v-if="userinfo&&userinfo.userName">
				{{userinfo.userName.slice(0,3)}}****{{userinfo.userName.slice(7,11)}}<image src="../../../static/image/right-gray.png" mode="" class="right"></image>
			</view>
		</navigator>
		<navigator hover-class="none" url="/pages/user/setting/logout" class="flex area-between colorb1b font32">
			<text>注销账户</text>
			<image src="../../../static/image/right-gray.png" mode="" class="right"></image>
		</navigator>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		data() {
			return {

			};
		},
		computed:{
			...mapState(['userinfo'])
		},
	}
</script>

<style lang="scss" scoped>
	.tab-else {
		.right {
			width: 16rpx;
			height: 30rpx;
			margin-left:13rpx;
		}

		>.flex {
			padding: 0 30rpx;
			height: 109rpx;
			text{
				font-weight: 500;
			}
		}

		>.flex:not(:last-child) {
			border-bottom: 1px solid #F8F8F8;
		}
	}
</style>
