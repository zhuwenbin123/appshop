import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

import store from '@/store';
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
    {   
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{show:false}
    },
    {   
        name:'trade',
        path:'/trade',
        component:Trade,
        meta:{show:false},
        beforeEnter:(to,from,next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {   
        name:'pay',
        path:'/pay',
        component:Pay,
        meta:{show:false},
        beforeEnter:(to,from,next)=>{
            if(from.path == 'trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {   
        name:'paySuccess',
        path:'/paySuccess',
        component:PaySuccess,
        meta:{show:false}
    },
    {   
        name:'center',
        path:'/center',
        component:Center,
        meta:{show:false},
        children:[
            {
                path:'myOrder',
                component:MyOrder,
            },
            {
                path:'groupOrder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
]

const router = new VueRouter({
  routes,
  scrollBehavior(){
      return {y:0}
  }
})
router.beforeEach(async (to,from,next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if(token){
        if(to.path =="/login" || to.path == "/register"){
            next('/home')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    await store.dispatch("userLoginOut");
                    next("/login")
                }
            }
        }
    }else{
        if(to.path.indexOf('/trade') !=-1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') !=-1){
            next("/login?redirect="+to.path)
        }else{
            next()
        }
    }
})

export default router
