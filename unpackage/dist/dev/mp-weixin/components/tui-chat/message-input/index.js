(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/tui-chat/message-input/index"],{

/***/ 573:
/*!**************************************************************************************!*\
  !*** C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=1da00aa0& */ 574);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 576);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ 578);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 21);

var renderjs





/* normalize component */

var component = Object(_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/tui-chat/message-input/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 574:
/*!*********************************************************************************************************************!*\
  !*** C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue?vue&type=template&id=1da00aa0& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=1da00aa0& */ 575);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_1da00aa0___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 575:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue?vue&type=template&id=1da00aa0& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniPopup: function() {
      return __webpack_require__.e(/*! import() | uni_modules/uni-popup/components/uni-popup/uni-popup */ "uni_modules/uni-popup/components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-popup/components/uni-popup/uni-popup.vue */ 547))
    },
    giftModel: function() {
      return __webpack_require__.e(/*! import() | components/repeatGift/repeatGift */ "components/repeatGift/repeatGift").then(__webpack_require__.bind(null, /*! @/components/repeatGift/repeatGift.vue */ 594))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 576:
/*!***************************************************************************************************************!*\
  !*** C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 577);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 577:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




























































































var _GenerateTestUserSig = __webpack_require__(/*! @/debug/GenerateTestUserSig.js */ 14);


var _vuex = __webpack_require__(/*! vuex */ 16);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var TUIEmoji = function TUIEmoji() {Promise.all(/*! require.ensure | components/tui-chat/message-elements/emoji/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/tui-chat/message-elements/emoji/index")]).then((function () {return resolve(__webpack_require__(/*! ../message-elements/emoji/index */ 781));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var TUICommonWords = function TUICommonWords() {__webpack_require__.e(/*! require.ensure | components/tui-chat/message-private/common-words/index */ "components/tui-chat/message-private/common-words/index").then((function () {return resolve(__webpack_require__(/*! ../message-private/common-words/index */ 788));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var TUIOrderList = function TUIOrderList() {__webpack_require__.e(/*! require.ensure | components/tui-chat/message-private/order-list/index */ "components/tui-chat/message-private/order-list/index").then((function () {return resolve(__webpack_require__(/*! ../message-private/order-list/index */ 795));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var TUIServiceEvaluation = function TUIServiceEvaluation() {__webpack_require__.e(/*! require.ensure | components/tui-chat/message-private/service-evaluation/index */ "components/tui-chat/message-private/service-evaluation/index").then((function () {return resolve(__webpack_require__(/*! ../message-private/service-evaluation/index */ 802));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default2 =


{
  data: function data() {
    return {
      // todo  conversation
      // conversation: {},
      inputText: '',
      extensionArea: false,
      sendMessageBtn: false,
      displayFlag: '',
      isAudio: false,
      bottomVal: 0,
      startPoint: 0,
      popupToggle: false,
      isRecording: false,
      canSend: true,
      text: '按住说话',
      title: ' ',
      notShow: false,
      isShow: true,
      recordTime: 0,
      recordTimer: null,
      commonFunction: [{
        name: '常用语',
        key: '0' },
      {
        name: '发送订单',
        key: '1' },
      {
        name: '服务评价',
        key: '2' }],

      displayServiceEvaluation: false,
      displayCommonWords: false,
      displayOrderList: false,
      timer: null,
      timeRemaining: 0 //通话剩余时间  分钟
    };
  },

  components: {
    TUIEmoji: TUIEmoji,
    TUICommonWords: TUICommonWords,
    TUIOrderList: TUIOrderList,
    TUIServiceEvaluation: TUIServiceEvaluation },

  computed: _objectSpread({},
  (0, _vuex.mapState)(['userinfo'])),

  props: {
    conversation: {
      type: Object,
      default: function _default() {} } },


  watch: {
    conversation: {
      handler: function handler(newVal) {
        // todo 值会被改变
        // this.setData({
        //   conversation: newVal
        // });
      },
      immediate: true,
      deep: true } },



  beforeMount: function beforeMount() {var _this = this;
    // 加载声音录制管理器
    this.recorderManager = uni.getRecorderManager();
    this.recorderManager.onStop(function (res) {
      clearInterval(_this.recordTimer);
      // 兼容 uniapp 打包app，duration 和 fileSize 需要用户自己补充
      // 文件大小 ＝ (音频码率) x 时间长度(单位:秒) / 8
      var msg = {
        duration: res.duration ? res.duration : _this.recordTime * 1000,
        tempFilePath: res.tempFilePath,
        fileSize: res.fileSize ? res.fileSize : 48 * _this.recordTime / 8 * 1024 };

      uni.hideLoading();
      // 兼容 uniapp 语音消息没有duration
      if (_this.canSend) {
        if (msg.duration < 1000) {
          uni.showToast({
            title: '录音时间太短',
            icon: 'none' });

        } else {
          // res.tempFilePath 存储录音文件的临时路径
          var message = uni.$TUIKit.createAudioMessage({
            to: _this.getToAccount(),
            conversationType: _this.conversation.type,
            payload: {
              file: msg } });


          _this.$sendTIMMessage(message);
        }
      }

      _this.setData({
        startPoint: 0,
        popupToggle: false,
        isRecording: false,
        canSend: true,
        title: ' ',
        text: '按住说话' });

    });
  },
  methods: {
    toEva: function toEva() {var _this2 = this;
      var that = this;
      uni.$TUIKit.getMessageList({
        conversationID: this.conversation.conversationID,
        nextReqMessageID: '',
        count: 15 }).
      then(function (res) {var

        messageList =
        res.data.messageList; // 消息列表。
        if (messageList.length <= 0) {
          that.$toast('请聊天后评价');
          return;
        } else {
          uni.navigateTo({
            url: '/pages/index/evaluate?targetUserId=' + _this2.conversation.userProfile.
            userID });

        }
      });
    },
    handleSendPlace: function handleSendPlace() {
      // 发送位置
      var that = this;
      uni.chooseLocation({
        success: function success(res) {
          console.log(res);
          that.sendLocationMessage(res.address, res.latitude, res.longitude);
        } });

    },
    sendLocationMessage: function sendLocationMessage(address, latitude, longitude) {
      var message = uni.$TUIKit.createLocationMessage({
        to: this.getToAccount(),
        conversationType: this.conversation.type,
        payload: {
          description: address,
          longitude: longitude, // 经度
          latitude: latitude // 纬度
        },
        onProgress: function onProgress(percent) {
          message.percent = percent;
        } });

      this.$sendTIMMessage(message);
    },
    openGift: function openGift() {
      this.$refs.gift.open();
    },
    confirmGiftImg: function confirmGiftImg(data) {
      this.$handleSendCustomMessage({
        detail: {
          payload: {
            data: 'gift',
            description: data.giftImg,
            extension: data.giftNum.toString() } } });



      this.$refs.gift.close();
    },
    switchAudio: function switchAudio() {
      this.setData({
        isAudio: !this.isAudio,
        text: '按住说话' });

    },

    handleLongPress: function handleLongPress(e) {var _this3 = this;
      this.recorderManager.start({
        duration: 60000,
        // 录音的时长，单位 ms，最大值 600000（10 分钟）
        sampleRate: 44100,
        // 采样率
        numberOfChannels: 1,
        // 录音通道数
        encodeBitRate: 192000,
        // 编码码率
        format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
      });

      this.setData({
        startPoint: e.touches[0],
        title: '正在录音',
        // isRecording : true,
        // canSend: true,
        notShow: true,
        isShow: false,
        isRecording: true,
        popupToggle: true,
        recordTime: 0 });

      this.recordTimer = setInterval(function () {
        _this3.recordTime++;
      }, 1000);
    },

    // 录音时的手势上划移动距离对应文案变化
    handleTouchMove: function handleTouchMove(e) {
      if (this.isRecording) {
        if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 100) {
          this.setData({
            text: '抬起停止',
            title: '松开手指，取消发送',
            canSend: false });

        } else if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 20) {
          this.setData({
            text: '抬起停止',
            title: '上划可取消',
            canSend: true });

        } else {
          this.setData({
            text: '抬起停止',
            title: '正在录音',
            canSend: true });

        }
      }
    },

    // 手指离开页面滑动
    handleTouchEnd: function handleTouchEnd() {
      this.setData({
        isRecording: false,
        popupToggle: false });

      uni.hideLoading();
      this.recorderManager.stop();
    },
    handleEmoji: function handleEmoji() {
      var targetFlag = 'emoji';

      if (this.displayFlag === 'emoji') {
        targetFlag = '';
      }

      this.setData({
        displayFlag: targetFlag });

    },

    handleExtensions: function handleExtensions() {
      var targetFlag = 'extension';

      if (this.displayFlag === 'extension') {
        targetFlag = '';
      }

      this.setData({
        displayFlag: targetFlag });

    },

    error: function error(e) {
      console.log(e.detail);
    },

    // handleSendPicture() {
    // 	this.sendImageMessage('camera');
    // },

    handleSendImage: function handleSendImage() {
      this.sendImageMessage('album');
    },

    sendImageMessage: function sendImageMessage(type) {var _this4 = this;
      uni.chooseImage({
        sourceType: ['camera', 'album'],
        count: 1,
        success: function success(res) {
          console.log('res.....................');
          console.log(res);
          if (res) {
            var message = uni.$TUIKit.createImageMessage({
              to: _this4.getToAccount(),
              conversationType: _this4.conversation.type,
              payload: {
                file: res },

              onProgress: function onProgress(percent) {
                message.percent = percent;
              } });

            // uni.$TUIKit.sendMessage(message);
            console.log(message);
            _this4.$sendTIMMessage(message);
          }
        } });

    },

    // handleShootVideo() {
    // 	this.sendVideoMessage('camera');
    // },

    handleSendVideo: function handleSendVideo() {
      this.sendVideoMessage();
    },

    sendVideoMessage: function sendVideoMessage(type) {var _this5 = this;
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        // 来源相册或者拍摄
        maxDuration: 60,
        // 设置最长时间60s
        camera: 'back',
        // 后置摄像头
        success: function success(res) {
          if (res) {
            var message = uni.$TUIKit.createVideoMessage({
              to: _this5.getToAccount(),
              conversationType: _this5.conversation.type,
              payload: {
                file: res },

              onProgress: function onProgress(percent) {
                message.percent = percent;
              } });

            // uni.$TUIKit.sendMessage(message);
            // this.setData({
            // 	displayFlag: ''
            // });
            _this5.$sendTIMMessage(message);
          }
        } });

    },

    handleCommonFunctions: function handleCommonFunctions(e) {
      switch (e.target.dataset.function.key) {
        case '0':
          this.setData({
            displayCommonWords: true });

          break;

        case '1':
          this.setData({
            displayOrderList: true });

          break;

        case '2':
          this.setData({
            displayServiceEvaluation: true });

          break;

        default:
          break;}

    },

    handleSendOrder: function handleSendOrder() {
      this.setData({
        displayOrderList: true });

    },

    appendMessage: function appendMessage(e) {
      this.setData({
        inputText: this.inputText + e.detail.message,
        sendMessageBtn: true });

    },

    getToAccount: function getToAccount() {
      if (!this.conversation || !this.conversation.conversationID) {
        return '';
      }

      switch (this.conversation.type) {
        case 'C2C':
          return this.conversation.conversationID.replace('C2C', '');

        case 'GROUP':
          return this.conversation.conversationID.replace('GROUP', '');

        default:
          return this.conversation.conversationID;}

    },

    handleCalling: function handleCalling(e) {
      if (this.userinfo.memberFlag == 0) {
        this.$toast('您还不是会员，暂无法使用音视频通话');
        return;
      }
      var that = this;
      // todo 目前支持单聊
      if (this.conversation.type === 'GROUP') {
        uni.showToast({
          title: '群聊暂不支持',
          icon: 'none' });

        return;
      }

      var type = e.currentTarget.dataset.value;
      if (type == 1) {
        // 语音
        this.$emit('checkJudge', 7);
      } else {
        //视频
        this.$emit('checkJudge', 8);
      }
      this.setData({
        displayFlag: '' });

    },
    sendTextMessage: function sendTextMessage(msg, flag) {
      var to = this.getToAccount();
      var text = flag ? msg : this.inputText;
      var message = uni.$TUIKit.createTextMessage({
        to: to,
        conversationType: this.conversation.type,
        payload: {
          text: text } });


      console.log(message);
      this.setData({
        inputText: '',
        sendMessageBtn: false });

      this.$sendTIMMessage(message);
    },

    onInputValueChange: function onInputValueChange(event) {
      if (event.detail.value) {
        this.setData({
          sendMessageBtn: true });

      } else {
        this.setData({
          sendMessageBtn: false });

      }
    },

    $handleSendTextMessage: function $handleSendTextMessage(event) {
      this.sendTextMessage(event.detail.message, true);
      this.setData({
        displayCommonWords: false });

    },

    $handleSendCustomMessage: function $handleSendCustomMessage(e) {var nowType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var message = uni.$TUIKit.createCustomMessage({
        to: this.getToAccount(),
        conversationType: this.conversation.type,
        payload: e.detail.payload });

      this.$sendTIMMessage(message, nowType);
      this.setData({
        displayOrderList: false });

    },

    $handleCloseCards: function $handleCloseCards(e) {
      switch (e.detail.key) {
        case '0':
          this.setData({
            displayCommonWords: false });

          break;

        case '1':
          this.setData({
            displayOrderList: false });

          break;

        case '2':
          this.setData({
            displayServiceEvaluation: false });

          break;

        default:
          break;}

    },

    $sendTIMMessage: function $sendTIMMessage(message, nowType) {
      this.$emit('sendMessage', {
        detail: {
          message: message } },

      nowType);
      this.setData({
        displayFlag: '' });

    },

    handleClose: function handleClose() {
      this.setData({
        displayFlag: '' });

    },

    handleServiceEvaluation: function handleServiceEvaluation() {
      this.setData({
        displayServiceEvaluation: true });

    },

    inputBindFocus: function inputBindFocus() {
      console.log("占位：函数 inputBindFocus 未声明");
    },

    inputBindBlur: function inputBindBlur() {
      console.log("占位：函数 inputBindBlur 未声明");
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 578:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=css& */ 579);
/* harmony import */ var _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 579:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Admin/Desktop/交友(城市猎人app)/components/tui-chat/message-input/index.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/tui-chat/message-input/index.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tui-chat/message-input/index-create-component',
    {
        'components/tui-chat/message-input/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(573))
        })
    },
    [['components/tui-chat/message-input/index-create-component']]
]);
