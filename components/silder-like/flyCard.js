export default {
	data() {
		return {
			scale: {
				x: 0.95,
				y: 1
			}, //缩放
			isAnimating: false, //动画是否执行
			number: 3, //错位显示层级
			opacity: 1, //透明度，参数范围 0~1
			translate: {
				x: 0,
				y: 8
			}, //位移px

			left: 0,
			top: 0,
			startLeft: 0,
			startTop: 0,
			isDrag: false,
			isThrow: false,
			needBack: false,
			isAnimating: false,
			dragDirection: "horizontal", //移动方向
			throwDistance: 1000,
			throwTriggerDistance: 100
		}
	},
	methods: {
		getDistance: function(x1, y1, x2, y2) {
			var _x = Math.abs(x1 - x2);
			var _y = Math.abs(y1 - y2);
			return Math.sqrt(_x * _x + _y * _y);
		},
		touchStart(e) {
			console.log('touchStart')
			console.log(e)
			if (this.isAnimating) return;
			this.isDrag = true;
			this.needBack = false;
			this.isThrow = false;
			var curTouch = e.touches[0];
			this.startLeft = curTouch.clientX - this.dataList[0].left;
			this.startTop = curTouch.clientY - this.dataList[0].top;
		},
		touchMove(e) {
			console.log('touchMove')
			console.log(e)
			if (this.isAnimating) return;
			var curTouch = e.touches[0];
			if (this.dragDirection == "all" || this.dragDirection == "horizontal") this.dataList[0].left = curTouch
				.clientX -
				this.startLeft;
			if (this.dragDirection == "all" || this.dragDirection == "vertical") this.dataList[0].top = curTouch
				.clientY - this
				.startTop;
			var distance = this.getDistance(0, 0, this.dataList[0].left, this.dataList[0].top);
		},
		touchCancel(e) {
			this.isDrag = false;
			if (this.isAnimating) return;
			var that = this;
			var curTouch = e.touches[0];
			var distance = this.getDistance(0, 0, this.dataList[0].left, this.dataList[0].top);
			console.log(distance)
			if (distance > this.throwTriggerDistance) {
				this.makeCardThrow();
			} else {
				this.makeCardBack();
			}
		},
		makeCardThrow: function() {
			var that = this;
			this.isThrow = true;
			this.needBack = false;
			var angle = Math.atan2((this.dataList[0].top - 0), (this.dataList[0].left - 0));
			this.dataList[0].left = Math.cos(angle) * this.throwDistance;
			this.dataList[0].top = Math.sin(angle) * this.throwDistance;
			this.isAnimating = true;
			var distance = this.getDistance(0, 0, this.dataList[0].left, this.dataList[0].top);
			setTimeout(function() {
				that.isAnimating = false;
				that.onThrowDone({
					left: that.dataList[0].left,
				});
			}, 400);
		},
		makeCardBack: function() {
			var that = this;
			this.isThrow = false;
			this.needBack = true;
			if (this.needBack) {
				this.dataList[0].left = 0;
				this.dataList[0].top = 0;
			}
			this.isAnimating = true;
			setTimeout(function() {
				that.isAnimating = false;
				that.needBack = true;
			}, 600);
		},
		onThrowDone(obj) {
			if (obj.left < -10) {
				this.nolike()
			} else if (obj.left > 10) {
				this.like()
			}
		}
	}
}
