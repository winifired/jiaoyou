<template>
	<view class="contactList">
		<uni-swipe-action>
			<uni-swipe-action-item :right-options="options" @click="onClick($event, index)"
				v-for="(item,index) in array" :key="index">
				<view class="flex item" @click.stop="toDetail(item.id)" :class="isShow?'':'mask'">
					<image :src="item.headImg" mode="aspectFill"></image>
					<view class="right-msg">
						<view class="flex area-between">
							<text class="font32 color101">{{item.nickName}}</text>
							<text class="font24 color898">{{item.browTimeName}}</text>
						</view>
						<view class="flex area-between right-msg-content">
							<text
								class="font28 color999">{{item.age}}岁｜{{item.constellation}}｜{{item.residentCity}}</text>
						</view>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :title="title" :content="content" :leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
	</view>
</template>

<script>
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins: [judge],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F75855'
					}
				}],
				pageSize: 15,
				pageNum: 1,
				array: [],
				total: 0,
				isShow: false, //false模糊显示
			};
		},
		onLoad() {
			this.getData();
		},
		onReachBottom() {
			if (this.total > this.array.length) {
				this.pageNum++;
				this.getData();
			}
		},
		methods: {
			getData() {
				this.post(this.apis.lookBrow, {
					userId: uni.getStorageSync('cityUserid'),
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					if (res.code == 0) {
						this.array = res.data.rows;
						this.total = res.data.total;
						if(res.data.total>0){
							this.judge(10);
						}
					}
				});
			},
			successOperate() {
				// 允许功能性操作
				this.isShow = true;
			},
			onClick(e, index) {
				this.post(this.apis.delBrow, {
					userId: uni.getStorageSync('cityUserid'),
					tarUserId: this.array[index].id,
				}).then(res => {
					this.$toast(res.msg);
					if (res.code == 0) {
						this.array.splice(index, 1);
					}
				});
			},
			toDetail(id) {
				if (!this.isShow) return;
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
