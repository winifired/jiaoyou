<template>
	<view class="filtrate safeBottom250">
		<view class="name font32 color818 item">性别</view>
		<view class="sex flex item">
			<!-- <view class="font30 flex area-center" :class="choosed==1?'choosed colorfff':'colora1a'" @click="choosed=1">
				不限</view> -->
			<view class="font30 flex area-center" :class="choosed==2?'choosed colorfff':'colora1a'" @click="choosed=2">
				<image :src="'../../static/image/'+(choosed==2?'men-white':'men')+'.png'" mode="" class="mr-10"></image>
				男
			</view>
			<view class="font30 flex area-center" :class="choosed==3?'choosed colorfff':'colora1a'" @click="choosed=3">
				<image :src="'../../static/image/'+(choosed==3?'women-white':'women')+'.png'" mode="" class="mr-10">
				</image>女
			</view>
		</view>
		<view class="name font32 color818 flex area-between item">
			<text>年龄</text>
			<text>{{sliderValue[0]}}-{{sliderValue[1]}}</text>
		</view>
		<view class="slider-line item">
			<SliderRange :value="sliderValue" :min="17" :max="50" :step="1" :bar-height="5" background-color="#F4F4F4"
				active-color="#F4F4F4" :format="format" :decorationVisible="true" :tipVisible="false"
				@change="handleRangeChange"></SliderRange>
		</view>
		<view class="name flex area-between item" @click="judge(12)">
			<view class="font32 color818">位置漫游</view>
			<view class="flex row-center font32 color666">
				<image src="../../static/image/place-pink.png" mode="" class="place-pink"></image>
				<view class="" style="max-width:400rpx;">{{residentCity}}</view>
				<image src="../../static/image/right.png" mode="" class="right"></image>
			</view>
		</view>
		<view class="name flex area-between item">
			<view class="font32 color818">查看在线用户</view>
			<view class="flex row-center font32 color666">
				<switch color="#FF4364" :checked="onlineStatus" @change="changeOnlineStatus" />
			</view>
		</view>
		<view class="name font32 color818 item" v-if="issue">兴趣爱好</view>
		<view class="flex item tags" v-if="issue">
			<view class="tag color818 font28" v-for="(item,index) in userhobby"
				:class="item.checked?'choosed colorfff':''" :key="index" @click="toggleLabel(index,userhobby)">
				{{item.labelName}}
			</view>
		</view>
		<view class="name font32 color818 item" v-if="issue">性格特点</view>
		<view class="flex item tags" v-if="issue">
			<view class="tag color818 font28" v-for="(item,index) in userdisposition" :key="index"
				:class="item.checked?'choosed colorfff':''" @click="toggleLabel(index,userdisposition)">
				{{item.labelName}}
			</view>
		</view>
		<picker mode="multiSelector" @change="bindStatureChange" :range="statures" class="item" v-if="issue"
			@columnchange="columnStatureChange" :value="staturesIndex">
			<view class="name flex area-between">
				<view class="font32 color818" style="width:150rpx;">身高</view>
				<view class="font32 color666 flex row-center">
					<input type="text" placeholder="请选择" disabled class="font32 color666" v-model="staturesChoosed" />
					<image src="../../static/image/right.png" mode="" class="right"></image>
				</view>
			</view>
		</picker>
		<picker mode="multiSelector" @change="bindWeightChange" :range="weights" class="item" v-if="issue"
			@columnchange="columnWeightChange" :value="weightsIndex">
			<view class="name flex area-between">
				<view class="font32 color818" style="width:150rpx;">体重</view>
				<view class="font32 color666 flex row-center">
					<input type="text" placeholder="请选择" disabled class="font32 color666" v-model="weightsChoosed" />
					<image src="../../static/image/right.png" mode="" class="right"></image>
				</view>
			</view>
		</picker>
		<view class="fixedBottom safeBottom">
			<view class="confirm" @click="confirm">{{!issue?'完成':'开始匹配'}}</view>
		</view>
		<uni-popup ref="tipMsg" type="center" :safe-area="false">
			<tipModel :content="content" :leftText="leftText" rightText="确认购买" @clickLeft="clickLeft"
				@clickRight="clickRight"></tipModel>
		</uni-popup>
		<uni-popup ref="tipAddr" type="bottom" safe-area>
			<view class="cityPicker">
				<view class="flex area-between Oprah">
					<view class="font28 color898 ">
						取消
					</view>
					<view class="font28 color364" @click="chooseCity">
						确定
					</view>
				</view>
				<picker-view :value="chooseIndex" :indicator-style="`height: 50px;`" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item flex area-center" v-for="(item,index) in citys" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item flex area-center" v-for="(item,index) in citys[chooseIndex[0]].children" :key="index">
							{{item.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import SliderRange from '../../components/sliderrange/index.vue'
	import judge from "../../components/silder-like/judge.js";
	import {
		citys
	} from "../../utils/city-data.js"
	export default {
		mixins: [judge],
		data() {
			return {
				sliderValue: [22, 50],
				choosed: 1, //1不限 2男 3女
				staturesArray: [],
				weightsArray: [],
				staturesIndex: [0, 0],
				weightsIndex: [0, 0],
				statures: [
					[],
					[]
				],
				weights: [
					[],
					[]
				],
				staturesChoosed: '',
				weightsChoosed: '',
				issue: false,
				onlineStatus: false,
				latitude: '',
				longitude: '',
				leftText: '',
				content: '',
				costId: '',
				buyMoney: 0, //购买匹配次数的金币数量
				userhobby: [], //兴趣爱好
				userdisposition: [], //性格
				hobby: '',
				disposition: '',
				residentCity: '',
				num: 0,
				// 筛选省市
				chooseIndex: [0, 0],
				citys: citys
			};
		},
		components: {
			SliderRange
		},
		computed: {
			...mapState({
				userinfo: state => state.userinfo,
			})
		},
		onLoad(options) {
			console.log(options)
			this.residentCity = options.location ? options.location : '';
			this.num = options.num ? options.num : 0; //匹配页跳入传参  剩余匹配数
			this.choosed = options.sex == '男' ? 2 : 3;
			this.sliderValue = [options.minAge ? (options.minAge - 0) : 17, options.maxAge ? (options.maxAge - 0) : 50];
			this.onlineStatus = options.onlineFlag == 0 ? false : true;
			this.issue = options.issue ? true : false; //true 精准匹配
			if (options.issue) {
				uni.setNavigationBarTitle({
					title: '精准匹配'
				})
			}
			for (let i = 145; i <= 210; i++) {
				this.statures.push(i)
			}
			for (let i = 30; i <= 120; i++) {
				this.weights.push(i)
			}
			if (this.issue) {
				this.getLable();
				this.getIssueData();
			}
		},
		watch: {
			userhobby: {
				handler(newData) {
					let arr = [];
					newData.map(item => {
						if (item.checked) arr.push(item.labelName)
					})
					this.hobby = arr.join(',');
				},
				deep: true
			},
			userdisposition: {
				handler(newData) {
					let arr = [];
					newData.map(item => {
						if (item.checked) arr.push(item.labelName)
					})
					this.disposition = arr.join(',');
				},
				deep: true
			},
		},
		methods: {
			...mapMutations(['setLatitude', 'setLongitude']),
			...mapActions(['getLabelList', 'getGoldPay', 'getHintgold']),
			bindChange(e) {
				let index = e.detail.value;
				this.chooseIndex=index;
			},
			chooseCity(){
				let text=this.citys[this.chooseIndex[0]].children[this.chooseIndex[1]].label
				this.residentCity=text=='市辖区'?this.citys[this.chooseIndex[0]].label:text;
				this.$refs.tipAddr.close();
			},
			getLable() {
				//1、日常爱好2、性格3、交友目的4、职业5、评价
				this.getLabelList(1).then(res => {
					this.userhobby = res;
				});
				this.getLabelList(2).then(res => {
					this.userdisposition = res;
				});
			},
			toggleLabel(index, arr) {
				arr[index].checked = !arr[index].checked;
			},
			changeOnlineStatus(e) {
				this.onlineStatus = e.detail.value;
			},
			confirm() {
				this.changeData();
			},
			changeData() {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				console.log(prevPage)
				if (!this.issue) {
					if (this.choosed == 1) {
						prevPage.$vm.sex = ''
					} else {
						prevPage.$vm.sex = this.choosed == 2 ? '男' : '女';
					}
					prevPage.$vm.minAge = this.sliderValue[0];
					prevPage.$vm.maxAge = this.sliderValue[1];
					prevPage.$vm.address = this.residentCity; //位置
					prevPage.$vm.onlineFlag = !this.onlineStatus ? 0 : 1;
					// prevPage.$vm.pageIndex = 1;
					// prevPage.$vm.getuserList();
				} else {
					if (this.choosed == 1) {
						prevPage.$vm.form.sex = ''
					} else {
						prevPage.$vm.form.sex = this.choosed == 2 ? '男' : '女';
					}
					prevPage.$vm.form.minAge = this.sliderValue[0];
					prevPage.$vm.form.maxAge = this.sliderValue[1];
					prevPage.$vm.form.maxweight = this.weightsChoosed ? this.getNumber(this.weightsChoosed.split('~')[1]) :
						''; //最大体重
					prevPage.$vm.form.minweight = this.weightsChoosed ? this.getNumber(this.weightsChoosed.split('~')[0]) :
						''; //最小体重
					prevPage.$vm.form.maxheight = this.staturesChoosed ? this.getNumber(this.staturesChoosed.split('~')[
						1]) : '';
					prevPage.$vm.form.minheight = this.staturesChoosed ? this.getNumber(this.staturesChoosed.split('~')[
						0]) : '';
					prevPage.$vm.form.hobby = this.hobby;
					prevPage.$vm.form.disposition = this.disposition;
					prevPage.$vm.form.address = this.residentCity; //位置
					prevPage.$vm.form.onlineFlag = !this.onlineStatus ? 0 : 1;
					prevPage.$vm.getData(this.num);
				}
				uni.navigateBack();
			},
			getNumber(str) {
				if (!str) return;
				// 提取数字
				var numArr = str.match(/\d+/g);
				return numArr.join('');
			},
			successOperate() {
				let that = this;
				this.$refs.tipAddr.open();
			},
			goVip() {
				this.$refs.tipMsg.close();
				uni.navigateTo({
					url: '/pages/user/vipCenter'
				})
			},
			openTipNoVip(type) {
				this.$refs.tipMsg.open();
			},
			getIssueData() {
				for (let i = 145; i <= 210; i++) {
					this.staturesArray.push(i + 'cm');
				}
				for (let i = 30; i <= 120; i++) {
					this.weightsArray.push(i + 'kg');
				}
				this.statures = [this.staturesArray, this.staturesArray];
				this.weights = [this.weightsArray, this.weightsArray];
			},
			bindWeightChange(e) {
				this.weightsChoosed = this.weights[0][e.detail.value[0]] + '~' + this.weights[1][e.detail.value[1]];
			},
			columnWeightChange(e) {
				this.weightsIndex[e.detail.column] = e.detail.value;
				if (e.detail.column == 0) {
					let arr = [];
					for (let i = e.detail.value; i < this.weightsArray.length; i++) {
						arr.push(this.weightsArray[i]);
					}
					this.weightsIndex.splice(1, 1, 0);
					this.weights.splice(1, 1, arr);
				}
			},
			columnStatureChange(e) {
				this.staturesIndex[e.detail.column] = e.detail.value;
				if (e.detail.column == 0) {
					let arr = [];
					for (let i = e.detail.value; i < this.staturesArray.length; i++) {
						arr.push(this.staturesArray[i]);
					}
					this.staturesIndex.splice(1, 1, 0);
					this.statures.splice(1, 1, arr);
				}
			},
			bindStatureChange(e) {
				this.staturesChoosed = this.statures[0][e.detail.value[0]] + '~' + this.statures[1][e.detail.value[1]];
			},
			format(val) {
				return val
			},
			handleRangeChange(e) {
				this.sliderValue = e
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cityPicker{
		background-color: #FFFFFF;
	}
	.Oprah{
		height: 100rpx;
		padding:0 30rpx;
	}
	.picker-view {
		width: 750rpx;
		height: 400rpx;
	}

	.slider-line {
		padding: 0 50rpx !important;
	}

	.tags {
		margin-right: 0 !important;
		margin-top: 45rpx;

		>view {
			padding: 0 37rpx;
			height: 70rpx;
			line-height: 70rpx;
			background: #F4F4F4;
			border-radius: 35rpx;
			margin: 0 18rpx 20rpx 0;
		}
	}

	input {
		text-align: right;
	}

	.choosed {
		background: #FF4364 !important;
	}

	.confirm {
		width: 690rpx;
		height: 90rpx;
	}

	switch {
		transform: scale(.9);
	}

	.place-pink {
		width: 31rpx;
		height: 35rpx;
		margin-right: 15rpx;
	}

	.right {
		width: 16rpx;
		height: 30rpx;
		margin-left: 11rpx;
	}

	.filtrate {
		>.item:not(:last-child) {
			padding: 0 30rpx;
		}


		.name {
			margin: 50rpx 0 0;
			font-weight: 500;
			line-height: 42rpx;
		}

		.sex {
			margin: 45rpx 0 0;

			>view {
				width: 200rpx;
				height: 96rpx;
				background: #F4F4F4;
				border-radius: 48rpx;
				margin-right: 18rpx;

				>image {
					width: 21rpx;
					height: 27rpx;
				}
			}
		}
	}
</style>
