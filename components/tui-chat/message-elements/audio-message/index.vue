<template>
	<view :class="'audio-message ' + (isMine ? 'my-audio' : '')" class="flex row-center"
		@click="handlePlayAudioMessage">
		<image class="audio-icon"
			:src="!playStatus?require('../../../../static/images/audio-msg.png'):require('../../../../static/images/audio-play.png')">
		</image>
		<view class="audio" :style="'width: ' + 120 + 'rpx'">{{ '" ' + message.payload.second }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				audio: {},
				playStatus: false
			};
		},

		components: {},
		props: {
			message: {
				type: Object,
				default: () => {}
			},
			isMine: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			message: {
				handler: function(newVal) {
					this.setData({
						message: newVal
					});
				},
				immediate: true,
				deep: true
			}
		},

		beforeMount() {
			this.audio = uni.createInnerAudioContext();
			this.audio.onPlay(() => {
				this.playStatus = true
				console.log('开始播放');
			});
			this.audio.onEnded(() => {
				this.playStatus = false;
				console.log('停止播放');
			});
			this.audio.onError(e => {
				this.playStatus = false;
				console.error(e, 'onError');
				// ios 音频播放无声，可能是因为系统开启了静音模式
				uni.showToast({
					icon: 'none',
					title: '该音频暂不支持播放'
				});
			});
		},
		beforeDestroy() {
			this.playStatus = false;
			this.audio.stop();
		},
		methods: {
			handlePlayAudioMessage() {
				this.audio.src = this.message.payload.url;
				console.error(this.message.payload.second, 'handlePlayAudioMessage');
				this.audio.play();
			}
		}
	};
</script>
<style>
	@import './index.css';
</style>
