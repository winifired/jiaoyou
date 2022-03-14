<template>
	<view class="index">
		<view class="top">
			<view class="status_bar"></view>
			<view class="place flex area-between">
				<view class="flex area-center tip colorfff font32" @click="toFilf()">
					<image src="../../static/image/filtrate-w.png" mode="" class="mr-10"></image>筛选
				</view>
				<view class="flex row-center colorfff font32 location">
					<image src="../../static/image/place-white.png" mode="" class="mr-10"></image>
					{{!address?location:address}}
				</view>
				<view style="width: 160rpx;"></view>
			</view>
			<view class="flex area-around nav">
				<view v-for="(item,index) in nav" :key="index" class="flex area-center" @click="toggle(item.id)">
					<image :src="'../../static/image/'+(choosed==item.id?item.iconA:item.icon)+'.png'" mode=""
						:class="choosed==item.id?'iconA':'icon'"></image>
					<view class="font26" :class="choosed==item.id?'colorfff':''">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="list">
			<scroll-view scroll-y="true">
				<navigator v-for="(item,index) in list" :key="item.id" class="flex list-item" hover-class="none"
					:url="'/pages/index/detail?id='+item.id">
					<image :src="item.coverThumbImg?item.coverThumbImg:item.coverImg" mode="aspectFill"
						class="cover-image" lazy-load></image>
					<view class="right-user flex column-bwn">
						<view class="right-user-top">
							<view class="right-user-name flex area-between">
								<view class="right-user-name-text flex row-center">
									<text class="font32 color727">{{item.nickName}}</text>
									<image src="../../static/image/VIP.png" mode="" class="vipIcon"
										v-if="item.memberFlag==1"></image>
									<image src="../../static/image/SVIP.png" mode="" class="vipIcon"
										v-if="item.memberFlag==2"></image>
									<view class="realPeople flex area-center font18 color364" v-if="item.realFlag==1">
										<image src="../../static/image/smile-pink.png" mode=""></image>真人
									</view>
									<view class="realPeople flex area-center font18 color364"
										v-if="item.sex=='女'&&item.idolFlag==1">
										<image src="../../static/image/plaint.png" mode=""></image>女神
									</view>
									<view class="realPeople realPeoplemen flex area-center font18 color300"
										v-if="item.sex=='男'&&item.idolFlag==1">
										<image src="../../static/image/plaint-yellow.png" mode=""></image>男神
									</view>
								</view>
								<view class="loveStatus flex area-center"
									@click.stop="toggleFocus(item.id,index,item.focusFlag)">
									<view class="heart love-act" v-if="item.focusFlag==1"></view>
									<image src="../../static/image/love.png" mode="" class="love" v-else></image>
								</view>
							</view>
							<view class="right-user-address font28">
								{{item.age}}岁 | {{item.height}}cm | {{item.occupation}}
							</view>
						</view>
						<view class="flex right-user-bottom row-center">
							<view class="flex row-center font24 color999"
								v-if="item.distanceFlag==1&&item.distance&&item.lastOnlineTimeName=='当前在线'">
								<image src="../../static/image/place-gray.png" mode=""></image>{{item.distance}}km
							</view>
							<view class="font24"
								:class="item.lastOnlineTimeName=='当前在线'?'flex row-center colord24':'color999'"
								v-if="item.onlineFlag==1&&item.lastOnlineTimeName">
								<text v-if="item.lastOnlineTimeName=='当前在线'"></text>{{item.lastOnlineTimeName}}
							</view>
						</view>
					</view>
				</navigator>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				nav: [{
					icon: 'near',
					iconA: 'near-act',
					name: '附近',
					id: 1,
				}, {
					icon: 'recommend',
					iconA: 'recommend-act',
					name: '推荐',
					id: 2,
				}, {
					icon: 'smile',
					iconA: 'smile-act',
					name: '新人',
					id: 3,
				}, {
					icon: 'star',
					iconA: 'star-act',
					name: '女神',
					id: 4,
				}],
				onlineFirstFlag: 1, //是否在线优先 0否1是
				pageIndex: 1,
				pageSize: 15,
				choosed: 1,
				sex: '',
				minAge: 17,
				maxAge: 50,
				onlineFlag: 0, //是否在线 0否1是
				list: [],
				total: 0,
				address: '',
			}
		},
		computed: {
			...mapState({
				location: state => state.address?.city,
				userid: state => state.userid,
				longitude: state => state.longitude,
				latitude: state => state.latitude,
				userinfo: state => state.userinfo,
			})
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.getuserList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			let pages=getCurrentPages();
			let prevPage=pages[pages.length-2];
			console.log(prevPage)
			if (!this.userid) {
				uni.reLaunch({
					url: '/pages/login/login'
				});
				return;
			}
			if(this.location){
				this.pageIndex = 1;
				this.getuserList();
			}else{
				this.getloca_list();
			}
		},
		onLoad() {
			// this.sex=this.userinfo.sex=='男'?'女':'男';
		},
		watch: {
			userinfo: {
				handler(newData, oldData) {
					this.changeUserInfo(newData ? newData : oldData);
				},
				deep: true
			}
		},
		methods: {
			...mapActions(['upUserLonAndlat', 'isFocusUser', 'getUserLocation']),
			async getloca_list() {
				let getLocation = await this.getUserLocation();
				console.log(getLocation);
				uni.showLoading();
				this.getuserList();
			},
			toggleFocus(userid, index, focusFlag) {
				this.isFocusUser(userid).then(res => {
					if (res.code == 0) {
						if (focusFlag == 1) {
							this.$toast('取消关注成功');
							this.list[index].focusFlag = 0;
						} else {
							this.$toast('关注成功');
							this.list[index].focusFlag = 1;
						}
					} else {
						this.$toast(res.msg)
					}
				})
			},
			toFilf() {
				uni.navigateTo({
					url: `/pages/index/filtrate?location=${this.address?this.address:this.location}&sex=${!this.sex?(this.userinfo.sex=='男'?'女':'男'):this.sex}&minAge=${this.minAge}&maxAge=${this.maxAge}&onlineFlag=${this.onlineFlag}`
				})
			},
			changeUserInfo(data) {
				if (data.sex == '男') {
					this.nav[3].name = '女神';
				} else {
					this.nav[3].name = '男神';
				}
			},
			toggle(id) {
				this.choosed = id;
				this.pageIndex = 1;
				uni.showLoading();
				this.getuserList();
			},
			getuserList() {
				if (this.pageIndex == 1) this.list = [];
				console.log({
					userId: this.userid,
					sex: !this.sex?(this.userinfo.sex=='男'?'女':'男'):this.sex,
					minAge: this.minAge,
					maxAge: this.maxAge,
					onlineFlag: this.onlineFlag, //是否在线 0否1是
					address: this.address ? this.address : this.location, //地址
					longitude: this.longitude, //经纬度切换成城市
					latitude: this.latitude,
					type: this.choosed, //类型1附近 2推荐 3新人 4男女神
					onlineFirstFlag: this.onlineFirstFlag, //是否在线优先 0否1是
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
				})
				this.post(this.apis.userList, {
					userId: this.userid,
					sex: this.sex,
					minAge: this.minAge,
					maxAge: this.maxAge,
					onlineFlag: this.onlineFlag, //是否在线 0否1是
					address: this.address ? this.address : this.location, //地址
					longitude: this.longitude, //经纬度切换成城市
					latitude: this.latitude,
					type: this.choosed, //类型1附近 2推荐 3新人 4男女神
					onlineFirstFlag: this.onlineFirstFlag, //是否在线优先 0否1是
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
				}).then(res => {
					if (res.code == 0) {
						this.list.push(...res.data.rows);
						this.total = res.data.total;
					}
					uni.hideLoading();
				})
			},
			...mapMutations(['setAddress', 'setLatitude', 'setLongitude']),
			getWEIZHI() {
				let that = this;
				that.upUserLonAndlat({
					userId: uni.getStorageSync('cityUserid'),
					longitude: this.longitude,
					latitude: this.latitude,
					currentCity: this.location
				});
			},
		},
		onReachBottom() {
			if (this.total > this.list.length) {
				this.pageIndex++;
				this.getuserList();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		padding: 46rpx 30rpx 50rpx;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
		margin-top: -46rpx;
		position: relative;
		z-index: 3;

		.list-item {
			margin-bottom: 40rpx;

			.cover-image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 12rpx;
			}

			.right-user {
				margin-left: 23rpx;
				flex: 1;

				&-top {
					flex-direction: column;
					width: 100%;
				}

				&-name {
					&-text {
						flex-wrap: wrap;
						flex: 1;

						.font32 {
							font-weight: 500;
						}

						.realPeople {
							height: 32rpx;
							background: rgba(255, 67, 100, .1);
							border-radius: 6rpx;
							padding: 0 8rpx;
							margin-left: 8rpx;

							>image {
								width: 18rpx;
								height: 20rpx;
								margin-right: 6rpx;
							}
						}
					}
				}

				&-address {
					color: #848484;
					margin: 47rpx 0 0;
					line-height: 42rpx;
				}

				&-bottom {
					>view {
						height: 40rpx;
						background: rgba(133, 133, 133, .1);
						border-radius: 6rpx;
						padding: 0 12rpx;
						margin-right: 12rpx;

						>image {
							width: 18rpx;
							height: 21rpx;
							margin-right: 12rpx;
						}

						>text {
							display: block;
							width: 8rpx;
							height: 8rpx;
							background: #2BBD24;
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}
				}
			}
		}

		.vipIcon {
			width: 86rpx;
			height: 32rpx;
			margin-left: 10rpx;
		}
	}

	.nav {
		>view {
			flex-direction: column;

			>view {
				color: #FFCAD8;
				line-height: 42rpx;
				margin: 26rpx 0 0;
			}
		}

		.icon {
			width: 63rpx;
			height: 63rpx;
		}

		.iconA {
			width: 75rpx;
			height: 75rpx;
		}
	}

	.top:after {
		position: absolute;
		width: 100%;
		height: 46rpx;
		border-radius: 30rpx 30rpx 0 0;
		content: '';
		background: #FFFFFF;
		bottom: 0;
	}

	.top {
		position: sticky;
		top: 0;
		z-index: 30;
		width: 750rpx;
		background: linear-gradient(180deg, #FC4A73, #FD0E51);
		padding-bottom: 90rpx;

		.place {
			padding: 50rpx 0;

			.location {
				>image {
					width: 31rpx;
					height: 35rpx;
				}
			}

			.tip {
				width: 160rpx;
				height: 60rpx;


				>image {
					width: 23rpx;
					height: 25rpx;
				}
			}
		}
	}

	.status_bar {
		background: rgba(0, 0, 0, 0);
	}

	.realPeoplemen {
		background: rgba(255, 195, 0, .1) !important;

		image {
			width: 11rpx !important;
			height: 20rpx !important;
		}
	}
</style>
