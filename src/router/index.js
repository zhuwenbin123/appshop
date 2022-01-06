import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart'
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}
const routes = [
    {
      path:"/home",
      component:Home,
      meta:{show:true}
    },
    {   
        name:"detail",
        path:"/detail/:skuid",
        component:Detail,
      },
    {
      name:'search',
      path:'/search/:keyword?',
      component:Search,
      meta:{show:true},
    },
    {
      path:'/login',
      component:Login,
      meta:{show:false}
    },
    {
      path:'/register',
      component:Register,
      meta:{show:false}
    },
    {   name:'addCartSuccess',
        path:'/addCartSuccess',
        component:AddCartSuccess,
        meta:{show:false}
      },
    {
      path:'/',
      redirect:'/home'
    },
    {   name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{show:false}
      },
]

const router = new VueRouter({
  routes,
  scrollBehavior(){
      return {y:0}
  }
})

export default router
