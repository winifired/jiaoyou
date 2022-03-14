<template>
	<view class="writeMsg">
		<form @submit="formSubmit">
			<view class="flex area-between item" @click="chooseAvatar">
				<view class="name color818 font32">头像</view>
				<image :src="form.headImg" mode="" class="avatar" v-show="form.headImg"></image>
				<image src="../../static/image/avatar.png" mode="" class="avatar" v-show="!form.headImg"></image>
			</view>
			<view class="flex area-between item">
				<view class="name color818 font32">昵称</view>
				<input type="text" placeholder="昵称" class="font32 color666" v-model="form.nickName" />
			</view>
			<view class="flex area-between item">
				<view class="name color818 font32">性别</view>
			</view>
			<view class="flex item">
				<view class="flex area-center sex font30 colora1a" :class="form.sex=='男'?'chooseSex':''">
					<image src="../../static/image/men-white.png" mode="" v-if="form.sex=='男'"></image>
					<image src="../../static/image/men.png" mode="" v-else></image>男
				</view>
				<view class="flex area-center sex font30 colora1a" :class="form.sex=='女'?'chooseSex':''">
					<image src="../../static/image/women-white.png" mode="" v-if="form.sex=='女'"></image>
					<image src="../../static/image/women.png" mode="" v-else></image>女
				</view>
			</view>
			<picker mode="date" @change="bindDateChange" :end="endDate" fields="day">
				<view class="flex area-between item">
					<view class="name color818 font32">出生年月</view>
					<view class="font32 color666 flex row-center">
						<input type="text" placeholder="请选择" v-model="form.birthday" disabled class="font32 color666" />
						<image src="../../static/image/right.png" mode="" class="right"></image>
					</view>
				</view>
			</picker>
			<view class="flex area-between item">
				<view class="name color818 font32">星座</view>
				<input type="text" placeholder="请先选择出生年月" disabled class="font32 color666"
					v-model="form.constellation" />
			</view>
			<view class="flex area-between item" @click="openCity">
				<view class="name color818 font32">常驻城市</view>
				<view class="font32 color666 flex row-center">
					<input type="text" placeholder="请选择" disabled class="font32 color666" v-model="form.residentCity" />
					<image src="../../static/image/right.png" mode="" class="right"></image>
				</view>
			</view>
			<picker mode="selector" @change="bindOccupationChange" :range="useroccupation" range-key="labelName">
				<view class="flex area-between item">
					<view class="name color818 font32">职业</view>
					<view class="font32 color666 flex row-center">
						<input type="text" placeholder="请选择" disabled class="font32 color666"
							v-model="form.occupation" />
						<image src="../../static/image/right.png" mode="" class="right"></image>
					</view>
				</view>
			</picker>
			<view class="flex area-between item">
				<view class="name color818 font32">兴趣爱好</view>
			</view>
			<view class="flex item tags">
				<view class="tag color818 font28" v-for="(item,index) in userhobby" :key="item.id"
					:class="item.checked?'choosedLabel':''" @click="toggleLabel(index,userhobby)">{{item.labelName}}
				</view>
			</view>
			<view class="flex area-between item">
				<view class="name color818 font32">性格特点</view>
			</view>
			<view class="flex item tags">
				<view class="tag color818 font28" v-for="(item,index) in userdisposition" :key="item.id"
					:class="item.checked?'choosedLabel':''" @click="toggleLabel(index,userdisposition)">
					{{item.labelName}}
				</view>
			</view>
			<picker mode="selector" @change="bindStatureChange" :range="statures">
				<view class="flex area-between item">
					<view class="name color818 font32">身高(cm)</view>
					<view class="font32 color666 flex row-center">
						<input type="text" placeholder="请选择" disabled class="font32 color666" v-model="form.height" />
						<image src="../../static/image/right.png" mode="" class="right"></image>
					</view>
				</view>
			</picker>
			<picker mode="selector" @change="bindWeightChange" :range="weights">
				<view class="flex area-between item">
					<view class="name color818 font32">体重(kg)</view>
					<view class="font32 color666 flex row-center">
						<input type="text" placeholder="请选择" disabled class="font32 color666" v-model="form.weight" />
						<image src="../../static/image/right.png" mode="" class="right"></image>
					</view>
				</view>
			</picker>
			<view class="flex area-between item" @click="open">
				<view class="name color818 font32">交友需求</view>
				<view class="font32 color666 flex row-center">
					<input type="text" placeholder="请选择" disabled class="font32 color666" v-model="form.purpose" />
					<image src="../../static/image/right.png" mode="" class="right"></image>
				</view>
			</view>
			<view class="flex area-between item">
				<view class="name color818 font32">期望对象</view>
			</view>
			<view class="flex item tags">
				<view class="tag color818 font28" v-for="(item,index) in objecthobby" :key="item.id"
					:class="item.checked?'choosedLabel':''" @click="toggleLabel(index,objecthobby)">{{item.labelName}}
				</view>
				<view class="tag color818 font28" v-for="(item,l_index) in objectdisposition" :key="item.id"
					:class="item.checked?'choosedLabel':''" @click="toggleLabel(l_index,objectdisposition)">
					{{item.labelName}}
				</view>
			</view>
			<button form-type="submit" class="confirm next" :disabled="isClick">立即提交</button>
		</form>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="model">
				<view class="title font34 color101">请选择交友目的</view>
				<scroll-view scroll-y="true" class="scrollView">
					<view v-for="(item,index) in userpurpose" :key="item.id" class="flex area-center scrollViewItem"
						@click="toggleLabel(index,userpurpose)">{{item.labelName}}
						<image src="../../static/image/yes.png" mode="" class="yes" v-if="item.checked"></image>
					</view>
				</scroll-view>
				<view class="confirm save" @click.stop="confirmuserpurpose">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import store from "../../store/index.js";
	import {
		constellation,
		chooseImg
	} from "../../utils/check.js";
	import {
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				statures: [],
				weights: [],
				endDate: '',
				form: {
					id: store.state.userid,
					headImg: '', //头像
					nickName: '', //昵称
					sex: '', //性别
					birthday: '', //出生年月
					constellation: '', //星座
					residentCity: '', //常驻城市
					occupation: '', //职业
					hobby: '', //兴趣爱好
					disposition: '', //性格特点
					height: '', //身高
					weight: '', //体重
					purpose: '', //交友目的多个逗号分隔
					targetHobby: '', //期望对象日常爱好
					targetCharacter: '', //期望对象性格特点
					coverImg: '', //个人封面照
					matchImg: '', //匹配页封面照
				},
				userhobby: [], //用户的爱好
				userdisposition: [], //用户的性格特点
				userpurpose: [], //用户的交友目的
				useroccupation: [], //用户的职业
				objecthobby: [], //对象的爱好
				objectdisposition: [], //对象的性格特点
				isClick: false
			};
		},
		watch: {
			userhobby: {
				handler(newData) {
					let arr = [];
					newData.map(item => {
						if (item.checked) arr.push(item.labelName)
					})
					this.form.hobby = arr.join(',');
				},
				deep: true
			},
			userdisposition: {
				handler(newData) {
					let arr = [];
					newData.map(item => {
						if (item.checked) arr.push(item.labelName)
					})
					this.form.disposition = arr.join(',');
				},
				deep: true
			},
			objecthobby: {
				handler(newData) {
					let arr = [];
					newData.map(item => {
						if (item.checked) arr.push(item.labelName)
					})
					this.form.targetHobby = arr.join(',');
				},
				deep: true
			},
			objectdisposition: {
				handler(newData) {
					let arr = [];
					newData.map(item => {
						if (item.checked) arr.push(item.labelName)
					})
					this.form.targetCharacter = arr.join(',');
				},
				deep: true
			}
		},
		onLoad() {
			let userinfo = this.$store.state.userinfo;
			console.log(userinfo);
			for (let i in this.form) {
				this.form[i] = userinfo[i];
			}
			console.log(this.form)
			for (let i = 145; i <= 210; i++) {
				this.statures.push(i)
			}
			for (let i = 30; i <= 120; i++) {
				this.weights.push(i)
			}
			this.endDate = this.getDate('end');
			this.getLable();
		},
		methods: {
			...mapMutations(['setuserinfo']),
			...mapActions(['getLabelList']),
			getLable() {
				//1、日常爱好2、性格3、交友目的4、职业5、评价
				this.getLabelList(1).then(res => {
					if (this.form.hobby) {
						let hobby = this.form.hobby.split(',');
						res.map(item => {
							hobby.forEach(tag => {
								if (item.labelName == tag) {
									item.checked = true;
								}
							})
						})
					}
					this.userhobby = res;
				});
				this.getLabelList(1).then(res => {
					if (this.form.targetHobby) {
						let targetHobby = this.form.targetHobby.split(',');
						res.map(item => {
							targetHobby.forEach(tag => {
								if (item.labelName == tag) {
									item.checked = true;
								}
							})
						})
					}
					this.objecthobby = res;
				});
				this.getLabelList(2).then(res => {
					if (this.form.targetCharacter) {
						let targetCharacter = this.form.targetCharacter.split(',');
						res.map(item => {
							targetCharacter.forEach(tag => {
								if (item.labelName == tag) {
									item.checked = true;
								}
							})
						})
					}
					this.objectdisposition = res;
				});
				this.getLabelList(2).then(res => {
					if (this.form.disposition) {
						let disposition = this.form.disposition.split(',');
						res.map(item => {
							disposition.forEach(tag => {
								if (item.labelName == tag) {
									item.checked = true;
								}
							})
						})
					}
					this.userdisposition = res;
				});
				this.getLabelList(3).then(res => {
					if (this.form.purpose) {
						let purpose = this.form.purpose.split(',');
						res.map(item => {
							purpose.forEach(tag => {
								if (item.labelName == tag) {
									item.checked = true;
								}
							})
						})
					}
					this.userpurpose = res;
				});
				this.getLabelList(4).then(res => {
					if (this.form.occupation) {
						let occupation = this.form.occupation.split(',');
						res.map(item => {
							occupation.forEach(tag => {
								if (item.labelName == tag) {
									item.checked = true;
								}
							})
						})
					}
					this.useroccupation = res;
				});
			},
			toggleLabel(index, arr) {
				arr[index].checked = !arr[index].checked;
			},
			chooseAvatar() {
				chooseImg().then(res => {
					console.log(res)
					this.form.headImg = res;
				});
			},
			open() {
				this.$refs.popup.open();
			},
			openCity() {
				uni.navigateTo({
					url: '/pages/login/city?residentCity=' + this.form.residentCity
				})
			},
			formSubmit() {
				console.log(this.form)
				this.isClick = true;
				this.post(this.apis.editUser, this.form).then(res => {
					if (res.code == 0) {
						this.$toast('资料上传成功');
						this.setuserinfo(res.data);
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}, 1000)
					} else {
						this.isClick = false;
					}
				})
			},
			bindDateChange(e) {
				// 生日
				this.form.birthday = e.detail.value;
				let month = e.detail.value.split('-')[1],
					day = e.detail.value.split('-')[2];
				this.form.constellation = constellation(month, day);
			},
			bindOccupationChange(e) {
				// 职业
				this.form.occupation = this.useroccupation[e.detail.value].labelName
			},
			bindStatureChange(e) {
				this.form.height = this.statures[e.detail.value];
				console.log(e)
			},
			bindWeightChange(e) {
				console.log(e)
				this.form.weight = this.weights[e.detail.value];
			},
			confirmuserpurpose() {
				// 交友需求
				let arr = [];
				this.userpurpose.map(item => {
					if (item.checked) {
						arr.push(item.labelName);
					}
				});
				if (arr.length == 0) {
					this.$toast('请选择交友目的');
					return;
				}
				this.$refs.popup.close();
				this.form.purpose = arr.join(',');
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/userMsg.scss";

	.chooseSex {
		background: #FF4364 !important;
		color: #ffffff !important;
	}

	.city {
		.title {
			padding: 20rpx 0;
			text-align: center;
		}
	}

	.choosedLabel {
		border: 1px solid #FF4364 !important;
		background: none !important;
		color: #FF4364 !important;
	}
</style>
