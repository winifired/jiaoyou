<template>
	<view class="safeBottom250">
		<u-index-list :index-list="rightIndex">
			<template v-for="(item, index) in citylist">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="item.letter"></u-index-anchor>
				<!-- #endif -->
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="item.letter"></u-index-anchor>
					<!-- #endif -->
					<view class="list-cell flex row-center" v-for="(cell, cellindex) in item.cities"
						@click="toggle(index,cellindex)">
						<image src="../../static/image/choosed.png" mode="" v-if="cell.checked" class="icon31"></image>
						<image src="../../static/image/choose.png" mode="" v-else class="icon31"></image>
						{{cell.name}}
					</view>
				</u-index-item>
			</template>
		</u-index-list>
		<view class="fixedBottom safeBottom">
			<view class="confirm" @click.stop="confirm">确定</view>
		</view>
	</view>
</template>

<script>
	import citydict from "../../utils/citydict.js"
	export default {
		data() {
			return {
				citylist: [],
				rightIndex: []
			};
		},
		onLoad(options) {
			for (let i in citydict.city) {
				let cities = [];
				citydict.city[i].data.map(item => {
					cities.push({
						name: item,
						checked: false
					});
				});
				if (options.residentCity) {
					let residentCity = options.residentCity.split('·');
					for (let j = 0; j < residentCity.length; j++) {
						cities.map(item => {
							if (residentCity[j] == item.name) {
								item.checked = true;
							}
						})
					}
				}
				citydict.city[i].cities = cities;
				this.rightIndex.push(citydict.city[i].letter)
			}
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				});
				this.title = options.title == '位置漫游' ? 1 : 2
			}
			this.citylist = citydict.city;
		},
		methods: {
			toggle(index, cellindex) {
				if (this.title==1) {
					for (let i in this.citylist) {
						let cities = [];
						this.citylist[i].cities.map(item => {
							item.checked = false;
						});
					}
				}
				this.citylist[index].cities[cellindex].checked = !this.citylist[index].cities[cellindex].checked;
			},
			confirm() {
				let arr = [];
				for (let i in this.citylist) {
					let cities = [];
					this.citylist[i].cities.map(item => {
						if (item.checked) {
							arr.push(item.name)
						}
					});
				}
				if (arr.length == 0) {
					this.$toast('请选择常驻城市');
					return;
				}
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				console.log(prevPage)
				if (prevPage.route == 'pages/index/filtrate') {
					prevPage.$vm.residentCity = arr.join(',');
				} else {
					prevPage.$vm.form.residentCity = arr.join('·');
				}
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		height: 80rpx;
		padding: 0 30rpx;

		image {
			margin-right: 30rpx;
		}
	}

	.confirm {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
	}
</style>
