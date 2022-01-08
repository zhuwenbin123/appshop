// API接口进行统一管理
import requests from './requests'
import mockRequest from './mockAjax'

// 三级联动接口
export const reqgetCategoryList = () =>requests.get('/product/getBaseCategoryList');
// 获取banner
export const reqGetBannerList = ()=>mockRequest.get('/banner');
// 获取floor数据
export const reqGetfloorList = ()=>mockRequest.get('/floor');
// 获取搜索模块数据
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params});
// 获取产品信息
export const reqGoodsInfo = (skuid)=>requests({url:`/item/${skuid}`,method:"get"});
// 添加购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车列表
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'});
// 删除购物车产品
export const reqDeleteCart = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
// 修改商品状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码
export const reqGetPhone = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
// 注册
export const reqUserRegister = (data)=>requests({url:`/user/passport/register/`,data,method:'post'});
// 登入
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});
// 获取用户信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登入
export const reqLoginOut=()=>requests({url:'/user/passport/logout',method:'get'})
// 获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取商品清单
export const reqOderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})