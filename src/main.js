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

import * as API from '@/api'

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
