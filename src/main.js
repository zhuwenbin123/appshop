import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import '@/mock/mockServe'
import "swiper/css/swiper.css";
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;

import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination';
import {Button,MessageBox} from'element-ui'
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);

// Element组件注册
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
// 引入接口
import * as API from '@/api'
// 图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'

Vue.use(VueLazyload,{
    loading:atm
})

// 引入表单校验插件
import VeeValidate from 'vee-validate';
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);
VeeValidate.Validator.localize("zh_CN", {
    messages: {
      ...zh_CN.messages,
      is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: {
      phone: "手机号",
      code: "验证码",
      password: "密码",
      password1: "确认密码",
      agree:'协议'
    },
  });
  //自定义校验规则
VeeValidate.Validator.extend("tongyi", {
    validate: (value) => {
      return value;
    },
    getMessage: (field) => field + "必须同意",
});

new Vue({
  router,
  store,
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: h => h(App)
}).$mount('#app')
