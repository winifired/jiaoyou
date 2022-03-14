<template>
	<uni-swipe-action>
		<uni-swipe-action-item :right-options="options" @click="deleteConversation()">
			<view class="flex item">
				<image class="t-conversation-item-avatar" :src="setConversationAvatar" @error="handleImageError"
					mode="aspectFill" @click.stop="userDetail(conversation.userProfile.userID)">
				</image>
				<view class="right-msg">
					<view class="flex area-between">
						<text class="font32 color101">{{conversationName}}</text>
						<text class="font24 color898">{{timeago}}</text>
					</view>
					<view class="flex area-between right-msg-content">
						<view class="tui-conversation-lastMessage">
							<text>{{conversation.lastMessage.messageForShow}}</text>
						</view>
						<view class="count font24 colorfff" v-if="conversation.unreadCount>0">
							{{conversation.unreadCount>99?'99+':conversation.unreadCount}}
						</view>
					</view>
				</view>
			</view>
		</uni-swipe-action-item>
	</uni-swipe-action>
</template>

<script>
	import {
		caculateTimeago,
		formateTime
	} from '../../base/common';
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#F75855'
					}
				}],
				conversationName: '',
				conversationAvatar: '',
				setConversationAvatar: "",
				timeago: '',
			};
		},

		components: {},
		props: {
			conversation: {
				type: Object,
				default: () => {}
			}
		},
		watch: {
			conversation: {
				handler: function(conversation, oldconversation) {
					console.log(conversation)
					console.log(oldconversation)
					// 计算时间戳
					this.setData({
						conversationName: this.getConversationName(conversation),
						setConversationAvatar: this.setConversationAvatarHandler(conversation),
						timeago: caculateTimeago(conversation.lastMessage.lastTime * 1000)
					});
					this.$updateTimeago(conversation);
				},
				immediate: true,
				deep: true
			}
		},

		methods: {
			userDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?id='+id
				})
			},
			// 先查 remark；无 remark 查 (c2c)nick/(group)name；最后查 (c2c)userID/(group)groupID
			getConversationName(conversation) {
				if (conversation.type === '@TIM#SYSTEM') {
					return '系统通知';
				}

				if (conversation.type === 'C2C') {
					return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
				}

				if (conversation.type === 'GROUP') {
					return conversation.groupProfile.name || conversation.groupProfile.groupID;
				}
			},

			setConversationAvatarHandler(conversation) {
				if (conversation.type === '@TIM#SYSTEM') {
					return 'https://web.sdk.qcloud.com/component/TUIKit/assets/system.png';
				}

				if (conversation.type === 'C2C') {
					return conversation.userProfile.avatar ||
						'https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png';
				}

				if (conversation.type === 'GROUP') {
					return conversation.groupProfile.avatar || "/static/assets/gruopavatar.svg";
				}
			},
			deleteConversation() {
				uni.$TUIKit.deleteConversation(this.conversation.conversationID);
				this.setData({
					conversation: {},
					xScale: 0
				});
			},


			$updateTimeago(conversation) {
				console.log('conversation....................................................');
				console.log(conversation);
				if (conversation.conversationID) {
					if (conversation.lastMessage.type == 'TIMCustomElem') {
						let fromAccount = conversation.lastMessage.fromAccount,
							userid = uni.getStorageSync('cityUserid');
						if (conversation.lastMessage.payload.data.indexOf('room_id') != -1) {
							let data = JSON.parse(conversation.lastMessage.payload.data);
							let dataContent = JSON.parse(data.data);
							if (conversation.type === 'C2C') {
								const c2cText = this.extractCallingInfoFromMessage(conversation.lastMessage);
								conversation.lastMessage.messageForShow = c2cText;
								console.log(c2cText)
							}
						}
						if (conversation.lastMessage.payload.data === 'gift') {
							conversation.lastMessage.messageForShow = `${fromAccount!=userid?'收到':'送出'}${conversation.lastMessage.payload.extension}份礼物`
						}
					} else {
						// conversation.lastMessage.timeago = caculateTimeago(conversation.lastMessage.lastTime * 1000);
						conversation.lastMessage.messageForShow = conversation.lastMessage.messageForShow.slice(0, 15);
					}
				}
				this.setData({
					conversation
				});
			},

			handleImageError() {
				this.setData({
					setConversationAvatar: "/static/assets/gruopavatar.svg"
				});
			},
			// 解析音视频通话消息
			extractCallingInfoFromMessage(message) {
				const callingmessage = JSON.parse(message.payload.data);
				if (callingmessage.businessID !== 1) {
					return '';
				}
				const objectData = JSON.parse(callingmessage.data);
				switch (callingmessage.actionType) {
					case 1: {
						if (objectData.call_end >= 0 && !callingmessage.groupID) {
							return `通话时长：${formateTime(objectData.call_end)}`;
						}
						if (callingmessage.groupID) {
							return '结束群聊';
						}
						if (objectData.data && objectData.data.cmd === 'switchToAudio') {
							return '切换语音通话';
						}
						if (objectData.data && objectData.data.cmd === 'switchToVideo') {
							return '切换视频通话';
						}
						return '发起通话';
					}
					case 2:
						return '取消通话';
					case 3:
						if (objectData.data && objectData.data.cmd === 'switchToAudio') {
							return '切换语音通话';
						}
						if (objectData.data && objectData.data.cmd === 'switchToVideo') {
							return '切换视频通话';
						}
						return '已接听';
					case 4:
						return '拒绝通话';
					case 5:
						if (objectData.data && objectData.data.cmd === 'switchToAudio') {
							return '切换语音通话';
						}
						if (objectData.data && objectData.data.cmd === 'switchToVideo') {
							return '切换视频通话';
						}
						return '无应答';
					default:
						return '';
				}
			},
		}
	};
</script>
<style>
	@import "./index.css";
</style>
