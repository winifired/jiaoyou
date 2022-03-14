const request = (url, options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${url}`,
			method: options.method,
			data: options.data? options.data : {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success(request) {
				// console.log(request.data);
				if (request.statusCode == 200) {
					resolve(request.data)
				} else {
					reject(request.data)
				}
			},
			fail(error) {
				uni.hideLoading();
				uni.showToast({
					title:'网络错误，请稍后重试',
					icon:'none'
				})
				// console.log(error)
				reject(error.data)
			}
		})
	})
}
const get = (url, options = {}) => {
	return request(url, {
		method: 'GET',
		data: options
	})
}

const post = (url, options) => {
	return request(url, {
		method: 'POST',
		data: options
	})
}

const put = (url, options) => {
	return request(url, {
		method: 'PUT',
		data: options
	})
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
	return request(url, {
		method: 'DELETE',
		data: options
	})
}

module.exports = {
	get,
	post,
	put,
	remove
}
