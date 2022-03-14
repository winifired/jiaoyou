<template>
	<view>
		<view class="tipMsgCon">
			<view class="font38 tiptitle">{{title}}</view>
			<view class="font30 contentMsg" :class="center?'center':''">{{content}}</view>
			<view class="bottombrn flex">
				<view class="font30" :style="{color:leftText=='取消'?'#999999':'#FF4364'}" @click="clickLeft">{{leftText}}</view>
				<view class="font30" :style="{color:'#FF4364'}" @click="clickRight">{{rightText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tipModel",
		props: {
			title: {
				type: String,
				default: '提示'
			},
			content: {
				type: String,
				default: ''
			},
			leftText: {
				type: String,
				default: ''
			},
			rightText: {
				type: String,
				default: ''
			},
			leftTextColor: {
				type: String,
				default: '#FF4364'
			},
			rightTextColor: {
				type: String,
				default: '#FF4364'
			},
			center: {
				//居中
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				time: 1,
			}
		},
		mounted() {
			console.log(this.content)
		},
		methods: {
			clickLeft() {
				this.$emit('clickLeft');
			},
			clickRight() {
				this.$emit('clickRight');
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
