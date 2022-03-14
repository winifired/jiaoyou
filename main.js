import App from './App'
import Vue from 'vue'
import store from './store'
import {toast} from './utils/msgTip.js'
import apis from "./utils/requestApi.js";
import request from "./utils/request.js";
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 全局mixins，用于实现setData等功能';腾讯云
import Mixin from './polyfill/mixins';
Vue.mixin(Mixin);
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$toast = toast;
Vue.prototype.post = request.post;
Vue.prototype.apis = apis;
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()