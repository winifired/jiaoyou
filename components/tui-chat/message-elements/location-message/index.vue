<template>
	<view :class="'text-message ' + (isMine?'my-text':'')" @click="openLocation">
		<view class="location font30 color101 line1">{{message.payload.description}}</view>
		<image :src="`https://restapi.amap.com/v3/staticmap?location=${message.payload.longitude},${message.payload.latitude}&zoom=14&size=200*120&markers=mid,,A:${message.payload.longitude},${message.payload.latitude}&key=77e29f0b6ceb60a9fb6f6e55bc1a340e`" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				renderDom: [],
			};
		},

		components: {},
		props: {
			message: {
				type: Object,
			},
			isMine: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			message: {
				handler: function(newVal) {
					console.log('TUI-LocationMessage..............')
					console.log(newVal)
				},
				immediate: true,
				deep: true
			}
		},
		mounted() {},
		beforeMount() { // 在组件实例进入页面节点树时执行
		},

		destroyed() { // 在组件实例被从页面节点树移除时执行
		},

		methods: {
			openLocation() {
				uni.openLocation({
					name:this.message.payload.description,
					latitude: this.message.payload.latitude,
					longitude: this.message.payload.longitude,
					success: function() {
						console.log('success');
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.text-message {
		max-width: 60vw;
		line-height: 52rpx;
		padding: 12rpx 24rpx;
		background: #F8F8F8;
		border: 1px solid #D9D9D9;
		border-radius: 2px 10px 10px 10px;
	}

	.my-text {
		border-radius: 10px 2px 10px 10px;
		border: 1px solid rgba(0, 110, 255, 0.30);
		background: rgba(0, 110, 255, 0.10);
	}

	map {
		width: 100%;
		height: 200rpx;
	}

	.location {
		width: 100%;
	}

	image {
		width: 100%;
		height: 240rpx;
	}
</style>
