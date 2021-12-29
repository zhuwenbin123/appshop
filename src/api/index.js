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