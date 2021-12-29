import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import '@/mock/mockServe'
import "swiper/css/swiper.css";
Vue.config.productionTip = false;

import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination)

new Vue({
  router,
  store,
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  render: h => h(App)
}).$mount('#app')
