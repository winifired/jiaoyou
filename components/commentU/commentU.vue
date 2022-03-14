<template>
	<view class="commentU safeBottom">
		<view class="evaing flex area-between">
			<textarea auto-height placeholder="评论" v-model="comment" />
			<image src="../../static/image/smile-black.png" mode="" class="smile-black"
				@click.stop="showIcon=!showIcon"></image>
			<view class="send font30 colorfff" @click.stop="toSend" :class="isClick?'noClick':''">发送</view>
		</view>
		<view class="swper_emoji flex" v-if="showIcon">
			<TUI-Emoji @enterEmoji="appendMessage"></TUI-Emoji>
		</view>
	</view>
</template>

<script>
	import TUIEmoji from "../tui-chat/message-elements/emoji/index.vue";
	import {
		emoji
	} from "../../utils/emoji.js";
	export default {
		name: "commentU",
		props: {
			chooseItemid: { //动态id
				type: [Number, String],
				default: ''
			},
			parentId: { //父级评论id 一级传0
				type: [Number, String],
				default: ''
			},
			pasUserId: { //被评论用户id
				type: [Number, String],
				default: ''
			},
		},
		components:{TUIEmoji},
		data() {
			return {
				showIcon: false,
				emojiList: emoji.icon,
				comment:'',
				isClick:false
			};
		},
		methods: {
			appendMessage(e) {
				console.log(e)
				this.comment=this.comment + e.detail.message;
				this.showIcon=false;
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res&&res.context?res.context:''
				}).exec()
				// #endif
			},
			chooseEmoji(item) {
				// console.log(item);
				this.editorCtx.insertImage({
					src: `http://114.115.165.165:8093/faces/${item}`,
					extClass: 'imgIcon',
					width: '10%',
					height: '10%',
					success: function() {
						console.log('insert image success')
					}
				});
			},
			toSend() {
				let that = this;
				// that.showIcon = false;
				if(!this.comment){
					this.$toast('请输入内容');
					return;
				}
				this.isClick=true;
				//发送评论
				that.post(that.apis.addComment, {
					dynamicId: that.chooseItemid, //动态id
					parentId: that.parentId, //父级评论id 一级传0
					comment: this.comment, //内容
					userId: uni.getStorageSync('cityUserid'), //用户id
					pasUserId: that.pasUserId, //被评论用户id
				}).then(res => {
					if (res.code == 0) {
						this.comment='';
						that.$emit('successEva');
					}else{
						that.$toast(res.msg);
					}
					this.isClick=false;
				});
				// this.editorCtx.getContents({
				// 	success(res) {
				// 		if (res.html == '<p><br></p>') {
				// 			return;
				// 		}
				// 		//发送评论
				// 		that.post(that.apis.addComment, {
				// 			dynamicId: that.chooseItemid, //动态id
				// 			parentId: that.parentId, //父级评论id 一级传0
				// 			comment: res.html, //内容
				// 			userId: uni.getStorageSync('cityUserid'), //用户id
				// 			pasUserId: that.pasUserId, //被评论用户id
				// 		}).then(res => {
				// 			if (res.code == 0) {
				// 				that.$emit('successEva');
				// 			}else{
				// 				that.$toast(res.msg);
				// 			}
				// 		});
				// 	}
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/dynamic.scss";
</style>
