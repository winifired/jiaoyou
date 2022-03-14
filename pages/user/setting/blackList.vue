<template>
	<view class="contactList">
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="options" @click="bindClick($event, index)"
				v-for="(item,index) in array" :key="index">
				<view class="flex item" @click.stop="toDetail(item.id)">
					<image :src="item.headImg" mode=""></image>
					<view class="right-msg">
						<view class="flex area-between">
							<text class="font32 color101">{{item.nickName}}</text>
						</view>
						<view class="flex area-between right-msg-content">
							<text
								class="font28 color999">{{item.age}}岁｜{{item.constellation}}｜{{item.residentCity}}</text>
						</view>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
					text: '解除',
					style: {
						backgroundColor: '#F75855'
					}
				}],
				array: [],
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			bindClick(e, index) {
				let data={
					userId: uni.getStorageSync('cityUserid'),
					tarUserId:this.array[index].id,
					flag:1
				};
				this.post(this.apis.defriend,data).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						this.array.splice(index,1);
					}
				});
			},
			getData() {
				this.post(this.apis.addresslist, {
					userId: uni.getStorageSync('cityUserid'),
					flag: 3,//1我喜欢的 2我的好友3黑名单
				}).then(res => {
					if (res.code == 0) {
						this.array = res.data.rows;
					}
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/list.scss";
</style>
