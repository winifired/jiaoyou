<template>
	<view class="jigsaw">
		<view class="tip">拖动下方滑块完成拼图</view>
		<view class="">
			<movable-area class="movable-area">
				<image src="../../static/image/1.jpg" mode="" class="jigsaw1"></image>
				<movable-view :x="x" direction="horizontal" class="jigsaw2" :damping="1000" disabled
					:style="{top:top+'px'}" :friction="1000">
					<view class="showMove">
						<image src="../../static/image/1.jpg" mode="" :style="{top:moveimgY+'px',left:moveimgX+'px'}"
							class="moveImg"></image>
					</view>
				</movable-view>
				<view class="shadow" :style="{top:top+'px',left:left+'px'}">
				</view>
			</movable-area>
		</view>
		<view class="" @touchend="onEnd">
			<movable-area class="moveView">
				<view class="line"></view>
				<movable-view :x="movex" y="0" direction="horizontal" @change="onChange" class="jigsaw3"
					:friction="1000">
					<image src="../../static/image/jigsaw3.png" mode="" class="jigsaw3"></image>
				</movable-view>
			</movable-area>
		</view>
		<view class="flex column-end row-center">
			<image src="../../static/image/jigsaw5.png" mode="" @click="close" class="icon38"
				style="margin-right: 26rpx;"></image>
			<image src="../../static/image/jigsaw4.png" mode="" @click="refuse" class="icon38"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "jigsaw",
		data() {
			return {
				movex: 0,
				x: 0,
				pxToRpxScale: 0,
				imgWith: 0, //px
				imgHeight: 0, //px
				left: 0,
				top: 0,
				moveimgX: 0,
				moveimgY: 0,
			};
		},
		mounted() {
			this.calculate();
		},
		methods: {
			calculate() {
				let systemInfo = wx.getSystemInfoSync();
				// px转换到rpx的比例
				this.pxToRpxScale = 750 / systemInfo.windowWidth;
				this.imgWith = parseInt(550 / this.pxToRpxScale); //图片宽高
				this.imgHeight = parseInt(320 / this.pxToRpxScale);
				let that = this;
				let minX = that.imgWith * 0.5,
					maxX = that.imgWith - 55 - 10;
				let minY = that.imgHeight * 0.3,
					maxY = that.imgHeight - 55;
				that.left = that.randomNumBoth(minX, maxX);
				that.top = that.randomNumBoth(minY, maxY);
				//计算补图块Y轴的位移
				that.moveimgY = -(that.top);
				that.moveimgX = -(that.left);
				this.movex = this.x = 0;
			},
			onChange(e) {
				this.movex = this.x = e.detail.x;
			},
			onEnd() {
				if (Math.abs(this.left - this.x) <= 6) {
					uni.showToast({
						title: '验证成功',
						icon: 'none'
					});
					this.$emit('closep');
					this.$emit('jigsawStatus');
				} else {
					setTimeout(() => {
						this.movex = this.x = 0;
					}, 300);
					uni.showToast({
						title: '验证失败',
						icon: 'none'
					})
				}
			},
			randomNumBoth(Min, Max) {
				var Range = Max - Min;
				var Rand = Math.random();
				var num = Min + Math.round(Rand * Range); //四舍五入
				return num;
			},
			close() {
				this.$emit('closep')
			},
			refuse() {
				this.calculate();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.showMove {
		width: 55px;
		height: 55px;
		overflow: hidden;
		// clip-path: url(#svgPath1);

		.moveImg {
			max-width: none;
			position: absolute;
			width: 550rpx;
			height: 320rpx;
		}
	}

	.shadow {
		position: absolute;
		z-index: 9;
		background-color: rgba(0, 0, 0, .6);
		width: 55px;
		height: 55px;
		-webkit-clip-path: url(#svgPath1);
		clip-path: url(#svgPath1);
	}

	.jigsaw {
		width: 660rpx;
		height: 600rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 49rpx 55rpx 0;
		margin: 0 auto;
	}

	.tip {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #292929;
	}

	.moveView {
		width: 550rpx;
		height: 97rpx;

		.line {
			width: 550rpx;
			height: 22rpx;
			background: #E3E3E3;
			border-radius: 11rpx;
			position: relative;
			top: 50%;
			transform: translateY(-50%);
		}

		.jigsaw3 {
			width: 109rpx;
			height: 97rpx;
		}
	}

	.movable-area {
		width: 550rpx;
		height: 320rpx;
		margin: 40rpx 0 0;
		position: relative;

		.jigsaw1 {
			width: 550rpx;
			height: 320rpx;
		}

		.jigsaw2 {
			width: 55px;
			height: 55px;
			z-index: 40;
			overflow: hidden;
		}
	}
</style>
