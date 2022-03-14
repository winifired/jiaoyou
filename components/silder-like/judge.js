import {
	mapActions
} from "vuex";
export default {
	data() {
		return {
			isShowData:false,//不是会员  匹配显示模糊data
			costId: '',
			leftText: '',
			content: '',
			buyMonery: 0, //购买语音和视频1分钟所需要的金币数量
			codeMsg:0,//判断匹配显示
			targetUserId:'',//对方用户
			// costId ==1发起私聊
			// costId ==2匹配次数
			// costId ==5评论点赞
			// costId ==6在线私聊
			// costId ==7语音聊天
			// costId ==8视频聊天
			// costId ==9修改个人资料
			// costId ==10查看访客记录
			// costId ==11查看喜欢我的
			// costId ==12位置漫游（修改定位）
			// costId ==13撤回
			// costId ==14匹配中的联系TA
			// costId ==15发布动态/节目
			// costId ==16更改在线状态
			// costId ==17删除评价
		}
	},
	methods: {
		...mapActions(['getGoldPay', 'getHintgold']),
		clickLeft() {
			if (this.leftText != '取消') {
				// 跳转会员中心
				uni.navigateTo({
					url: '/pages/user/vipCenter'
				});
			}
			this.$refs.tipMsg.close();
		},
		async clickRight() {
			// 确认购买
			if (this.costId == 7 || this.costId == 8) {
				// 语音聊天视频聊天需要选择购买时间
				this.openElseModel();
			} else {
				// 确认购买
				let status = await this.getGoldPay({costId:this.costId,targetUserId:this.targetUserId});
				if (status.code == 0) {
					this.successOperate();
				}
				this.$toast(status.msg);
			}
			this.$refs.tipMsg.close();
		},
		async judge(type,targetUserId='') {
			this.costId = type;
			this.targetUserId=targetUserId;
			console.log(targetUserId);
			let status = await this.getHintgold({costId:this.costId,targetUserId:targetUserId});
			console.log(status)
			this.codeMsg=status.code;
			this.buyMonery = status.monery;
			if (status.code == 0) {
				if (this.costId == 7 || this.costId == 8|| this.costId == 2) {
					this.successOperate2(status.num?status.num:'');
				} else {
					this.successOperate();
				}
			} else if (status.code == 300) {
				this.leftText = '取消';
				if (this.costId == 7) {
					this.buyMonery = status.monery;
					this.$refs.tipMsgBuy.open();
				} else if (this.costId == 8) {
					this.buyMonery = status.monery;
					this.$refs.tipMsgBuy.open();
				}  else if (this.costId == 2) {
					this.buyMonery = status.monery;
					this.$refs.tipMsgBuy.open();
				} else {
					this.content = '您的次数已用尽，请支付' + status.monery + '金币获得本次操作权限。';
					this.$refs.tipMsg.open();
				}
			} else if (status.code == 500) {
				if(!status.monery){
					this.$toast(status.msg);
					return;
				}
				this.leftText = '开通会员';
				if (this.costId == 7) {
					this.buyMonery = status.monery;
					this.$refs.tipMsgBuy.open();
				} else if (this.costId == 8) {
					this.buyMonery = status.monery;
					this.$refs.tipMsgBuy.open();
				}  else if (this.costId == 2) {
					this.isShowData=true;
					this.buyMonery = status.monery;
					this.$refs.tipMsgBuy.open();
				} else {
					this.content = '您还不是会员，成为会员才能进行该操作，或者支付' + status.monery + '金币获得本次操作权限。';
					this.$refs.tipMsg.open();
				}
			}
		},
		// successOperate
	}
}
