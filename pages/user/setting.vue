<template>
	<view class="tab-else">
		<navigator hover-class="none" url="/pages/user/setting/account" class="flex area-between colorb1b font32">
			<text>账号安全</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</navigator>
		<navigator hover-class="none" url="/pages/user/setting/privacy" class="flex area-between colorb1b font32">
			<text>隐私设置</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</navigator>
		<navigator hover-class="none" url="/pages/user/setting/problemList" class="flex area-between colorb1b font32">
			<text>问题与反馈</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</navigator>
		<view class="flex area-between colorb1b font32" @click="showTip(1)">
			<text>清除缓存</text>
			<text class="color999">{{cacheSize}}</text>
		</view>
		<navigator url="/pages/user/setting/asidePage/asidePage?type=1" hover-class="none"
			class="flex area-between colorb1b font32">
			<text>用户协议</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</navigator>
		<navigator url="/pages/user/setting/asidePage/asidePage?type=2" hover-class="none"
			class="flex area-between colorb1b font32">
			<text>隐私协议</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</navigator>
		<navigator url="/pages/user/setting/asidePage/asidePage?type=3" hover-class="none"
			class="flex area-between colorb1b font32">
			<text>会员协议</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</navigator>
		<view class="flex area-between colorb1b font32">
			<text>当前版本</text>
			<text class="color999">v{{version}}</text>
		</view>
		<view class="flex area-between colorb1b font32" @click="showTip(2)">
			<text>退出登录</text>
			<image src="../../static/image/user-10-right.png" mode="" class="right"></image>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<view class="tipMsgCon">
				<view class="font38 tiptitle">提示</view>
				<view class="font30 contentMsg center">{{choosed==1?'确定要清除缓存吗？':'确定要退出登录吗？'}}</view>
				<view class="bottombrn flex">
					<view class="font30 color999" @click="close">取消</view>
					<view class="font30 color364" @click="clearCache">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {mapMutations} from "vuex";
	export default {
		data() {
			return {
				cacheSize: '0B',
				choosed: 1, //1清缓存 2退出登录
				version: ''
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.getcCache();
			// #endif
		},
		methods: {
			...mapMutations(['clearData']),
			getcCache() {
				var self = this;
				plus.cache.calculate(function(size) {
					console.log(size)
					//做下面相应的处理
					if (size < 1024) {
						self.cacheSize = size + 'B';
					} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
						self.cacheSize = Math.floor(size / 1024 * 100) / 100 + 'KB';
					} else if (size / 1024 / 1024 >= 1) {
						self.cacheSize = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M';
					}
				});
				plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
					console.log(wgtinfo);
					self.version = wgtinfo.version
				});
			},
			showTip(type) {
				this.choosed = type;
				if (type == 1 && this.cacheSize == '0B') return;
				this.$refs.tipMsg.open();
			},
			close() {
				this.$refs.tipMsg.close();
			},
			clearCache() {
				if (this.choosed == 2) {
					uni.clearStorageSync();
					this.clearData();
					uni.reLaunch({
						url: '/pages/login/login'
					});
					uni.$TUIKit.logout();
					uni.$TUICalling.logout();
				} else {
					// #ifdef APP-PLUS
					var self = this;
					//使用plus.cache.clear 清除应用中的缓存数据
					plus.cache.clear(function() {
						uni.showToast({
							title: '清除成功!',
							icon: 'none',
							success() {
								self.cacheSize = '0B'
							}
						})
					});
					this.$refs.tipMsg.close();
					// #endif
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab-else {
		.right {
			width: 13rpx;
			height: 22rpx;
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
