<template>
	<view class="container">
		<view class="message-list" @tap="triggerClose">
			<TUI-message-list ref="messageList" id="message-list" :conversation="conversation"></TUI-message-list>
		</view>
		<view class="container-box" v-if="videoPlay" @tap.stop="stopVideoHander">
			<video class="video-message" v-if="videoPlay" :src="videoMessage.payload.videoUrl"
				:poster="videoMessage.payload.thumbUrl" object-fit="cover" error="videoError" autoplay="true"
				direction="0">
			</video>
		</view>
		<view class="message-input" v-if="showChat">
			<TUI-message-input ref="messageInput" id="message-input" :conversation="conversation"
				@sendMessage="sendMessage" @checkJudge="checkJudge"></TUI-message-input>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" rightText="付费购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
		<uni-popup ref="tipMsgBuy" type="bottom" :safe-area="false">
			<tipBuyItem :buyMonery="buyMonery" :costId="costId" :targetUserid="conversation&&conversation.userProfile?conversation.userProfile.userID:''" @successOperate="successOperateBuy"></tipBuyItem>
		</uni-popup>
	</view>
</template>

<script>
	import logger from '../../utils/logger';
	import TUIMessageList from "../../components/tui-chat/message-list/index";
	import TUIMessageInput from "../../components/tui-chat/message-input/index";
	import judge from "../../components/silder-like/judge.js"
	export default {
		mixins: [judge],
		data() {
			return {
				conversationName: '',
				conversation: {},
				messageList: [],
				isShow: false,
				showChat: true,
				conversationID: '',
				videoPlay: false,
				videoMessage: {},

				nowType: '', // costId ==6在线私聊
				// costId ==7语音聊天
				// costId ==8视频聊天
				sendMsg: null,
				content: '',
				leftText: '',
				rightText: '',
			};
		},

		components: {
			TUIMessageList,
			TUIMessageInput,
		},
		props: {},
		created() {
			uni.$on('videoPlayerHandler', (value) => {
				this.videoPlay = value.isPlay
				this.videoMessage = value.message
			})
		},
		onUnload() {
			uni.$TUIKit.setMessageRead({
				conversationID: this.conversationID
			}).then(() => {});
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			// conversationID: C2C、 GROUP
			logger.log(` TUI-chat | onLoad | conversationID: ${options.conversationID}`);
			const {
				conversationID
			} = options;
			this.setData({
				conversationID
			});
			uni.$TUIKit.setMessageRead({
				conversationID
			}).then(() => {
				logger.log('TUI-chat | setMessageRead  | ok');
			});
			uni.$TUIKit.getConversationProfile(conversationID).then(res => {
				const {
					conversation
				} = res.data;
				console.log(conversation)
				this.conversation = conversation
				this.setData({
					conversationName: this.getConversationName(conversation),
					isShow: conversation.type === 'GROUP'
				});
				uni.setNavigationBarTitle({
					title: this.conversationName
				})
			});
		},

		methods: {
			stopVideoHander() {
				this.videoPlay = false
			},
			getConversationName(conversation) {
				if (conversation.type === '@TIM#SYSTEM') {
					this.setData({
						showChat: false
					});
					return '系统通知';
				}

				if (conversation.type === 'C2C') {
					return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
				}

				if (conversation.type === 'GROUP') {
					return conversation.groupProfile.name || conversation.groupProfile.groupID;
				}
			},
			checkJudge(data) {
				this.judge(data);
			},
			sendMessage(event, nowType = '') {
				// costId ==6在线私聊
				// costId ==7语音聊天
				// costId ==8视频聊天
				this.sendMsg = event;
				console.log(event)
				if (nowType) {
					this.judge(1);
				} else {
					this.successOperate();
				}
			},
			successOperate() {
				uni.$TUIKit.sendMessage(this.sendMsg.detail.message);
				// 将自己发送的消息写进消息列表里面
				this.$refs.messageList.updateMessageList(this.sendMsg.detail.message);
			},
			successOperate2(timeRemaining) {
				let that = this;
				this.timeRemaining = timeRemaining; //通话剩余时间
				const {
					userID
				} = this.conversation.userProfile;
				console.log(userID)
				uni.$TUICalling.call({
					userID: userID + '',
					type: this.costId == 7 ? 1 : 2
				}, (res) => {
					console.log('拨打成功。。。。。。。。。。。。。。。。。。。。。')
					console.log(res)
				});
			},
			successOperateBuy() {
				this.$refs.tipMsgBuy.close();
			},
			triggerClose() {
				if (this.showChat) {
					this.$refs.messageInput.handleClose();
				}
			},
		}
	};
</script>
<style>
	@import "./chat.css";
</style>
